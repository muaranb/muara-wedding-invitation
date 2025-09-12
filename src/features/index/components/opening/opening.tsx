"use client";

import { Button } from "@/components/ui/button";
import { openInvitation } from "@/redux-store/initialSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { RootState } from "@/redux-store/store";
import { useEffect } from "react";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function Opening() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.initial.isInvitationOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "auto";
            smoothScrollTo(1000, 1000);
        } else {
            document.body.style.overflow = "hidden";
            smoothScrollTo(0, 1000);
        }
    }, [isOpen]);

    return (
        <div className="text-[#213857] text-center">
            <p className="font-merriweather text-3 font-bold text-lg mb-14">THE WEDDING OF</p>
            <div className="flex justify-center justify-items-center mb-8">
                <Image src="/images/opening/logo-muara.png" alt="Logo Muara" width={135} height={117} />
            </div>
            <p className="font-merriweather text-3 font-bold text-lg mb-14 text-[#A8B1BD]">
                #<span className="text-[#C793B4]">FIA</span>nally<span className="text-[#8EA9CE]">BIM</span>ine
            </p>
            <div className="h-20 flex justify-center items-center">
                <AnimatePresence>
                    <motion.div
                        key="box"
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Button 
                            className="font-merriweather button-1 rounded-full bg-[#213857] px-16 py-6 text-white" 
                            variant="outline" 
                            onClick={() => dispatch(openInvitation())}
                            type="button"
                        >
                            Open Invitation
                        </Button>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
