"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { PhoneFrame } from "./PhoneFrame";
import { Beat1CounterStand } from "./beats/Beat1CounterStand";
import { Beat2PhoneScan } from "./beats/Beat2PhoneScan";
import { Beat3PhotoDrop } from "./beats/Beat3PhotoDrop";
import { Beat4Result } from "./beats/Beat4Result";
import { TryOnReducedMotion } from "./TryOnReducedMotion";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
}

export function TryOnStorySection() {
  const { t, isHindi } = useT();
  const config = siteConfig.tryOn;

  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  // Beat screens refs for GSAP timeline
  const screen1Ref = useRef<HTMLDivElement>(null);
  const screen2Ref = useRef<HTMLDivElement>(null);
  const screen3Ref = useRef<HTMLDivElement>(null);
  const screen4Ref = useRef<HTMLDivElement>(null);

  // Connect Lenis to ScrollTrigger
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (!containerRef.current || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Create master scrubbed timeline
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? "+=220%" : "+=300%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinWrapperRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculates start/end on resize & rotation
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) {
              setActiveBeat(0);
            } else if (p < 0.52) {
              setActiveBeat(1);
            } else if (p < 0.78) {
              setActiveBeat(2);
            } else {
              setActiveBeat(3);
            }
          },
        },
      });

      // Initial States: only transform and opacity
      gsap.set(screen1Ref.current, { opacity: 1, scale: 1 });
      gsap.set(screen2Ref.current, { opacity: 0, scale: 0.96 });
      gsap.set(screen3Ref.current, { opacity: 0, scale: 0.96 });
      gsap.set(screen4Ref.current, { opacity: 0, scale: 0.96 });

      // Sequence: Beat 1 -> Beat 2
      tl.to(screen1Ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "power2.inOut",
      })
        .to(
          screen2Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<0.2"
        )
        // Hold Beat 2 briefly
        .to({}, { duration: 0.5 })

        // Sequence: Beat 2 -> Beat 3
        .to(screen2Ref.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(
          screen3Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<0.2"
        )
        // Hold Beat 3
        .to({}, { duration: 0.5 })

        // Sequence: Beat 3 -> Beat 4
        .to(screen3Ref.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .to(
          screen4Ref.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<0.2"
        )
        // Requirement 4: Short hold at the end so last frame stays on screen before unpinning
        .to({}, { duration: 0.9 });
    }, containerRef);

    // Refresh ScrollTrigger after DOM & assets paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <TryOnReducedMotion />;
  }

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <div
      ref={containerRef}
      id="try-on"
      className="relative w-full bg-[#1C1714] text-[#FAF7F2]"
    >
      {/* 
        Sticky / Pinned 100svh Viewport Container
        Uses svh units exclusively so the mobile address bar never causes jumps
      */}
      <div
        ref={pinWrapperRef}
        className="w-full h-[100svh] min-h-[520px] flex items-center justify-center overflow-hidden px-3 sm:px-6 pt-16 sm:pt-20 lg:pt-0 relative"
      >
        {/* Subtle Dark Gold Ambient Glows */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#B8975A]/8 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#B8975A]/8 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Inner Content Grid */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-1.5 sm:gap-4 lg:gap-12 items-center justify-center h-full py-1 sm:py-6">
          {/* Mobile Top Header: Compact tag & title strictly below the sticky navbar */}
          <div className="lg:hidden w-full flex flex-col items-center text-center z-20 flex-shrink-0 mb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8975A]/15 border border-[#B8975A]/30 text-[#D4BD8B] text-[10px] font-sans tracking-wide">
              <Sparkles className="w-3 h-3 text-[#B8975A]" />
              <span>{t(config.tagKey)}</span>
            </div>
            <h2
              className={`text-sm sm:text-base font-light text-[#FAF7F2] leading-tight mt-1 ${serifFont}`}
            >
              {t(config.titleKey)}
            </h2>
          </div>

          {/* 
            Desktop Left Column:
            Title, Badge, and on Desktop: Captions + Step Indicator
          */}
          <div className="hidden lg:flex w-full lg:col-span-6 flex-col items-start text-left z-20 flex-shrink-0">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8975A]/15 border border-[#B8975A]/30 text-[#D4BD8B] text-xs font-sans tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
              <span>{t(config.tagKey)}</span>
            </div>

            {/* Section Title */}
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-light text-[#FAF7F2] leading-tight mb-4 ${serifFont}`}
            >
              {t(config.titleKey)}
            </h2>

            {/* Desktop Only: Step Indicator + Dynamic Captions Beside Phone */}
            <div className="flex flex-col gap-5 mt-4 max-w-md">
              {/* 4 Step Indicator Pills */}
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Try-On Step Progress"
              >
                {config.beats.map((beat, idx) => {
                  const isActive = idx === activeBeat;
                  return (
                    <div
                      key={beat.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-10 bg-[#B8975A]"
                          : idx < activeBeat
                          ? "w-6 bg-[#B8975A]/50"
                          : "w-6 bg-[#3D3530]"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Active Step Caption Box */}
              <div className="min-h-[88px] flex flex-col justify-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B8975A] font-semibold mb-1">
                  0{activeBeat + 1} • {t(config.beats[activeBeat].labelKey)}
                </span>
                <p className="text-base sm:text-lg font-sans font-light text-[#EAE3D9] leading-relaxed transition-opacity duration-300">
                  {t(config.beats[activeBeat].captionKey)}
                </p>
              </div>

              {/* Ending Callout Line (Beat 4) */}
              <div
                className={`pt-2 transition-opacity duration-300 ${
                  activeBeat === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className={`text-xl text-[#B8975A] font-light ${serifFont}`}>
                  {t(config.closingLineKey)}
                </p>
              </div>
            </div>
          </div>

          {/* 
            Phone Center Display:
            Houses the 4 Beat screens with GPU-accelerated opacity/transform crossfading
          */}
          <div className="w-full lg:col-span-6 flex justify-center items-center z-10 my-auto">
            <PhoneFrame url={config.sampleUrl}>
              {/* Screen 1: Counter Stand with QR */}
              <div
                ref={screen1Ref}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
              >
                <Beat1CounterStand />
              </div>

              {/* Screen 2: Phone Camera Scanning */}
              <div
                ref={screen2Ref}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
              >
                <Beat2PhoneScan />
              </div>

              {/* Screen 3: Customer Photo Drop & Earring Picker */}
              <div
                ref={screen3Ref}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
              >
                <Beat3PhotoDrop />
              </div>

              {/* Screen 4: Result with Earring & Sparkles */}
              <div
                ref={screen4Ref}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
              >
                <Beat4Result />
              </div>
            </PhoneFrame>
          </div>

          {/* 
            Mobile Only: Caption and Step Dots BELOW the phone (Requirement 5)
            Ensures 0 overlap on 360px phones
          */}
          <div className="lg:hidden w-full flex flex-col items-center text-center mt-2 z-20 flex-shrink-0">
            {/* 4 Step Dots */}
            <div className="flex items-center gap-1.5 mb-1.5">
              {config.beats.map((beat, idx) => {
                const isActive = idx === activeBeat;
                return (
                  <div
                    key={beat.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-6 bg-[#B8975A]" : "w-2 bg-[#3D3530]"
                    }`}
                  />
                );
              })}
            </div>

            {/* Mobile Caption Text */}
            <p className="text-xs sm:text-[13px] font-sans font-light text-[#EAE3D9] max-w-[280px] line-clamp-2 leading-snug">
              {t(config.beats[activeBeat].captionKey)}
            </p>

            {/* Ending line on beat 4 on mobile */}
            {activeBeat === 3 && (
              <p className={`text-xs text-[#B8975A] font-normal mt-1 ${serifFont}`}>
                {t(config.closingLineKey)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
