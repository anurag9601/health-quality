import userProduct from "@/mongodb/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const _id = req.nextUrl.pathname.split("/").slice(-1)[0];

        const deleteProduct = await userProduct.findOneAndDelete({
            _id
        });

        if (!deleteProduct) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Product deleted successfully" });


    } catch (err) {
        console.log(`Error in /api/product/delete/{id} route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}