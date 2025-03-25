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

        await dbConnect();

        const { deleteId } = await req.json();

        const deleteProduct = await expiryAlertModel.findOneAndDelete({ _id: deleteId });

        await redis.del(deleteProduct.userEmail);

        const newNotification = await notificationModel.create({
            userEmail: deleteProduct.userEmail,
            notificationType: "expory-product-delete",
            notificationMessage: `The product ${deleteProduct.productName} has been successfully deleted. It was manufactured on ${deleteProduct.manufactureDate} and had an expiry date of ${deleteProduct.expiryDate}.`
        });

        let user = await userAllProducts.findOne({ userEmail: deleteProduct.userEmail });

        user.appNotifications.push(newNotification._id);

        await user.save();

        return NextResponse.json({ success: true, deleteProduct, newNotification }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/expiry-alert/delete route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}