import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function ProtectRoute(req: NextRequest) {
    const encodedToken = req.cookies.get("session_cookie")?.value;

    const session = await auth();

    if (encodedToken || session?.user) return true;

    return false
}