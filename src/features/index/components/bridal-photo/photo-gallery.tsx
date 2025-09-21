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
import { bridalPhoto } from "./use-bridal-photo";

export default function PhotoGallery() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.gallery.isOpen);

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
                            {bridalPhoto.map((img) => (
                                <SwiperSlide key={img}>
                                    <div className="relative w-full h-[500px]">
                                        <Image
                                            src={`/images/bridal-photo/photo-gallery/${img}.jpg`}
                                            alt={`Slide ${img}`}
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
                            {bridalPhoto.map((img) => (
                                <SwiperSlide key={img}>
                                    <div className="relative w-full h-[100px]">
                                        <Image
                                            src={`/images/bridal-photo/photo-gallery/${img}.jpg`}
                                            alt={`Thumb ${img}`}
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
