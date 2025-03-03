import { prismaClient } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();

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

    return NextResponse.json({ valid: true }, { status: 200 })
}