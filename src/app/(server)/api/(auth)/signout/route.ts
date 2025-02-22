import { NextResponse } from "next/server";

export function GET() {
    try {
        const response = NextResponse.json({ success: true , message: "successfully logout" }, { status: 200 });

        response.cookies.set("session_cookie", "", {
            expires: new Date(0),
            path: "/"
        });

        return response;
    } catch (err) {
        console.log(`Error in /api/signout route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}