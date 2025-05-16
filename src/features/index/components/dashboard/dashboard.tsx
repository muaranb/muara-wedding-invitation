"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Invitation } from "../../types/index/invitation"

export default function Dashboard() {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams()
    const router = useRouter()
    const userID = searchParams.get('q')
    const [invitation, setInviation] = useState<Invitation | null>()

    useEffect(() => {
        setIsClient(true);

        // Auto scroll after page and user loaded
        const handleScroll = () => {
            const targetY = 1900;
            const threshold = 10;
            let scrolling = false;
            
            const scroll = () => {
                if (scrolling) return;

                const currentY = window.scrollY;
                if (Math.abs(currentY - targetY) <= threshold) {
                    console.log('Reached target scroll position:', currentY);
                    scrolling = false;
                    return;
                }

                window.scrollTo({ top: targetY, behavior: 'smooth' });

                setTimeout(scroll, 200);
            };

            scroll(); 
        };

        // Get invitation user
        const fetchData = async () => {
            // Check if request has userID
            if (!userID) {
                router.push('/404')
                return
            }

            // Get user invitation
            const res = await fetch(`/api/users?userID=${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (!res.ok || !data) {
                router.push('/404')
                return
            } else {
                handleScroll()
                window.addEventListener('resize', handleScroll);
            }
        
            setInviation(data)
        }
        fetchData()

        return () => {
            window.removeEventListener('resize', handleScroll);
        };
    }, [userID, router])

    if (!isClient) return null; // Prevent render until mounted

    return (
        <>
            <p className="text text-1 mb-4 text-sm">THE WEDDING OF</p>
            <h1 className="title font-[Parisienne] text-7xl -mb-1">Bima &nbsp;</h1>
            <h1 className="title font-[Parisienne] text-7xl -mt-1 mb-48">&nbsp; Nafia</h1>
            <p className="text text-2 text-sm mb-3">KEPADA YTH</p>
            <p className="text text-3 text-sm">{invitation?.honorific} {invitation?.name}</p>
        </>
    );
}
