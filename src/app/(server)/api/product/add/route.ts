import { redis } from "@/lib/redis";
import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notifications.model";
import userProduct from "@/mongodb/product.model";
import userAllProducts from "@/mongodb/userAllProducts.model";
import { ProtectRoute } from "@/services/protectRoute";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const isValid = await ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        const { userEmail, productImgURL, Ingredients_Information, Overall_Health_Assessment, Product_Details } = await req.json();

        await dbConnect();

        let user = await userAllProducts.findOne({ userEmail: userEmail });

        if (!user) {
            user = await userAllProducts.create({
                userEmail: userEmail,
                products: [],
                appNotifications: []
            });
        }

        const newProduct = await userProduct.create({
            userEmail,
            productImgURL,
            Ingredients_Information,
            Overall_Health_Assessment,
            Product_Details
        });

        let productName;

        try {
            productName = Product_Details.product_name;
        } catch (err) {
            productName = "Added product"
        }

        const newNotification = await notificationModel.create({
            notificationType: "analysis",
            notificationMessage: `New addition! ${productName} is now part of your catalog.`,
            userEmail,
        })

        await user.products.push(newProduct._id);

        await user.appNotifications.push(newNotification._id);

        await user.save();

        await redis.del(userEmail);

        return NextResponse.json({ addNotification: newNotification, addProduct: newProduct }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/product/add route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}