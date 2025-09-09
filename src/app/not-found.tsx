import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather, Pinyon_Script } from "next/font/google";
import Script from "next/script";
import Image from 'next/image';

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

export const metadata: Metadata = {
  title: "Bima & Nafia",
  description: "Every love story is beautiful, but ours is my favorite.",
  openGraph: {
    title: "Bima & Nafia",
    description: "Every love story is beautiful, but ours is my favorite.",
    url: "https://muara-wedding-invitation.vercel.app",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://muara-wedding-invitation.vercel.app/favicon/web-app-manifest-512x512.png", // Gambar harus absolute
        width: 512,
        height: 512,
        alt: "Undangan Bima & Nafia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bima & Nafia",
    description: "Every love story is beautiful, but ours is my favorite.",
    images: ["https://muara-wedding-invitation.vercel.app/favicon/web-app-manifest-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YMTHP6RJTW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YMTHP6RJTW');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pinyonScript.variable} ${merriweather.variable} antialiased relative overflow-x-hidden`}
      >
        <div className="h-screen flex flex-col justify-center items-center text-center px-10">
          <p className="uppercase font-geistSans font-semibold mb-8">Opps! Page Not Found</p>
          <div className="relative max-h-[100px] sm:max-h-[200px] h-full w-full mb-8">
            <Image src="/images/404/404.svg" alt="404" fill />
          </div>
          <p className="uppercase font-geistSans font-semibold">We are sorry, but the page you requested was <br /> not found</p>
        </div>
      </body>
    </html>
  );
}
