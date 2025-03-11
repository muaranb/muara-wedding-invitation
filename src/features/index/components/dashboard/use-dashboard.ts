'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Daftarkan plugin
gsap.registerPlugin(ScrollTrigger);

export const useDashboard = () => {
    const dashboardRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: dashboardRef.current,
                    start: "top top",
                    end: "+=1500px",
                    pin: true,
                    scrub: true,
                    // markers: true,
                }
            });
            tl.fromTo(dashboardRef.current, 
                { opacity: 0 }, 
                { opacity: 1, ease: "sine.in", duration: 0.5 }, 
                0.1
            );
            // tl.to(dashboardRef.current, 
            //     { opacity: 0, ease: "sine.out", duration: 0.5 }, 
            //     0.9
            // );

            // Title
            tl.fromTo(".title", 
                { scale: 0 }, 
                { scale: 1, ease: "power2.out", duration: 0.5 }, 
                0.5
            );
            // tl.to(".title", 
            //     { scale: 0, ease: "power2.in", duration: 0.5 }, 
            //     0.6
            // );

            // Text
            tl.fromTo('.text', 
                { scale: 0 }, 
                { scale: 1, ease: "power2.out", duration: 0.5 }, 
                0.5
            );
            // tl.to('.text', 
            //     { scale: 0, ease: "power2.in", duration: 0.5 }, 
            //     0.6
            // );
        }, dashboardRef);

        return () => ctx.revert();
    }, []);

    return {
        dashboardRef
    }
}
