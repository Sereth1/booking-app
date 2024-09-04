import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ message: 'Invalid or missing token' }, { status: 400 });
    }

    try {
        const result = await pool.query('SELECT * FROM bookings WHERE token = ?', [token]);

        if (!result) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        // Update the booking to mark it as verified
        await pool.query('UPDATE bookings SET verified = true WHERE token = ?', [token]);

        return NextResponse.json({ message: 'Booking verified successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error verifying booking:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
