"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useT } from "@/hooks/useT";
import { MetalType, StoneType } from "./RingModel";
import { Sparkles, MoveHorizontal, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Lazy-load the Three.js canvas on client only
const DynamicRingScene = dynamic(
  () => import("./RingScene").then((mod) => mod.RingScene),
  {
    ssr: false,
    loading: () => <RingLoadingPlaceholder />,
  }
);

function RingLoadingPlaceholder() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-radial from-[#FFFDFB] to-[#F5EFE6]/60 rounded-3xl overflow-hidden border border-[#E8E0D5]/50 animate-pulse">
      <div className="w-40 h-40 rounded-full bg-[#B8975A]/10 blur-2xl" />
      <span className="text-xs font-sans text-[#8A7F77] tracking-wider uppercase">
        Loading 3D Studio…
      </span>
    </div>
  );
}

function RingStillFallback({ reason }: { reason?: string }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-[#E8E0D5] bg-[#FAF7F2]">
      <div className="relative w-full h-full min-h-[300px]">
        <Image
          src="/images/ring-fallback.jpg"
          alt="Shringaar Fine Jewellery Solitaire Ring"
          fill
          priority
          className="object-contain p-6"
        />
      </div>
      {reason && (
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-center gap-1.5 text-[11px] font-sans text-[#8A7F77] bg-[#FAF7F2]/90 backdrop-blur-sm py-1 px-3 rounded-full border border-[#E8E0D5]">
          <AlertCircle className="w-3 h-3 text-[#B8975A]" />
          <span>{reason}</span>
        </div>
      )}
    </div>
  );
}

export function HeroJewelleryStage() {
  const { t } = useT();

  const [metal, setMetal] = useState<MetalType>("yellow");
  const [stone, setStone] = useState<StoneType>("diamond");
  const [isLowTier, setIsLowTier] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Device tier detection: Touch device OR low CPU core count
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isLowConcurrency = Boolean(
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    );
    setIsLowTier(hasTouch || isLowConcurrency);

    // 2. Prefers reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionListener);

    // 3. WebGL support check
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) {
        setWebglError(true);
      }
    } catch {
      setWebglError(true);
    }

    return () => motionQuery.removeEventListener("change", motionListener);
  }, []);

  // Metals config (3 options - strictly no karat claims)
  const metals: { id: MetalType; labelKey: string; color: string; border: string }[] = useMemo(
    () => [
      {
        id: "yellow",
        labelKey: "swatches.metals.yellowGold",
        color: "bg-[#E0B758]",
        border: "border-[#C59B3F]",
      },
      {
        id: "rose",
        labelKey: "swatches.metals.roseGold",
        color: "bg-[#DE9F8E]",
        border: "border-[#C5806D]",
      },
      {
        id: "white",
        labelKey: "swatches.metals.whiteGold",
        color: "bg-[#E4EAEC]",
        border: "border-[#B8C6CC]",
      },
    ],
    []
  );

  // Stones config (4 options)
  const stones: { id: StoneType; labelKey: string; color: string; ringColor: string }[] = useMemo(
    () => [
      {
        id: "diamond",
        labelKey: "swatches.stones.diamond",
        color: "bg-gradient-to-tr from-white via-[#F0F5FA] to-[#E6F0F8]",
        ringColor: "ring-[#B8975A]",
      },
      {
        id: "emerald",
        labelKey: "swatches.stones.emerald",
        color: "bg-[#116942]",
        ringColor: "ring-[#116942]",
      },
      {
        id: "ruby",
        labelKey: "swatches.stones.ruby",
        color: "bg-[#9E1439]",
        ringColor: "ring-[#9E1439]",
      },
      {
        id: "sapphire",
        labelKey: "swatches.stones.sapphire",
        color: "bg-[#163778]",
        ringColor: "ring-[#163778]",
      },
    ],
    []
  );

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Canvas Stage */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] h-[240px] sm:h-[340px] lg:h-[440px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDFB] to-[#F5EFE6]/80 border border-[#E8E0D5]/70 shadow-[0_8px_30px_rgba(28,23,20,0.04)] overflow-hidden">
        {/* Subtle Luxury Stage Backdrop Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-[#B8975A]/8 via-transparent to-transparent opacity-70" />

        {/* 3D Scene or Fallback */}
        {webglError || !mounted ? (
          <RingStillFallback reason="High-definition still view" />
        ) : (
          <DynamicRingScene
            metal={metal}
            stone={stone}
            isLowTier={isLowTier}
            reducedMotion={reducedMotion}
            onContextLost={() => setWebglError(true)}
          />
        )}

        {/* Interactive Drag Hint */}
        <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#E8E0D5] text-[10px] sm:text-[11px] font-sans text-[#6B625B] shadow-sm">
            <MoveHorizontal className="w-3 h-3 text-[#B8975A]" />
            <span>{t("swatches.dragHint")}</span>
          </div>
        </div>
      </div>

      {/* Swatches Customizer Area */}
      <div className="mt-3 sm:mt-5 w-full max-w-[420px] px-1 sm:px-2 flex flex-col gap-2 sm:gap-3.5">
        {/* Metal Swatches */}
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-5">
          <span className="text-[11px] sm:text-xs font-sans text-[#8A7F77] tracking-wider uppercase min-w-[45px]">
            {t("swatches.metals.title")}
          </span>
          <div className="flex items-center gap-2 sm:gap-3" role="radiogroup" aria-label="Select Metal">
            {metals.map((m) => {
              const active = metal === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMetal(m.id)}
                  className={cn(
                    "group relative min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]",
                    active ? "scale-105" : "hover:scale-102 opacity-80 hover:opacity-100"
                  )}
                  aria-label={t(m.labelKey)}
                  aria-checked={active}
                  role="radio"
                >
                  {/* Outer active halo */}
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border-2 transition-all duration-200",
                      active ? "border-[#1C1714] scale-100" : "border-transparent"
                    )}
                  />
                  {/* Inner color swatch */}
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full shadow-inner border",
                      m.color,
                      m.border
                    )}
                  />
                  {/* Tooltip on hover */}
                  <span className="absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded bg-[#1C1714] text-[#FAF7F2] text-[10px] font-sans opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20">
                    {t(m.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stone Swatches (4 stones) */}
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 pt-1 border-t border-[#E8E0D5]/50">
          <span className="text-xs font-sans text-[#8A7F77] tracking-wider uppercase min-w-[50px]">
            {t("swatches.stones.title")}
          </span>
          <div className="flex items-center gap-3" role="radiogroup" aria-label="Select Gemstone">
            {stones.map((s) => {
              const active = stone === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStone(s.id)}
                  className={cn(
                    "group relative min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]",
                    active ? "scale-105" : "hover:scale-102 opacity-80 hover:opacity-100"
                  )}
                  aria-label={t(s.labelKey)}
                  aria-checked={active}
                  role="radio"
                >
                  {/* Outer active halo */}
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full border-2 transition-all duration-200",
                      active ? "border-[#1C1714] scale-100" : "border-transparent"
                    )}
                  />
                  {/* Inner gemstone swatch with facet shimmer */}
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full shadow-sm border border-black/10 relative overflow-hidden",
                      s.color
                    )}
                  >
                    <span className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />
                  </span>
                  {/* Tooltip on hover */}
                  <span className="absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded bg-[#1C1714] text-[#FAF7F2] text-[10px] font-sans opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20">
                    {t(s.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
