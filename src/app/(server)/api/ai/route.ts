import { getImageURLAndGiveResponse } from "@/lib/ai-model";
import { ProtectRoute } from "@/services/protectRoute";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const isValid = ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        const data = await req.formData();

        const imageFile: File | null = data.get("file") as unknown as File;

        if (!imageFile) {
            return NextResponse.json({ error: "Image file not found" }, { status: 400 });
        }

        const bytes = await imageFile.arrayBuffer();

        const imageBuffer: Buffer<ArrayBufferLike> = Buffer.from(bytes);

        const response = await getImageURLAndGiveResponse(imageBuffer, imageFile.type);

        if (!response) {
            return NextResponse.json({ error: true, message: "Response not found something went wrong" }, { status: 400 });
        }

        return NextResponse.json({ response }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/ai route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}