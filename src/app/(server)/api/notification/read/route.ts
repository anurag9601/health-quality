import notificationModel from "@/mongodb/notifications.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userEmail } = await req.json();

        await notificationModel.updateMany({ userEmail }, { $set: { read: true } });

        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(`Error in /api/notification/read route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}