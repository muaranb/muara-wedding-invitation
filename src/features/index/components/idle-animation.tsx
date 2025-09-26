"use client";

import { RootState } from "@/redux-store/store";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import { smoothScrollTo } from "@/utils/smoothScroll";

const SECTIONS = [0, 1000, 2000, 3000, 4000, 5000, 6000];

export default function IdleAnimation() {
    const isOpen = useSelector((state: RootState) => state.initial.isInvitationOpen);
    const [isIdle, setIsIdle] = useState(false);

    // Daftar posisi Y target scroll (misalnya tinggi tiap section)
    const [currentIndex, setCurrentIndex] = useState(1);

    // --- Idle detection ---
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const resetTimer = () => {
            setIsIdle(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsIdle(true), 3000); // 3 detik idle
        };

        // Event yang dianggap sebagai aktivitas
        const events = ["mousemove", "scroll", "keydown", "click"];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        // Jalankan pertama kali
        resetTimer();

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
            clearTimeout(timeout);
        };
    }, []);

    // --- Sinkronisasi scroll dengan currentIndex ---
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Cari section terdekat
            let closestIndex = 0;
            let minDiff = Infinity;
            SECTIONS.forEach((pos, i) => {
                const diff = Math.abs(scrollY - pos);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestIndex = i;
                }
            });
            setCurrentIndex(closestIndex);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // sync awal

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fungsi pindah section
    const goToSection = (direction: "up" | "down") => {
        let newIndex = currentIndex;

        if (direction === "up") {
            newIndex = Math.max(0, currentIndex - 1);
        } else {
            newIndex = Math.min(SECTIONS.length - 1, currentIndex + 1);
        }

        setCurrentIndex(newIndex);
        smoothScrollTo(SECTIONS[newIndex], 800);
    };

    return (
        <AnimatePresence>
            {(isIdle && isOpen) && (
                <motion.div
                    className="fixed bottom-0 right-0 left-0 top-0 flex justify-between flex-col gap-2"
                    initial={{ opacity: 0 }} // animasi masuk
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // animasi keluar
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center py-4">
                        {(currentIndex > 0) && (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                onClick={() => goToSection("up")}
                                className="px-3 py-2 bg-[#819BB1] text-white rounded-full h-10 w-10 flex justify-center items-center"
                            >
                                <ArrowUp size={28} />
                            </motion.button>
                        )}

                    </div>

                    <div className="flex justify-center py-4">
                        {(currentIndex < SECTIONS.length - 1) && (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                onClick={() => goToSection("down")}
                                className="px-3 py-2 bg-[#819BB1] text-white rounded-full h-10 w-10 flex justify-center items-center"
                            >
                                <ArrowDown size={28} />
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
