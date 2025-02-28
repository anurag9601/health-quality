import { prismaClient } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createJWTToken, encryptJWT } from "@/services/jwt";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Fill all the fields" }, { status: 400 });
        }

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        });

        if (user && user.continueWith === "google") {
            return NextResponse.json({ error: "You're already signed in with Google. Click 'Continue with Google' to proceed." });
        }

        if (!user) {
            return NextResponse.json({ error: "email register user not found" }, { status: 400 });
        }

        const hashedPassword = user.password;

        const validPassword = await bcrypt.compare(password, hashedPassword);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid user password" }, { status: 400 })
        };

        const payload = {
            id: user.id,
            email: user.email,
            continueWith: user.continueWith
        };

        const token = createJWTToken(payload);

        const encryptedToken = encryptJWT(token);

        const response = NextResponse.json({
            data: payload
        });

        response.cookies.set({
            name: "session_cookie",
            value: encryptedToken,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
        });

        return response;

    } catch (err) {
        console.log(`Error in /api/signin route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}