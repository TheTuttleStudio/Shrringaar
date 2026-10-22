import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Tiro_Devanagari_Hindi,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-tiro-hindi",
  display: "swap",
});

const notoHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-hindi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "शृंगार.लाइव | भारतीय आभूषण दुकानों के लिए AI प्लेटफ़ॉर्म",
  description:
    "साधारण काउंटर फोटो को स्टूडियो-ग्रेड आभूषण कैटलॉग में बदलें। लाइव लिंक, वर्चुअल ट्राय-ऑन और AI मॉडल भारतीय ज्वेलरी शोरूम के लिए।",
  keywords: [
    "jewellery AI",
    "Indian jewellery catalogue",
    "virtual try-on jewellery",
    "jewellery photo cleaner",
    "gold jewellery photoshoot AI",
    "Shrringaar.Live",
    "Shrringaar",
    "शृंगार.लाइव",
    "शृंगार",
    "आभूषण कैटलॉग",
  ],
  authors: [{ name: "Shrringaar.Live" }],
  alternates: {
    canonical: "https://shrringaar.live/hi",
    languages: {
      en: "https://shrringaar.live",
      hi: "https://shrringaar.live/hi",
      "x-default": "https://shrringaar.live",
    },
  },
  openGraph: {
    title: "शृंगार.लाइव | भारतीय आभूषण दुकानों के लिए AI प्लेटफ़ॉर्म",
    description:
      "साधारण काउंटर फोटो को स्टूडियो-ग्रेड आभूषण कैटलॉग में बदलें। लाइव लिंक, वर्चुअल ट्राय-ऑन और AI मॉडल।",
    url: "https://shrringaar.live/hi",
    siteName: "Shrringaar.Live",
    locale: "hi_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function HindiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = `${cormorant.variable} ${tiroHindi.variable} ${notoHindi.variable}`;

  return (
    <html lang="hi" className={fontVariables}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1714] antialiased selection:bg-[#B8975A] selection:text-[#FAF7F2]">
        <LanguageProvider language="hi">
          <SmoothScrollProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
