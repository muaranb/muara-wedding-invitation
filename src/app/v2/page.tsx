'use client'

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { greetings } from "@/features/index/components/bridal-photo/use-bridal-photo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Daftarkan plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const mainContainer = useRef<HTMLDivElement | null>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const scrollHeight = 10000;
	const timelineList = useMemo(() => [0, .19, .36, .5, 0.68, 0.86, 1], []);

	// Main Animation
	useGSAP(() => {
		const ctx = gsap.context(() => {
			const dashboard = gsap.timeline({ delay: 1 })
				.fromTo('#dashboard', 
					{ zIndex: 0, },
					{ zIndex: 1, ease: "none", duration: 0 }
				)
				.fromTo('#dashboard', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.inOut", duration: 2 }
				)
				.fromTo('#dashboard .title', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }
				)
				.fromTo('#dashboard .text-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#dashboard .text-2', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#dashboard .text-3', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.addLabel("dashboard_timeline")

			const bridalPhoto = gsap.timeline({ delay: 1 })
				.fromTo('#bridal_photo', 
					{ zIndex: 0, },
					{ zIndex: 2, ease: "none", duration: 0 }
				)
				.fromTo('#bridal_photo', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 2 }
				)
				.fromTo('#bridal_photo .title', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }
				)
				.fromTo('#bridal_photo .text', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#bridal_photo .image-left', 
					{ scale: 0, translateX: -300 },
					{ scale: 1, translateX: 0, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#bridal_photo .image-right', 
					{ scale: 0, translateX: 300 },
					{ scale: 1, translateX: 0, ease: "power1.inOut", duration: 1 },
					'<'
				)
				.fromTo('#bridal_photo .flower-left', 
					{ translateX: -300 },
					{ translateX: 0, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#bridal_photo .flower-right', 
					{ translateX: 300 },
					{ translateX: 0, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.addLabel("bridal_photo_timeline")

			const receptionDate = gsap.timeline({ delay: 1 })
				.fromTo('#reception_date', 
					{ zIndex: 0, },
					{ zIndex: 3, ease: "none", duration: 0 }
				)
				.fromTo('#reception_date', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 2 }
				)
				.fromTo('#reception_date .title', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }
				)
				.fromTo('#reception_date .text-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#reception_date .text-2', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#reception_date .button-1', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.addLabel("reception_date_timeline")

			const map = gsap.timeline({ delay: 1 })
				.fromTo('#map', 
					{ zIndex: 0, },
					{ zIndex: 4, ease: "none", duration: 0 }
				)
				.fromTo('#map', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 2 }
				)
				.fromTo('#map .title', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }
				)
				.fromTo('#map .text', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5'
				)
				.fromTo('#map .card', 
					{ translateY: screen.height, },
					{ translateY: 0, ease: "power1.inOut", duration: 2 },
					'-=0.5'
				)
				.addLabel("map_timeline")
			
			const greetings = gsap.timeline({ delay: 1 })
				.fromTo('#greetings', 
					{ zIndex: 0, },
					{ zIndex: 5, ease: "none", duration: 0 }
				)
				.fromTo('#greetings', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 2 }
				)
				.fromTo('#greetings .title', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }
				)
				.fromTo('#greetings .card', 
					{ translateY: screen.height, },
					{ translateY: 0, ease: "power1.inOut", duration: 2 },
					'-=0.5'
				)
				.fromTo('#greetings .button', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 }
				)
				.addLabel("greetings_timeline")

			const gift = gsap.timeline({ delay: 1 })
				.fromTo('#gift', 
					{ zIndex: 0, },
					{ zIndex: 6, ease: "none", duration: 0 }
				)
				.fromTo('#gift', 
					{ opacity: 0, },
					{ opacity: 1, ease: "sine.out", duration: 2 }
				)
				.fromTo('#gift .card', 
					{ translateY: screen.height, },
					{ translateY: 0, ease: "power1.inOut", duration: 2 },
					'-=0.5'
				)
				.fromTo('#gift .button', 
					{ scale: 0, },
					{ scale: 1, ease: "power1.inOut", duration: 1 },
					'-=0.5' 
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
		<main ref={mainContainer} className="relative min-h-screen max-w-[440px] overflow-x-hidden mx-auto bg-white">
			<section id="dashboard" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/dashboard.jpg)] bg-cover bg-center flex flex-col items-center justify-center">
				<p className="text text-1 mb-4 text-sm">THE WEDDING OF</p>
				<h1 className="title font-[Parisienne] text-7xl -mb-1">Bima &nbsp;</h1>
				<h1 className="title font-[Parisienne] text-7xl -mt-1 mb-48">&nbsp; Nafia</h1>
				<p className="text text-2 text-sm mb-3">KEPADA YTH</p>
				<p className="text text-3 text-sm">Bapak Ibu Tamu Undangan</p>
			</section>

			<section id="bridal_photo" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/bridal-photo.jpg)] bg-cover bg-center flex flex-col items-center justify-center text-center">
				<h1 className="title font-[Parisienne] text-4xl mb-2 px-24">Nafia Mufidah Fatchur</h1>
				<p className="text text-sm px-24">Putra dari Bapak Suluh Riawan dan Ibu Umi Adhiyati</p>
				<div className="relative flex items-center justify-center px-4 my-6">
					<Image
						className="image-left"
						src="/images/bridal-photo/women.png"
						width={224}
						height={224}
						alt="bridal photo"
					/>
					<Image
						className="image-right"
						src="/images/bridal-photo/men.png"
						width={224}
						height={224}
						alt="bridal photo"
					/>
				</div>
				<h1 className="title font-[Parisienne] text-4xl mb-2 px-24">Bima Aurasakti Rochmatullah</h1>
				<p className="text text-sm mb-3 px-24">Putra dari Bapak Suluh Riawan dan Ibu Umi Adhiyati</p>
				<Image
					className="flower flower-left absolute top-0 -left-44"
					src="/images/bridal-photo/flower-2.gif"
					width={372}
					height={413}
					alt="flower"
					unoptimized
				/>
				<Image
					className="flower flower-right absolute bottom-6 -right-28"
					src="/images/bridal-photo/flower-1.gif"
					width={228}
					height={317}
					alt="flower"
					unoptimized
				/>
			</section>

			<section id="reception_date" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/reception-date.jpg)] bg-cover bg-center flex flex-col items-center justify-center text-center px-20">
				<h1 className="title font-[Parisienne] text-4xl -mt-1 mb-20">Resepsi</h1>
				<p className="text text-1 text-sm mb-4">
					Minggu, 25 Oktober 2025 <br />
					Pukul 11.00 - selesai
				</p>
				<p className="text text-2 text-sm text-wrap mb-20">
					Grand Royal Ballroom <br />
					Perum Kertajaya Indah Regency, Gebang Pratama, No. 6-8
				</p>
				<Button className="button-1 rounded-full bg-[#7E6C50] px-7 py-5">Tambah ke Kalender</Button>
			</section>

			<section id="map" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/map.jpg)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden px-10">
				<h1 className="title font-[Parisienne] text-5xl mb-4">Lokasi Acara</h1>
				<p className="text text-sm mb-8">Perum Kertajaya Indah Regency, Gebang Pratama, No.6-8, Keputih, Kec. Sukolilo, Surabaya, Jawa Timur 60111</p>
				<Card className="card w-full h-[489px] rounded-[34px] bg-[url(/images/card-background.jpg)] bg-cover bg-center shadow-lg">
					<CardContent className="h-full flex flex-col p-8">
						<div className="flex-grow mb-10">
							<iframe 
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.07371320735!2d112.73300783105158!3d-7.34561053295627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb4b0d8c2dff%3A0xb0e6098509d44856!2sGedung%20Graha%20Wisata!5e0!3m2!1sen!2sid!4v1740643915133!5m2!1sen!2sid" 
								width="100%"
								height="100%"
								style={{ border: "solid 2px #7E6C50", borderRadius: "22px" }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
						<div>
							<Button className="button-1 rounded-full bg-[#7E6C50] px-7 py-5">Buka Google Maps</Button>
						</div>
					</CardContent>
				</Card>
			</section>

			<section id="greetings" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/greetings.jpg)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden px-6">
				<h1 className="title font-[Parisienne] text-4xl">Kirim Ucapan</h1>
				<ScrollArea 
					className="scrollable relative h-[600px] w-full rounded-md pb-8 pt-4 px-4 cursor-grab" 
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 80px, black 120px, black calc(100% - 120px), rgba(0, 0, 0, 0.7) calc(100% - 80px), transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 80px, black 120px, black calc(100% - 120px), rgba(0, 0, 0, 0.7) calc(100% - 80px), transparent 100%)"
                    }} 
				>
					{greetings.map((msg) => (
						<Card key={msg.id} className="card w-full rounded-[34px] bg-cover bg-center shadow-lg relative mt-10">
							<CardContent className="h-full flex flex-col pt-8">
								<Avatar className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 border-4 border-[#665344]">
									<AvatarImage src={msg.avatarUrl || "/default-avatar.png"} />
									<AvatarFallback>{msg.name.charAt(0)}</AvatarFallback>
								</Avatar>
								<div className="flex flex-col items-start">
									<h2 className="font-bold mb-1">{msg.name}</h2>
									<p className="text text-xs text-left mb-1">{msg.message}</p>
									<small className="text-[10px] text-[#BABABA]">{msg.time}</small>
								</div>
							</CardContent>
						</Card>
					))}
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<div className="w-full px-4">
					<Button className="button w-full rounded-full bg-[#7E6C50] py-5">Kirim Ucapan / RSVP</Button>
				</div>
			</section>

			<section id="gift" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/gift.jpg)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden px-6">
				<Card className="card w-[340px] h-[489px] rounded-[34px] bg-[url(/images/card-background.jpg)] bg-cover bg-center shadow-lg">
					<CardContent className="h-full flex flex-col p-8 justify-center">
						<h1 className="title font-[Parisienne] text-4xl mb-10">Kirim Hadiah</h1>
						<p className="text text-sm mb-6">Kehadiran Bapak/Ibu/Saudara/i merupakan suatu tanda kasih bagi kami.</p>
						<p className="text text-sm mb-16">Apabila ingin memberi tanda kasih dalam bentuk lain, Anda dapat memberi tanda kasih melalui tombol berikut:</p>
						<div className="w-full flex justify-center">
							<Button className="button rounded-full bg-[#7E6C50] py-5 px-16 flex">Klik Disini</Button>
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	);
}
