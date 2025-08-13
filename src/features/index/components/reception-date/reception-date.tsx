"use client"

import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';

export default function AddToGoogleCalendarButton() {
    const event = {
        title: "The Wedding of Bima and Nafia",
        location: "Gedung Balai Prajurit RM Moedjono Poerbonegoro Puspenerbal Juanda, Jl. Raya Bandara Juanda Juanda No.11, Sudimoro, Betro, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61253, Indonesia",
        description: "Wedding Ceremony",
        startTime: new Date(Date.UTC(2025, 9, 24, 20, 0, 0)),
        endTime: new Date(Date.UTC(2025, 9, 24, 22, 0, 0)),
    };

    const formatDate = (date: Date) => format(date, "yyyyMMdd'T'HHmmss'Z'");

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        event.title
    )}&dates=${formatDate(event.startTime)}/${formatDate(
        event.endTime
    )}&details=${encodeURIComponent(
        event.description
    )}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;

    return (
        <Button 
            asChild
            className="font-merriweather button-1 rounded-full bg-[#819BB1] p-6 text-white"
            variant="outline"
        >
            <Link 
                href={googleCalendarUrl} 
                target='_blank'
                rel='noopener noreferrer'
            >
                Tambah ke Kalender
            </Link>
        </Button>
    );
}
