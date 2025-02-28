import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
    try {
        const { userEmail, id } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL as string,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASS as string,
            }
        });

        const mailOptions = {
            from: "anuragmishrap13@gmail.com",
            to: userEmail,
            subject: "Password Reset",
            text: `You're receiving this e-mail because you or someone else has requested a password reset for your user account at .

        Click the link below to reset your password:
        ${process.env.NEXTAUTH_URL}/new-password/${id}

        If you did not request a password reset you can safely ignore this email.`
        }

        const sendMail = await transporter.sendMail(mailOptions);

        if (sendMail) {
            return NextResponse.json({ success: true }, { status: 200 })
        }

        return NextResponse.json({ success: false }, { status: 400 })
    } catch (err) {
        console.log(`Error in /api/me route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}