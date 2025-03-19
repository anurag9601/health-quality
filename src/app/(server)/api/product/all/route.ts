import userAllProducts from "@/mongodb/userAllProducts.model";
import userProduct from "@/mongodb/product.model";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notifications.model";
import expiryAlertModel from "@/mongodb/expireAlertProduct.model";
import { redis } from "@/lib/redis";
import { ProtectRoute } from "@/services/protectRoute";

export async function POST(req: NextRequest) {
    try {
        const isValid = ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        const { userEmail } = await req.json();

        const userAllData = await redis.get(userEmail);

        if (userAllData) {
            const allProductDataJson = await JSON.parse(userAllData);
            return NextResponse.json({ allProductsData: allProductDataJson }, { status: 200 })
        }

        await dbConnect();

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

        await redis.set(userEmail, JSON.stringify(allProductsData));

        return NextResponse.json({ allProductsData }, { status: 200 })
    } catch (err) {
        console.log(`Error in /api/product/all route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}