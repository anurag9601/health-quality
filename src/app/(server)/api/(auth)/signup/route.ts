import { prismaClient } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createJWTToken, encryptJWT } from "@/services/jwt";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Fill all the fields" }, { status: 400 });
        }

        const user = await prismaClient.user.findUnique({
            where: {
                email,
            }
        });

        if (user) {
            return NextResponse.json({ error: "User email is already registered" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prismaClient.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        const payload = {
            id: newUser.id,
            email: newUser.email,
            continueWith: newUser.continueWith
        }

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
            sameSite: "strict"
        });

        return response;
    } catch (err) {
        console.log(`Error in /api/signup route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}