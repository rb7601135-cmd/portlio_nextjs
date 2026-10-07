import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `${siteConfig.logo} — ${siteConfig.name} | Full-Stack & Creative 3D Developer`,
  description: siteConfig.supportingText,
  keywords: [
    "Rana Muhammad Bilal Afzal",
    "Bilal Dev",
    "Full-Stack Engineer",
    "Creative Development",
    "Three.js",
    "React Three Fiber",
    "GSAP Animation",
    "Next.js App Router",
    "Software Engineering Lahore",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: `${siteConfig.logo} — ${siteConfig.name}`,
    description: siteConfig.supportingText,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.logo,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.logo} — ${siteConfig.name}`,
    description: siteConfig.supportingText,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#070709] text-[#f5f5f0] font-sans antialiased selection:bg-[#ccff00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
