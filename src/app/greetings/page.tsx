import Image from 'next/image'
import { ButtonGreetings } from "@/features/index/components/greetings";
import SplashScreen from "@/features/index/components/splash-screen/splash-screen";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono, Meie_Script, Merriweather, Pinyon_Script } from "next/font/google";
import IdleAnimation from '@/features/index/components/idle-animation';
import { GreetingsCardScrollable } from '@/features/index/components/greetings/greetings-card-scrollable';
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--pinyon-script",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400"],
});

const merriweather = Merriweather({
  variable: "--merriweather",
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "700", "900"],
});

const meieScript = Meie_Script({
  variable: "--meie-script",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

export default function Home() {
	return (
		<body
			className={`${geistSans.variable} ${geistMono.variable} ${pinyonScript.variable} ${merriweather.variable} ${meieScript.variable} antialiased relative overflow-hidden`}
		>
			<SplashScreen />

			<main className="relative min-h-screen max-w-[440px] overflow-x-hidden mx-auto bg-white">
				<section id="greetings" className="absolute top-0 min-h-screen w-full bg-[url(/backgrounds/greetings.webp)] bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden px-6">
					<h1 className="font-pinyonScript text-1 text-5xl">Kirim Ucapan</h1>
					<Image
						className="absolute bottom-12 right-0"
						src="/images/greetings/flower-2.png"
						width={145}
						height={416}
						alt="flower"
					/>
					<GreetingsCardScrollable />
					<Image
						className="absolute top-0 left-0"
						src="/images/greetings/flower-1.png"
						width={137}
						height={396}
						alt="flower"
					/>
					<ButtonGreetings />
				</section>
			</main>

			<IdleAnimation />
			<Toaster position="top-center" />
		</body>
	);
}
