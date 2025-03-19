import { redis } from "@/lib/redis";
import { decryptJWT, verifyJWTInEdge } from "@/services/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        const encryptToken = req.cookies.get("session_cookie");

        if (!encryptToken) {
            const response = NextResponse.json({ error: "Token not found" }, { status: 400 });

            response.cookies.set("session_cookie", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        const decryptPayload = decryptJWT(encryptToken.value);

        if (!decryptPayload) {
            const response = NextResponse.json({ error: "Invalid token" }, { status: 401 });

            response.cookies.set("session_cookie", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        const verify = await verifyJWTInEdge(decryptPayload);

        if (!verify) {
            const response = NextResponse.json({ error: "Invalid token" }, { status: 401 });

            response.cookies.set("session_cookie", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }

        return NextResponse.json({ data: verify }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/me route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}