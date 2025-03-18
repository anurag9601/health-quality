import userAllProducts from "@/mongodb/userAllProducts.model";
import userProduct from "@/mongodb/product.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notifications.model";
import expiryAlertModel from "@/mongodb/expireAlertProduct.model";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const { userEmail } = await req.json();

        if (!userAllProducts || !userProduct || !notificationModel || !expiryAlertModel) {
            throw new Error("Models are not loaded correctly.");
        }

        const allProductsData = await userAllProducts.findOne({ userEmail }).populate({
            path: "products",
            options: {
                sort: { createdAt: -1 }
            }
        }).populate({
            path: "appNotifications",
            options: {
                sort: { createdAt: -1 }
            }
        });

        return NextResponse.json({ allProductsData }, { status: 200 })
    } catch (err) {
        console.log(`Error in /api/product/all route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}