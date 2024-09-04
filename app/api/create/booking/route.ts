import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.TOKEN}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();
        const { name, email, phone, checkIn, checkOut } = data;

        const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
        const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];

        const token = generateToken();

        const query = `
            INSERT INTO bookings (name, email, phone, check_in, check_out, verified, token)
            VALUES (?, ?, ?, ?, ?, false, ?)
        `;
        await pool.query(query, [name, email, phone, formattedCheckIn, formattedCheckOut, token]);

        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

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
            text: `Dear ${name},\n\nPlease verify your booking by clicking on the following link: ${verificationUrl}\n\nThank you!`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Booking created and verification email sent successfully' }, { status: 201 });

    } catch (err: any) {
        console.error('Error:', err);
        return NextResponse.json({ message: 'Booking has not been created', error: err.message || 'Unknown error' }, { status: 500 });
    }
}
