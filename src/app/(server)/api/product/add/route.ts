import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notification.model";
import userProduct from "@/mongodb/product.model";
import userAllProducts from "@/mongodb/userAllProducts.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userEmail, productImgURL, Ingredients_Information, Overall_Health_Assessment, Product_Details } = await req.json();

        await dbConnect();

        let user = await userAllProducts.findOne({ userEmail: userEmail });


        if (!user) {
            user = await userAllProducts.create({
                userEmail: userEmail,
                products: []
            });
        }

        const newProduct = await userProduct.create({
            userEmail,
            productImgURL,
            Ingredients_Information,
            Overall_Health_Assessment,
            Product_Details
        });

        const newNotification = await notificationModel.create({
            notificationType: "analysis",
            notificationMessage: `New addition! ${Product_Details.product_name} is now part of your catalog.`,
        })

        await user.products.push(newProduct._id);

        await user.notifications.push(newNotification._id);

        await user.save();

        return NextResponse.json({ addProduct: newProduct }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/product/add route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}