import { redis } from "@/lib/redis";
import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notifications.model";
import userProduct from "@/mongodb/product.model";
import userAllProducts from "@/mongodb/userAllProducts.model";
import { ProtectRoute } from "@/services/protectRoute";
import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.v2.config({
    cloud_name: "deqs6ry98",
    api_key: process.env.CLOUDINARY_APIKEY as string,
    api_secret: process.env.CLUDINARY_APISECRET as string,
    secure: true
})

export async function GET(req: NextRequest) {
    try {
        const isValid = ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        await dbConnect();
        
        const _id = req.nextUrl.pathname.split("/").slice(-1)[0];
        
        const product = await userProduct.findById({ _id });

        if (!product) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const imageUniqueId = product.productImgURL.split("/").slice(-1)[0].slice(0, -4);

        await cloudinary.v2.uploader.destroy(imageUniqueId);

        const newNotification = await notificationModel.create({
            notificationType: "delete",
            notificationMessage: `Product '${product.Product_Details.product_name}' has been successfully deleted from the Analysis - Recent Added Products.`,
            userEmail: product.userEmail,
        });

        let userAllOperations = await userAllProducts.findOne({
            userEmail: product.userEmail
        });

        userAllOperations.appNotifications.push(newNotification._id);

        userAllOperations.save();

        const deleteProduct = await userProduct.findOneAndDelete({
            _id
        });

        if (!deleteProduct) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        await redis.del(product.userEmail);

        return NextResponse.json({ success: true, message: "Product deleted successfully", notification: newNotification });


    } catch (err) {
        console.log(`Error in /api/product/delete/{id} route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}