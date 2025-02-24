import { decryptJWT, verifyJWTToken } from "@/services/jwt";
import { NextRequest, NextResponse } from "next/server";

export interface customRequest extends NextRequest {
    user?: any;
}

export function GET(req: customRequest) {
    try {
        const encryptToken = req.cookies.get("session_cookie");

        if (!encryptToken) {
            return NextResponse.json({ error: "Token not found" }, { status: 400 });
        }

        const decryptToken = decryptJWT(encryptToken.value);

        const verify = verifyJWTToken(decryptToken) as any;

        if (!verify) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        req.user = verify;

        return NextResponse.json({ data: verify }, { status: 200 });
    } catch (err) {
        console.log(`Error in /api/signin route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}