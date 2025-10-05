"use client";

import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux-store/store";

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { closeGift } from "@/redux-store/giftSlice";

export default function PopupQR() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.gift.isOpen);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <button
                        onClick={() => dispatch(closeGift())}
                        className="text-white absolute top-4 right-4 text-2xl z-50"
                    >
                        ✕
                    </button>

                    <div className="max-w-[440px] w-full h-full flex flex-col justify-center">
                        <Card>
                            <CardContent className="p-6">
                                <Image
                                    src="/images/gift/qris.jpg"
                                    width={2000}
                                    height={2000}
                                    alt="qris"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
