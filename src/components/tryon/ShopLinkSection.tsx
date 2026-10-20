"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { Lock, Globe, ExternalLink } from "lucide-react";

export function ShopLinkSection() {
  const { t, isHindi } = useT();
  const config = siteConfig.shopLink;

  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  const fullUrl = config.sampleUrl; // "yourshop.shringaar.live"

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setDisplayedText(fullUrl);
      setTypingComplete(true);
      return;
    }

    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setDisplayedText(fullUrl);
        setTypingComplete(true);
      }
    };
    mq.addEventListener("change", listener);

    // Play typewriter ONCE ONLY when section comes into view
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          observer.disconnect();

          let currentIndex = 0;
          const interval = setInterval(() => {
            if (currentIndex <= fullUrl.length) {
              setDisplayedText(fullUrl.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(interval);
              setTypingComplete(true);
            }
          }, 45); // Smooth 45ms cadence per character
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      mq.removeEventListener("change", listener);
      observer.disconnect();
    };
  }, [fullUrl]);

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <Section
      id="shop-link"
      variant="ivory"
      className="py-16 sm:py-24 overflow-hidden border-t border-[#E8E0D5]"
    >
      <div ref={sectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Section Heading */}
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <Heading
              level={2}
              badge={t(config.tagKey)}
              align="center"
            >
              {t(config.titleKey)}
            </Heading>
          </div>
        </Reveal>

        {/* 
          1. Interactive Browser Address Bar with Typewriter
          Requirement 7: Plays once, aria-label with full link, blinking cursor stops under reduced motion
        */}
        <Reveal delay={0.08} className="w-full max-w-xl mx-auto mb-10 sm:mb-12">
          <div
            className="w-full p-2.5 sm:p-3 rounded-2xl bg-[#FFFDFB] border border-[#E8E0D5] shadow-[0_8px_24px_rgba(28,23,20,0.04)] flex items-center gap-2.5"
            role="region"
            aria-label={t("shopLink.urlAria")}
          >
            {/* Browser Controls / Protocol */}
            <div className="flex items-center gap-1.5 pl-1 text-[#8A7F77]">
              <Globe className="w-4 h-4 text-[#B8975A]" />
              <span className="text-xs font-sans text-[#8A7F77] hidden sm:inline">
                https://
              </span>
              <Lock className="w-3.5 h-3.5 text-[#91723A]" />
            </div>

            {/* Typewriter Input URL Pill */}
            <div className="flex-1 bg-[#FAF7F2] border border-[#E8E0D5] rounded-xl px-3 py-1.5 flex items-center min-w-0">
              <span className="text-sm sm:text-base font-sans font-medium text-[#1C1714] truncate">
                {displayedText}
              </span>
              {/* Blinking Cursor (stops under reduced motion or once complete) */}
              {!typingComplete && (
                <span
                  className={`inline-block w-2 h-4 bg-[#B8975A] ml-0.5 align-middle ${
                    reducedMotion ? "opacity-100" : "animate-pulse"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Live Link Indicator */}
            <div className="pr-1 flex items-center gap-1 text-[11px] font-sans text-[#91723A] font-medium flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#14A05C] animate-pulse" />
              <span className="hidden sm:inline">Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </Reveal>

        {/* 
          2. Fixed Square Catalogue Grid (Part B)
          Requirement 3: 2 columns on mobile, 3 on desktop. Fixed square tiles on ivory so different ratios sit evenly.
        */}
        <div
          className={`w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 transition-opacity duration-500 ${
            typingComplete || reducedMotion ? "opacity-100" : "opacity-0"
          }`}
        >
          {config.items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl bg-[#FFFDFB] border border-[#E8E0D5] hover:border-[#B8975A]/60 shadow-[0_4px_16px_rgba(28,23,20,0.03)] hover:shadow-[0_8px_24px_rgba(28,23,20,0.06)] p-3 sm:p-4 flex flex-col justify-between transition-all duration-300"
            >
              {/* Top subtle live tag */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-sans font-medium text-[#8A7F77] tracking-wider uppercase">
                  Catalogue
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]/60 group-hover:bg-[#B8975A]" />
              </div>

              {/* Fixed Square Image Vessel (Different aspect ratios sit evenly inside) */}
              <div className="relative w-full h-[68%] flex items-center justify-center my-auto">
                <Image
                  src={item.image}
                  alt={t(item.titleKey)}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Item Title */}
              <div className="w-full text-center pt-1 border-t border-[#F0EAE1]">
                <p className="text-xs sm:text-sm font-sans font-medium text-[#1C1714] truncate">
                  {t(item.titleKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 
          3. Section Core Line
          EN: "Your own link. Show it to any customer, anywhere."
        */}
        <Reveal delay={0.2} className="w-full">
          <div className="mt-10 sm:mt-14 text-center">
            <p
              className={`text-lg sm:text-xl md:text-2xl font-light text-[#1C1714] tracking-tight ${serifFont}`}
            >
              {t(config.lineKey)}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
