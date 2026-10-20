"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useT } from "@/hooks/useT";
import { Hand, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { RingPartDetail, RingPartId } from "./RingPartDetail";

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
    <div className="relative w-full h-full flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-[#E8E0D5]/60 bg-[#FAF7F2]">
      <Image
        src="/images/ring-fallback.jpg"
        alt="Shringaar Fine Jewellery Solitaire Ring"
        fill
        sizes="(max-width: 768px) 100vw, 460px"
        priority
        className="object-contain p-6 opacity-60 filter blur-[1px] transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#E8E0D5] text-[11px] font-sans text-[#8A7F77] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] animate-ping" />
        <span>Loading 3D Studio…</span>
      </div>
    </div>
  );
}

function RingStillFallback({ reason }: { reason?: string }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-[#E8E0D5] bg-[#FAF7F2]">
      <div className="relative w-full h-full min-h-[260px]">
        <Image
          src="/images/ring-fallback.jpg"
          alt="Shringaar Fine Jewellery Solitaire Ring"
          fill
          sizes="(max-width: 768px) 100vw, 460px"
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
  const { t, isHindi } = useT();

  const [activePart, setActivePart] = useState<RingPartId | null>(null);
  const [hoveredPart, setHoveredPart] = useState<RingPartId | null>(null);
  const [isLowTier, setIsLowTier] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentFps, setCurrentFps] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);

    // 1. Device tier detection: Touch device OR low CPU core count
    const searchParams = new URLSearchParams(window.location.search);
    const tierParam = searchParams.get("tier");

    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isLowConcurrency = Boolean(
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    );

    if (tierParam === "low") {
      setIsLowTier(true);
    } else if (tierParam === "high") {
      setIsLowTier(false);
    } else {
      setIsLowTier(hasTouch || isLowConcurrency);
    }

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

  // 4 Anatomical Ring Parts for inspection
  const ringParts: { id: RingPartId; labelKey: string; image: string }[] = useMemo(
    () => [
      {
        id: "head",
        labelKey: "ringInspection.parts.head.label",
        image: "/images/parts/crown.jpg",
      },
      {
        id: "basket",
        labelKey: "ringInspection.parts.basket.label",
        image: "/images/parts/basket.jpg",
      },
      {
        id: "shoulder",
        labelKey: "ringInspection.parts.shoulder.label",
        image: "/images/parts/pave.jpg",
      },
      {
        id: "shank",
        labelKey: "ringInspection.parts.shank.label",
        image: "/images/parts/shank.jpg",
      },
    ],
    []
  );

  const displayedPart = activePart || hoveredPart;

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Canvas Stage with generous ~15% padding */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] h-[280px] sm:h-[370px] lg:h-[460px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDFB] to-[#F5EFE6]/80 border border-[#E8E0D5]/70 shadow-[0_8px_30px_rgba(28,23,20,0.04)] overflow-hidden"
        onClick={() => {
          setActivePart(null);
          setHoveredPart(null);
        }}
      >
        {/* Subtle Luxury Stage Backdrop Glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-[#B8975A]/8 via-transparent to-transparent opacity-60" />

        {/* 3D Scene or Fallback */}
        {webglError || !mounted ? (
          <RingStillFallback reason="High-definition still view" />
        ) : (
          <DynamicRingScene
            metal="yellow"
            stone="diamond"
            isLowTier={isLowTier}
            reducedMotion={reducedMotion}
            lightTierMode="physical"
            activePart={activePart}
            hoveredPart={hoveredPart}
            onHoverPart={(part) => setHoveredPart(part)}
            onSelectPart={(part) => setActivePart(part)}
            onBackgroundClick={() => {
              setActivePart(null);
              setHoveredPart(null);
            }}
            onContextLost={() => setWebglError(true)}
            onFpsReport={(fps) => setCurrentFps(fps)}
          />
        )}

        {/* Floating Part Details Dialogue Card */}
        <RingPartDetail
          partId={displayedPart}
          onClose={() => {
            setActivePart(null);
            setHoveredPart(null);
          }}
        />

        {/* Interactive Palm & Drag Hint (Visible when no part dialog is open) */}
        {!displayedPart && (
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none transition-opacity duration-200">
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E8E0D5] text-[10px] sm:text-[11px] font-sans text-[#5C534D] shadow-sm">
              <Hand className="w-3.5 h-3.5 text-[#B8975A]" />
              <span>{t("ringInspection.dragHint")}</span>
            </div>
          </div>
        )}

        {/* Measured FPS Pill (Discrete debugging / verification badge) */}
        {currentFps !== null && (
          <div className="absolute top-2.5 right-2.5 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/5 text-[#6B625B] border border-black/5 pointer-events-none">
            {currentFps} FPS
          </div>
        )}
      </div>

      {/* Anatomical Ring Part Explorer (Replaces customizer swatches) */}
      <div className="mt-3.5 sm:mt-5 w-full max-w-[460px] px-1 sm:px-2 flex flex-col gap-2.5 sm:gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] sm:text-xs font-sans text-[#8A7F77] tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B8975A]" />
            <span>Interactive Craft Anatomy</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-sans text-[#8A7F77] hidden sm:inline-block">
            Hover or tap to inspect
          </span>
        </div>

        {/* 4 Part Inspection Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
          {ringParts.map((part) => {
            const isSelected = activePart === part.id || hoveredPart === part.id;
            return (
              <button
                key={part.id}
                type="button"
                data-part={part.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePart(activePart === part.id ? null : part.id);
                }}
                onPointerEnter={() => setHoveredPart(part.id)}
                onPointerLeave={() => setHoveredPart(null)}
                className={cn(
                  "group relative min-h-[44px] px-2.5 py-2 rounded-xl border flex items-center gap-2.5 transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]",
                  isSelected
                    ? "bg-[#FAF7F2] border-[#B8975A] shadow-sm ring-1 ring-[#B8975A]/40"
                    : "bg-[#FFFDFB] border-[#E8E0D5] hover:border-[#B8975A]/60 hover:bg-[#FAF7F2]"
                )}
                aria-pressed={isSelected}
              >
                {/* Micro Thumbnail */}
                <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-[#E8E0D5] flex-shrink-0">
                  <Image
                    src={part.image}
                    alt={t(part.labelKey)}
                    fill
                    sizes="28px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Part Label */}
                <div className="flex flex-col min-w-0">
                  <span
                    className={cn(
                      "text-[11px] sm:text-xs font-sans font-medium truncate transition-colors",
                      isSelected ? "text-[#91723A]" : "text-[#1C1714] group-hover:text-[#91723A]"
                    )}
                  >
                    {t(part.labelKey)}
                  </span>
                  <span className="text-[9px] font-sans text-[#8A7F77] truncate">
                    Inspect specs
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
