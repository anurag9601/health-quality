import { NextResponse } from "next/server";
import { decryptJWT, verifyJWTInEdge } from "./services/jwt";
import { auth } from "@/auth";

export default auth(async (req) => {
    const path = req.nextUrl.pathname;

    const isProtectedPath = ["/", "/product/:id"];
    const isPublicPath = ["/signin", "/signup", "/forgot-password"];

    if (req.auth) {
        if (isPublicPath.includes(path)) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
        return NextResponse.next();
    }

    const encodedToken = req.cookies.get("session_cookie")?.value;

    if (isProtectedPath.includes(path) && !encodedToken) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    if (encodedToken) {
        const decodedToken = decryptJWT(encodedToken!);

        if (!decodedToken || !verifyJWTInEdge(decodedToken)) {
            const response = NextResponse.redirect(new URL("/signin", req.nextUrl));

            response.cookies.set("session_cookie", "", {
                path: "/",
                expires: new Date(0),
            });

            return response;
        }
    }

    if (isPublicPath.includes(path) && encodedToken) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/", "/signin", "/signup", "/product/:id"],
};
