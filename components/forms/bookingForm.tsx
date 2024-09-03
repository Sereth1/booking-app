'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useGetDate from '../hooks/useGetDate';
import axios from 'axios';

const BookingForm: React.FC = () => {
    const { bookedDates } = useGetDate();
    const AUTH = process.env.NEXT_PUBLIC_TOKEN;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: null as Date | null,
        checkOut: null as Date | null,
        verified: false,
    });

    const validBookedDates = bookedDates
        .map(date => new Date(date))
        .filter(date => !isNaN(date.getTime()));

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [checkIn, checkOut] = dates;
        setFormData({
            ...formData,
            checkIn,
            checkOut,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.checkIn || !formData.checkOut) {
            alert('Please select valid check-in and check-out dates.');
            return;
        }

        try {
            const response = await axios.post('/api/create/booking',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${AUTH}`,
                    }
                }
            );
            console.log('Response:', response.data);
            alert('Booking created and verification email sent!');
        } catch (error: any) {
            console.error('Error creating booking:', error);
            alert(`An error occurred while creating the booking: ${error.response?.data?.message || error.message}`);
        }

    };

    return (
        <div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 p-6 bg-white shadow-md rounded-lg max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-4">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
                    >
                        Book Now
                    </button>
                </form>

                <div className="w-full flex justify-center">
                    <div className="w-full lg:w-[30rem]">
                        <DatePicker
                            selected={formData.checkIn ?? undefined}
                            onChange={handleDateChange}
                            startDate={formData.checkIn ?? undefined}
                            endDate={formData.checkOut ?? undefined}
                            selectsRange
                            inline
                            excludeDates={validBookedDates}
                            minDate={new Date()}
                            dayClassName={date =>
                                validBookedDates.some(d => d.getTime() === date.getTime())
                                    ? 'bg-red-500 text-white cursor-not-allowed opacity-50'
                                    : ''
                            }
                            calendarClassName="scale-150"
                        />

                    </div>


                </div>

            </div>


        </div>
    );
};

export default BookingForm;
