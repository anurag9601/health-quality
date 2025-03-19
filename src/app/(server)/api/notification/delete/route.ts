import { redis } from "@/lib/redis";
import dbConnect from "@/mongodb/connectDB";
import notificationModel from "@/mongodb/notifications.model";
import { ProtectRoute } from "@/services/protectRoute";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        
        const isValid = await ProtectRoute(req);

        if (!isValid) return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });

        console.log("isValid", isValid);

        const { deleteNotificationId } = await req.json();

        const deletedNotification = await notificationModel.findByIdAndDelete(deleteNotificationId);

        await redis.del(deletedNotification.userEmail);

        return NextResponse.json({ success: true, deletedNotification: deletedNotification }, { status: 200 })
    } catch (err) {
        console.log(`Error in /api/notification/delete route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}