import dbConnect from "@/mongodb/connectDB";
import userAllProducts from "@/mongodb/userAllProducts.model";
import userProduct from "@/mongodb/product.model";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
    try {
        await dbConnect();
        const { userEmail } = await req.json();

        if (!userAllProducts || !userProduct) {
            throw new Error("Models are not loaded correctly.");
        }

        const allProductsData = await userAllProducts.findOne({ userEmail }).populate("products");

        return NextResponse.json({ allProductsData }, { status: 200 })
    } catch (err) {
        console.log(`Error in /api/product/all route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}