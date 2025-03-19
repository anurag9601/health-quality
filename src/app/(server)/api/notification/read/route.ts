import { redis } from "@/lib/redis";
import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notifications.model";
import { ProtectRoute } from "@/services/protectRoute";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const isValid = ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        const { userEmail } = await req.json();

        if (!userEmail) {
            return NextResponse.json({ error: "Email not found" }, { status: 400 });
        }

        await dbConnect();

        await notificationModel.updateMany({ userEmail }, { $set: { read: true } });

        await redis.del(userEmail);

        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(`Error in /api/notification/read route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}