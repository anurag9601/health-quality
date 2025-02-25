import userProduct from "@/mongodb/product.model";
import userAllProducts from "@/mongodb/userAllProducts.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userEmail, productImgURL, productInfo, Overall_Health_Assessment, Product_Details } = await req.json();

        let user = await userAllProducts.findOne({ user: userEmail });


        if (!user) {
            user = await userAllProducts.create({
                user: userEmail,
            });
        }

        const newProduct = await userProduct.create({
            userEmail,
            productImgURL,
            productInfo,
            Overall_Health_Assessment,
            Product_Details
        })

        user.products.push(newProduct._id);

        user.save();

        return NextResponse.json({ products: user }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/product/add route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}