"use client"

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card";
import AddToGoogleCalendarButton from "@/features/index/components/reception-date/reception-date";
import Link from "next/link";
import Dashboard from "@/features/index/components/dashboard/dashboard-v3";
import ButtonPlayMusic from "@/features/index/components/button-play-music";
import { ButtonGreetings, GreetingsCard } from "@/features/index/components/greetings";
import GiftCard from "@/features/index/components/gift/gift-card";
import PhotoGallery from "@/features/index/components/bridal-photo/photo-gallery";
import { openGallery } from "@/redux-store/gallerySlice";
import { useDispatch } from "react-redux";
// import Dashboard from "@/features/index/components/dashboard/dashboard";

// Daftarkan plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const dispatch = useDispatch();
	const mainContainer = useRef<HTMLDivElement | null>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const scrollHeight = 6000;
	const timelineList = useMemo(() => [0, .19, .36, .5, 0.68, 0.86, 1], []);

	// Main Animation
	useGSAP(() => {
		const ctx = gsap.context(() => {
			const dashboard = gsap.timeline({ delay: 1 })
				.fromTo('#dashboard', 
					{ zIndex: 0, },
					{ zIndex: 1, ease: "none", duration: 0 },
				)
				.fromTo('#dashboard', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.inOut", duration: 1 },
				)
				.fromTo('#dashboard .text-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#dashboard .text-2', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#dashboard .text-3', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#dashboard .text-4', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.addLabel("dashboard_timeline")

			const bridalPhoto = gsap.timeline({ delay: 1 })
				.fromTo('#bridal_photo', 
					{ zIndex: 0, },
					{ zIndex: 2, ease: "none", duration: 0 }
				)
				.fromTo('#bridal_photo', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 1 },
				)
				.fromTo('#bridal_photo .text-1', 
					{ opacity: 0, },
					{ opacity: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#bridal_photo .text-2', 
					{ opacity: 0, },
					{ opacity: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#bridal_photo .image-1', 
					{ scale: 0 },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#bridal_photo .button-1', 
					{ scale: 0, translateY: 300 },
					{ scale: 1, translateY: 0, ease: "power1.inOut", duration: 1 },
					'='
				)
				.addLabel("bridal_photo_timeline")

			const receptionDate = gsap.timeline({ delay: 1 })
				.fromTo('#reception_date', 
					{ zIndex: 0, },
					{ zIndex: 3, ease: "none", duration: 0 }
				)
				.fromTo('#reception_date', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 1 },
				)
				.fromTo('#reception_date .text-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#reception_date .text-2', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#reception_date .text-3', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#reception_date .button-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.addLabel("reception_date_timeline")

			const map = gsap.timeline({ delay: 1 })
				.fromTo('#map', 
					{ zIndex: 0, },
					{ zIndex: 4, ease: "none", duration: 0 }
				)
				.fromTo('#map', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 1 },
				)
				.fromTo('#map .text-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#map .text-2', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#map .card', 
					{ translateY: screen.height, },
					{ translateY: 0, ease: "power1.inOut", duration: 1 },
					'='
				)
				.addLabel("map_timeline")
			
			const greetings = gsap.timeline({ delay: 1 })
				.fromTo('#greetings', 
					{ zIndex: 0, },
					{ zIndex: 5, ease: "none", duration: 0 }
				)
				.fromTo('#greetings', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 1 },
				)
				.fromTo('#greetings .text-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#greetings .card', 
					{ opacity: 0, },
					{ opacity: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#greetings .button-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'='
				)
				.addLabel("greetings_timeline")

			const gift = gsap.timeline({ delay: 1 })
				.fromTo('#gift', 
					{ zIndex: 0, },
					{ zIndex: 6, ease: "none", duration: 0 }
				)
				.fromTo('#gift', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 1 },
				)
				.fromTo('#gift .card-1', 
					{ translateY: screen.height, },
					{ translateY: 0, ease: "power1.inOut", duration: 1 },
					'='
				)
				.fromTo('#gift .button-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }, 
					'='
				)
				.addLabel("gift_timeline")

			// Master timeline
			timelineRef.current = gsap.timeline()
				.add(dashboard)
				.add(bridalPhoto)
				.add(receptionDate)
				.add(map)
				.add(greetings)
				.add(gift)

			ScrollTrigger.create({
				animation: timelineRef.current,
				trigger: mainContainer.current,
				start: 'top top',
				end: `+=${scrollHeight}`,
				pin: true,
				scrub: true,
				fastScrollEnd: 100,
                snap: {
                	snapTo: timelineList,
                	delay: 0,
                	duration: {
                		min: 2,
                		max: 2,
                	}
                },
			})
		});

		return () => ctx.revert();
	}, []);

	return (
		<>
			<main ref={mainContainer} className="relative min-h-screen max-w-[440px] overflow-x-hidden mx-auto bg-white">
				<section id="dashboard" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/dashboard.webp)] bg-cover bg-center flex flex-col items-center justify-center opacity-0">
					{/* <Suspense fallback={<div>Loading...</div>}> */}
						<Dashboard />
					{/* </Suspense> */}
				</section>

				<section id="bridal_photo" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/bridal-photo.webp)] bg-cover bg-center flex flex-col items-center justify-center text-center opacity-0 overflow-hidden">
					<h1 className="font-pinyonScript text-1 text-4xl mb-2 px-4">Bima<br /> Aurasakti Rochmatullah</h1>
					<p className="font-merriweather	text-2 px-4">Putra dari Suluh Riawan<br /> dan Umi Adhiyati</p>
					<div className="flex items-center justify-center">
						<Image
							className="image-1"
							src="/images/bridal-photo/middle-flower.png"
							width={255}
							height={148}
							alt="bridal photo"
						/>
					</div>
					<h1 className="font-pinyonScript text-1 text-4xl mb-2 px-4">Nafia Mufidah Fatchur</h1>
					<p className="font-merriweather	text-2 px-4 mb-16">Putri dari Alm. Fatchur Rochman<br /> dan Almh. Ibu Suhaimi</p>
					<Button 
						className="font-merriweather button-1 rounded-full bg-[#819BB1] px-16 py-6 text-white" 
						variant="outline" 
						onClick={() => dispatch(openGallery())}
						type="button"
					>
						View Photos
					</Button>
				</section>

				<section id="reception_date" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/reception-date.webp)] bg-cover bg-center flex flex-col items-center justify-center text-center opacity-0 px-20 text-[#213857]">
					<h1 className="font-pinyonScript text-1 text-5xl -mt-1 mb-6">Akad</h1>
					<p className="font-merriweather text-2 text-sm mb-10">
						Minggu, 25 Oktober 2025 <br />
						Pukul 07.00 - 08.00
					</p>
					<h1 className="font-pinyonScript text-1 text-5xl -mt-1 mb-6">Resepsi</h1>
					<p className="font-merriweather text-2 text-sm mb-24">
						Minggu, 25 Oktober 2025 <br />
						Pukul 10.00 - 12.00
					</p>
					{/* <p className="font-merriweather text-3 text-sm text-wrap mb-4">
						Gedung Balai Prajurit RM Moedjono Poerbonegoro Puspenerbal Juanda
					</p>
					<p className="font-merriweather text-3 text-sm text-wrap mb-16">
						Jl. Raya Bandara Juanda Juanda No.11, Sidoarjo
					</p> */}
					<AddToGoogleCalendarButton />
				</section>

				<section id="map" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/map.webp)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden opacity-0 px-8 xs:px-10">
					<h1 className="font-pinyonScript text-1 text-[#213857] text-5xl mb-4">Lokasi Acara</h1>
					<p className="font-merriweather text-2 text-[#213857] text-sm mb-8">Gedung Balai Prajurit RM Moedjono<br /> Poerbonegoro Puspenerbal Juanda</p>
					<Card className="card relative w-full h-[460px] xs:h-[489px] rounded-[34px] bg-[#819bb1] shadow-lg overflow-hidden backdrop-blur-[4px] backdrop-saturate-[100%] bg-opacity-20 border border-opacity-20 border-[#ffffff]">
						<CardContent className="h-full flex flex-col p-6 xs:p-8 z-10">
							<div className="flex-grow mb-10">
								<iframe 
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6102.142579328635!2d112.76504018948663!3d-7.3818972870013155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e5913eb8d973%3A0xfafce6c18f301b35!2sGedung%20Balai%20Prajurit%20RM%20Moedjono%20Poerbonegoro%20Puspenerbal%20Juanda!5e0!3m2!1sen!2sid!4v1747147035293!5m2!1sen!2sid" 
									width="100%"
									height="100%"
									style={{ border: "solid 2px #7E6C50", borderRadius: "22px" }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								></iframe>
							</div>
							<div>
								<Button className="font-merriweather rounded-full bg-[#819BB1] px-8 py-6 text-white" variant="outline" asChild>
									<Link href="https://maps.app.goo.gl/RRj6SQB545m9rJja7" target="_blank">Buka Google Maps</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
					<Image
						className="absolute top-12 -left-32"
						src="/images/map/flower-1.png"
						width={240}
						height={460}
						alt="flower"
					/>
					<Image
						className="absolute bottom-6 right-1 xs:bottom-10 xs:right-6"
						src="/images/map/flower-2.png"
						width={83}
						height={168}
						alt="flower"
					/>
				</section>

				<section id="greetings" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/greetings.webp)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden opacity-0 px-6">
					<h1 className="font-pinyonScript text-1 text-5xl">Kirim Ucapan</h1>
					<Image
						className="absolute bottom-12 right-0"
						src="/images/greetings/flower-2.png"
						width={145}
						height={416}
						alt="flower"
					/>
					<GreetingsCard />
					<Image
						className="absolute top-0 left-0"
						src="/images/greetings/flower-1.png"
						width={137}
						height={396}
						alt="flower"
					/>
					<ButtonGreetings />
				</section>

				<section id="gift" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/gift.webp)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden opacity-0 px-6">
					{/* <Card className="card w-[340px] h-[489px] rounded-[34px] bg-[url(/images/card-background.jpg)] bg-cover bg-center shadow-lg">
						<CardContent className="h-full flex flex-col p-8 justify-center">
							<h1 className="font-pinyonScript text-5xl mb-10">Kirim Hadiah</h1>
							<p className="font-merriweather text-sm mb-6">Kehadiran Bapak/Ibu/Saudara/i merupakan suatu tanda kasih bagi kami.</p>
							<p className="font-merriweather text-sm mb-16">Apabila ingin memberi tanda kasih dalam bentuk lain, Anda dapat memberi tanda kasih melalui tombol berikut:</p>
							<div className="font-merriweather w-full flex justify-center">
								<Button className="button rounded-full bg-[#819BB1] py-5 px-16 flex">Klik Disini</Button>
							</div>
						</CardContent>
					</Card> */}
					<GiftCard />
					<Image
						className="absolute -bottom-4 xs:bottom-6 right-0"
						src="/images/gift/flower-1.png"
						width={126}
						height={230}
						alt="flower"
					/>
				</section>

				<ButtonPlayMusic />
			</main>

			<PhotoGallery />
		</>

	);
}
