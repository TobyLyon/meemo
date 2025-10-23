import type { Metadata } from "next";
import { Outfit, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });
const CRTFilter = dynamic(() => import("@/components/CRTFilter"), { ssr: false });

// Modern, bold font for English
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

// Clean font for Mandarin Chinese
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "Meemo's Magic Land",
  description: "Where art meets BSC. Join the Meemo community - a unique memecoin and art project on Binance Smart Chain.",
  icons: {
    icon: "/meemo%20pfp.png",
    apple: "/meemo%20pfp.png",
    shortcut: "/meemo%20pfp.png",
  },
  openGraph: {
    title: "Meemo's Magic Land",
    description: "Where art meets BSC. Join the Meemo community - a unique memecoin and art project on Binance Smart Chain.",
    images: ["/meemos%20banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meemo's Magic Land",
    description: "Where art meets BSC. Join the Meemo community - a unique memecoin and art project on Binance Smart Chain.",
    images: ["/meemos%20banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className={`${outfit.variable} ${notoSansTC.variable}`}>
      <body>
        <NavBar />
        {children}
        <CRTFilter />
      </body>
    </html>
  );
}

