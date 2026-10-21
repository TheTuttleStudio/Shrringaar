import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shringaar | AI Platform for Indian Jewellery Shops",
  description:
    "Transform normal counter photos into studio-grade jewellery catalogues. Instant live links with customer virtual try-on and AI models for Indian jewellery showrooms.",
  keywords: [
    "jewellery AI",
    "Indian jewellery catalogue",
    "virtual try-on jewellery",
    "jewellery photo cleaner",
    "gold jewellery photoshoot AI",
    "Shringaar",
  ],
  authors: [{ name: "Shringaar" }],
  alternates: {
    canonical: "https://shringaar.live",
    languages: {
      en: "https://shringaar.live",
      hi: "https://shringaar.live/hi",
      "x-default": "https://shringaar.live",
    },
  },
  openGraph: {
    title: "Shringaar | AI Platform for Indian Jewellery Shops",
    description:
      "Transform normal counter photos into studio-grade jewellery catalogues with customer virtual try-on.",
    url: "https://shringaar.live",
    siteName: "Shringaar",
    locale: "en_IN",
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

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = `${cormorant.variable} ${manrope.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1714] antialiased selection:bg-[#B8975A] selection:text-[#FAF7F2]">
        <LanguageProvider language="en">
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
