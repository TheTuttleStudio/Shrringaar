"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function EnhancementSliderSection() {
  const { t, isHindi } = useT();
  const config = siteConfig.enhancement;

  const [activePairId, setActivePairId] = useState<string>(config.pairs[0].id);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePair = config.pairs.find((p) => p.id === activePairId) || config.pairs[0];

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(Number(pct.toFixed(1)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <Section id="catalogue" variant="ivory" className="py-16 sm:py-24 overflow-hidden">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <Heading
            level={2}
            badge={t(config.tagKey)}
            align="center"
          >
            {t(config.titleKey)}
          </Heading>
        </div>
      </Reveal>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Pair Switcher Tabs */}
        <Reveal delay={0.08}>
          <div
            className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#F5EFE6] border border-[#E8E0D5] mb-6 sm:mb-8 shadow-xs"
            role="tablist"
            aria-label="Jewellery Comparison Pieces"
          >
            {config.pairs.map((pair) => {
              const isSelected = pair.id === activePairId;
              return (
                <button
                  key={pair.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePairId(pair.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A]",
                    isSelected
                      ? "bg-[#FAF7F2] text-[#1C1714] shadow-sm border border-[#E8E0D5]"
                      : "text-[#6B5E4F] hover:text-[#1C1714]"
                  )}
                >
                  {t(pair.titleKey)}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 
          Before/After Interactive Split Slider 
          Fixed 4:3 Aspect Ratio, touch-action: pan-y (prevents blocking page scroll on mobile)
        */}
        <Reveal delay={0.14} className="w-full">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full aspect-[4/3] max-w-[760px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E0D5] shadow-[0_16px_40px_rgba(28,23,20,0.06)] select-none cursor-ew-resize"
            style={{ touchAction: "pan-y" }}
          >
            {/* 1. Base Layer: BEFORE Image (Full width, bottom layer) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={activePair.before}
                alt={`${t(activePair.titleKey)} - ${t("enhancement.beforeLabel")}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 760px"
                className="object-cover"
              />
            </div>

            {/* 2. Top Layer: AFTER Image (Revealed via clip-path) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `inset(0 0 0 ${sliderPos}%)`,
              }}
            >
              <Image
                src={activePair.after}
                alt={`${t(activePair.titleKey)} - ${t("enhancement.afterLabel")}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 760px"
                className="object-cover"
              />
            </div>

            {/* 3. Slider Handle Divider Line & Grip */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B8975A]/60 via-[#FAF7F2] to-[#B8975A]/60 pointer-events-none z-20 shadow-[0_0_8px_rgba(0,0,0,0.3)]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Circular Interactive Handle Button */}
              <button
                type="button"
                role="slider"
                aria-valuenow={sliderPos}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("enhancement.sliderAria")}
                onKeyDown={handleKeyDown}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F2] border-2 border-[#B8975A] shadow-[0_4px_16px_rgba(0,0,0,0.22)] flex items-center justify-center text-[#91723A] pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A] focus-visible:ring-offset-2 transition-transform duration-100 hover:scale-105"
              >
                <span className="text-[10px] sm:text-[11px] font-bold tracking-tight select-none">
                  ◀ ▶
                </span>
              </button>
            </div>

            {/* 4. Soft Corner State Pills */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-[#1C1714]/65 backdrop-blur-xs text-[10px] sm:text-xs font-sans text-[#FAF7F2] border border-white/10 shadow-xs">
                {t("enhancement.beforeLabel")}
              </span>
            </div>

            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-[#B8975A]/90 backdrop-blur-xs text-[10px] sm:text-xs font-sans font-medium text-[#FAF7F2] border border-white/20 shadow-xs">
                {t("enhancement.afterLabel")}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Required Core Line Under Slider */}
        <Reveal delay={0.2}>
          <div className="mt-6 sm:mt-8 text-center">
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
