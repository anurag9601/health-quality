import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
    try {
        const { userEmail } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "anuragmishrap13@gmail.com",
                pass: "zhcvqyvbcbhszrsh"
            }
        });

        const init = await transporter.sendMail({
            from: "anuragmishrap13@gmail.com",
            to: userEmail,
            
        })


    } catch (err) {
        console.log(`Error in /api/me route ${err}`);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}