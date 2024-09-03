'use client';
import { useState, useEffect } from 'react';

const useGetDate = () => {
    const [bookedDates, setBookedDates] = useState<Date[]>([]);

    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const response = await fetch('/api/get/dates', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                    },
                });

                const result = await response.json();
                if (response.ok) {
                    const dates = result.flatMap((booking: { check_in: string; check_out: string }) => {
                        const checkIn = new Date(booking.check_in);
                        const checkOut = new Date(booking.check_out);
                        const daysBetween = [];

                        let currentDate = checkIn;
                        while (currentDate <= checkOut) {
                            daysBetween.push(new Date(currentDate));
                            currentDate.setDate(currentDate.getDate() + 1);
                        }

                        return daysBetween;
                    });
                    setBookedDates(dates);
                } else {
                    console.error('Failed to fetch booked dates:', result.message);
                }
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, []);

    return { bookedDates };
};

export default useGetDate;
