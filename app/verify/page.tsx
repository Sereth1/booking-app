'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const VerifyBooking = () => {
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) return;

        const verifyBooking = async () => {
            try {
                const response = await axios.get(`/api/verify?token=${token}`);
                setMessage('Booking successfully verified!');
            } catch (error: any) {
                console.error('Error verifying booking:', error);
                setMessage(`Verification failed: ${error.response?.data?.message || 'Unknown error'}`);
            }
        };

        verifyBooking();
    }, [token]);

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h1 className="text-2xl font-semibold mb-4">Booking Verification</h1>
                    <p className="text-gray-600">Token is missing or invalid.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-semibold mb-4">Booking Verification</h1>
                <p className="text-gray-600">{message || 'Verifying your booking...'}</p>
            </div>
        </div>
    );
};

export default VerifyBooking;
