import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'vlsqz.gabrielle@gmail.com',
            replyTo: email,
            subject: `Portfolio Message: New message from ${name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                    <h2 style="color: #111111; margin-bottom: 20px;">New Message from GAV.DEV</h2>
                    <p><strong>Sender:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
                    <p style="color: #333333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Message successful." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Backend API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error. Message failed." },
            { status: 500 }
        );
    }
}