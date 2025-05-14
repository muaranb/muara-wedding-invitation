"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Invitation } from "../../types/index/invitation"
import { getUser } from "../index"

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
            window.scrollTo({ top: 1900, behavior: 'smooth' });
        };

        // Get invitation user
        const fetchData = async () => {
            // Check if request has userID
            if (!userID) {
                router.push('/404')
                return
            }

            // Get user invitation
            const data: Invitation | null = await getUser(userID as string);
            if (!data) {
                router.push('/404')
                return
            } else {
                window.addEventListener('load', handleScroll);
                window.addEventListener('resize', handleScroll);
            }
        
            setInviation(data)
        }
        fetchData()

        return () => {
            window.removeEventListener('load', handleScroll);
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
