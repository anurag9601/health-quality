import { redis } from "@/lib/redis";
import dbConnect from "@/mongodb/connectDB";
import expiryAlertModel from "@/mongodb/expireAlertProduct.model";
import notificationModel from "@/mongodb/notifications.model";
import userAllProducts from "@/mongodb/userAllProducts.model";
import { ProtectRoute } from "@/services/protectRoute";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const isValid = await ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        const { userEmail, productName, expiryDate, manufactureDate } = await req.json();

        if (!userEmail || !productName || !expiryDate || !manufactureDate) {
            return NextResponse.json({ error: "All data not found." }, { status: 400 });
        };

        await dbConnect();

        let user = await userAllProducts.findOne({ userEmail: userEmail });

        if (!user) {
            user = await userAllProducts.create({
                userEmail: userEmail,
                products: [],
                appNotifications: []
            });
        }

        const newExpiryAlertProduct = await expiryAlertModel.create({
            userEmail,
            productName,
            expiryDate,
            manufactureDate,
        });

        const newNotification = await notificationModel.create({
            notificationType: "expiry-add",
            notificationMessage: `"Great news! 🎉 ${productName} has been added to your expiry alert catalog. Stay informed this product expires on ${expiryDate} and was manufactured on ${manufactureDate}.`,
            userEmail,
        });

        await user.expiryAlertProducts.push(newExpiryAlertProduct._id);

        await user.appNotifications.push(newNotification._id);

        await user.save();

        await redis.del(userEmail);

        return NextResponse.json({ addNotification: newNotification, addExpiryAlertProduct: newExpiryAlertProduct }, { status: 200 });

    } catch (err) {
        console.log(`Error in /api/expiry-alert/add route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}