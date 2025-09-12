"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Sembunyikan splash screen hanya ketika semua resource selesai diload
        const handleLoad = () => {
            setTimeout(() => setIsLoading(false), 500); // kasih sedikit delay biar smooth
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="animate-pulse text-center">
                        <Image
                            src="/images/opening/logo-muara.png"
                            alt="Logo Muara"
                            width={135}
                            height={117}
                            priority
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
