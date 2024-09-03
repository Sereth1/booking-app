import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
    const AUTH = process.env.TOKEN;
    const authHeader = req.headers.get('Authorization');

    if (!authHeader || authHeader !== `Bearer 187J12KN*$@!POUTANAS2938!@klanias`) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [rows] = await pool.query('SELECT check_in, check_out FROM bookings');

        if (!rows) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(rows, { status: 200 });
    } catch (err) {
        console.error('Error fetching booked dates:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
