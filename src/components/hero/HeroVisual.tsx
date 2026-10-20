"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";

export function HeroVisual() {
  const { t } = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const heroConfig = siteConfig.hero;
  const altText = t(heroConfig.image.altKey) || heroConfig.image.fallbackAlt;

  useEffect(() => {
    // Detect touch device
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);

    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);

    return () => motionQuery.removeEventListener("change", motionListener);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion || !heroConfig.motion.enableCursorTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Maximum 2.5 degrees tilt
    setTilt({
      rotateX: Number((-y * 5).toFixed(2)),
      rotateY: Number((x * 5).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const shouldFloat = heroConfig.motion.enableFloat && !reducedMotion;
  const shouldSparkle = heroConfig.motion.enableSparkles && !reducedMotion;

  return (
    <div className="relative w-full flex justify-center items-center">
      {/* 
        Keyframe animations for float and sparkles (Scoped & 100% compositor-driven).
        Automatically disabled under prefers-reduced-motion.
      */}
      <style jsx>{`
        @keyframes heroRingFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes sparkleGlint {
          0%, 100% {
            opacity: 0;
            transform: scale(0.4) rotate(0deg);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15) rotate(45deg);
          }
        }

        .animate-hero-float {
          animation: ${shouldFloat ? "heroRingFloat 6.5s ease-in-out infinite" : "none"};
        }

        .sparkle-dot {
          animation: sparkleGlint 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-float,
          .sparkle-dot {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* 
        Outer Stage: Fixed 1:1 Aspect Ratio container
        Prevents any Cumulative Layout Shift (CLS) during page loading.
      */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDFB] to-[#F5EFE6]/80 border border-[#E8E0D5]/70 shadow-[0_8px_30px_rgba(28,23,20,0.04)] overflow-hidden p-3 sm:p-5 flex items-center justify-center select-none"
        style={{
          perspective: 900,
        }}
      >
        {/* Subtle Ambient Radial Luxury Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-[#B8975A]/10 via-transparent to-transparent opacity-70" />

        {/* 
          Inner Tilt & Float Wrapper
          Applies the subtle cursor tilt and slow vertical float.
        */}
        <div
          className="relative w-full h-full flex items-center justify-center animate-hero-float"
          style={{
            transform: reducedMotion
              ? "none"
              : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: "transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Desktop Image (Retina 1200x1200 WebP) */}
          <div className="hidden sm:block relative w-full h-full">
            <Image
              src={heroConfig.image.desktop}
              alt={altText}
              fill
              priority
              sizes="(max-width: 1024px) 420px, 460px"
              className="object-contain"
            />
          </div>

          {/* Mobile Image (Optimized 640x640 WebP) */}
          <div className="block sm:hidden relative w-full h-full">
            <Image
              src={heroConfig.image.mobile}
              alt={altText}
              fill
              priority
              sizes="(max-width: 640px) 340px"
              className="object-contain"
            />
          </div>

          {/* Subtle CSS Sparkles (Layered on top of image) */}
          {shouldSparkle && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Sparkle 1: Solitaire Diamond Crown Top */}
              <div
                className="sparkle-dot absolute top-[14%] left-[49%] text-[#B8975A] text-sm filter drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]"
                style={{ animationDelay: "0s" }}
              >
                ✦
              </div>

              {/* Sparkle 2: Right Shoulder Pavé */}
              <div
                className="sparkle-dot absolute top-[28%] left-[71%] text-[#D4AF37] text-xs filter drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"
                style={{ animationDelay: "1.8s" }}
              >
                ✦
              </div>

              {/* Sparkle 3: Left Shoulder Highlight */}
              <div
                className="sparkle-dot absolute top-[29%] left-[27%] text-[#E6C687] text-[10px] filter drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"
                style={{ animationDelay: "3.2s" }}
              >
                ✦
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
