import { getImagesDataUsingAI } from "@/lib/expiry-ai-mode";
import { ProtectRoute } from "@/services/protectRoute";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const isValid = await ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        const data = await req.formData();

        const img1: File | null = data.get("img1") as unknown as File
        const img2: File | null = data.get("img2") as unknown as File

        if (img1 && img2) {
            const bytesImg1 = await img1.arrayBuffer();
            const bytesImg2 = await img2.arrayBuffer();

            const img1Buffer: Buffer<ArrayBufferLike> = Buffer.from(bytesImg1);
            const img2Buffer: Buffer<ArrayBufferLike> = Buffer.from(bytesImg2);

            const response = await getImagesDataUsingAI(img1Buffer, img2Buffer, img1.type, img2.type);

            return NextResponse.json({ success: true, response: response }, { status: 200 })
        } else if (img1) {
            const bytesImg1 = await img1.arrayBuffer();
            const img1Buffer = Buffer.from(bytesImg1);
            const img2Buffer = null

            const response = await getImagesDataUsingAI(img1Buffer, img2Buffer, img1.type, "");

            return NextResponse.json({ success: true, response: response }, { status: 200 })
        } else if (img2) {
            const bytesImg2 = await img2.arrayBuffer();
            const img2Buffer = Buffer.from(bytesImg2);
            const img1Buffer = null
            const response = await getImagesDataUsingAI(img1Buffer, img2Buffer, "", img2.type);

            return NextResponse.json({ success: true, response: response }, { status: 200 })
        }
    } catch (err) {
        console.log(`Error in /api/expiry-ai route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}