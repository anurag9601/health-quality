import { prismaClient } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const id = req.url.split("/").slice(-1)[0];

        console.log("get request", id);

        const { newPassword } = await req.json();

        if (id === "") {
            return NextResponse.json({ error: "Invalid URL" }, { status: 401 });
        }

        const user = await prismaClient.user.findFirst({
            where: {
                passwordResetId: id
            }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid URL" }, { status: 401 });
        }

        const isSamePass = await bcrypt.compare(newPassword, user.password);

        if (isSamePass) {
            return NextResponse.json({ passwordError: "Please choose a new password that is different from your existing password." }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                password: hashedPassword,
                passwordResetId: ""
            }
        });

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err) {
        console.log(`Error in /api/new-password/:id route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}