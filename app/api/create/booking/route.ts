import pool from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const AUTH = process.env.TOKEN;

export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${AUTH}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const { name, email, phone, checkIn, checkOut, verified } = data;

        const query = `
            INSERT INTO bookings (name, email, phone, check_in, check_out, verified)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await pool.query(query, [name, email, phone, checkIn, checkOut, verified]);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Booking Verification',
            text: `Dear ${name},\n\nPlease verify your booking from ${checkIn} to ${checkOut}. If this was not you, please dismiss this email.\n\nThank you!`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Booking created and verification email sent successfully' }, { status: 201 });

    } catch (err: any) {
        console.error('Error:', err);  // Log the error for debugging
        return NextResponse.json({ message: 'Booking has not been created', error: err.message }, { status: 500 });
    }
}
