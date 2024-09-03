import pool from '@/lib/db';
import { NextResponse } from 'next/server';

const AUTH = process.env.TOKEN
export async function GET(req: Request) {

    const authHeader = req.headers.get("Authorization")
    if (!authHeader || authHeader !== `Bearer ${AUTH}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const [rows] = await pool.query('SELECT * FROM Bookings');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}
