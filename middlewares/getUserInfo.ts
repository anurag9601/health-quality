import { decryptJWT } from "@/services/jwt";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const encryptedToken = req.cookies.get("session_cookie")?.value;

    if (!encryptedToken) {
        console.log("middleware handles the request")
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    // const decryptedToken = decryptJWT(encryptedToken);
}

export const config = {
    matcher: ["/signin", "/signout", "/"]
}