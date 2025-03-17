import notificationModel from "@/mongodb/notifications.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { deleteNotificationId } = await req.json();

        const deletedNotification = await notificationModel.findByIdAndDelete(deleteNotificationId);

        return NextResponse.json({ success: true, deletedNotification: deletedNotification }, { status: 200 })
    } catch (err) {
        console.log(`Error in /api/notification/delete route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}