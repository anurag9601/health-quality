import { NextRequest } from "next/server";

export function ProtectRoute(req: NextRequest) {
    const encodedToken = req.cookies.get("session_cookie")?.value;

    const googleAuthToken = req.cookies.get("authjs.session-token")?.value;

    if (encodedToken || googleAuthToken) return true;

    return false
}