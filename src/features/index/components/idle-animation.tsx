"use client";

import { RootState } from "@/redux-store/store";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { smoothScrollTo } from "@/utils/smoothScroll";

const SECTIONS = [0, 1000, 2000, 3000, 4000, 5000, 6000];

export default function IdleAnimation() {
  const isOpen = useSelector(
    (state: RootState) => state.initial.isInvitationOpen
  );
  const [isIdle, setIsIdle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  // --- Idle detection ---
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 2000);
    };

    const events = ["scroll", "keydown", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, []);

  // --- Sync scroll ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <AnimatePresence>
        {(isIdle && isOpen && currentIndex > 0) && (
          <motion.div
            key="btn-up"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
                key="btn-up"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => goToSection("up")}
                className="fixed top-4 left-1/2 -translate-x-1/2 px-3 py-2 bg-[#819BB1] text-white rounded-full h-10 w-10 flex justify-center items-center shadow-lg"
            >
                <ArrowUp size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isIdle && isOpen && currentIndex < SECTIONS.length - 1) && (
            <motion.div
                key="btn-up"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.button
                    key="btn-down"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    onClick={() => goToSection("down")}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 bg-[#819BB1] text-white rounded-full h-10 w-10 flex justify-center items-center shadow-lg"
                >
                    <ArrowDown size={24} />
                </motion.button>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
