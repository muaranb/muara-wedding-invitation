"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux-store/store";
import { closeGallery } from "@/redux-store/gallerySlice";

import { AnimatePresence, motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function PhotoGallery() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.gallery.isOpen);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <button
                        onClick={() => dispatch(closeGallery())}
                        className="text-white absolute top-4 right-4 text-2xl z-50"
                    >
                        ✕
                    </button>

                    <div className="max-w-[440px] w-full h-full flex flex-col justify-center">
                        {/* Main Swiper */}
                        <Swiper
                            style={
                                {
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                    height: "500px",
                                    width: "100%",
                                } as React.CSSProperties
                            }
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            {Array.from({ length: 21 }).map((_, i) => (
                                <SwiperSlide key={i}>
                                    <div className="relative w-full h-[500px]">
                                        <Image
                                            src={`/images/bridal-photo/photo-gallery/${i + 1}.jpeg`}
                                            alt={`Slide ${i + 1}`}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnail Swiper */}
                        <Swiper
                            style={{ height: "100px", width: "100%" } as React.CSSProperties}
                            loop={true}
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper mt-4"
                        >
                            {Array.from({ length: 21 }).map((_, i) => (
                                <SwiperSlide key={i}>
                                    <div className="relative w-full h-[100px]">
                                        <Image
                                            src={`/images/bridal-photo/photo-gallery/${i + 1}.jpeg`}
                                            alt={`Thumb ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
