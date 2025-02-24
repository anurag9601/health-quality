import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isProtectedPath = ["/"];
    const isPublicPath = ["/signin", "/signup"];

    const encodedToken = req.cookies.get("session_cookie")?.value;

    if (isProtectedPath.includes(path) && !encodedToken) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    if (isPublicPath.includes(path) && encodedToken) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/signin",
        "/signup",
    ],
};
