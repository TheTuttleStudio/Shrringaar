"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Sparkles, Check } from "lucide-react";

export function ModelsSection() {
  const { t, isHindi } = useT();
  const config = siteConfig.models;

  const [selectedId, setSelectedId] = useState<string>(config.list[0].id);
  const [reducedMotion, setReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Selected model data
  const selectedModel = config.list.find((m) => m.id === selectedId) || config.list[0];

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);

    // 2. Quietly load remaining worn images when section is close to screen (IntersectionObserver)
    const el = sectionRef.current;
    if (el) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            config.list.forEach((m) => {
              const img = new window.Image();
              img.src = m.worn;
            });
            observer.disconnect();
          }
        },
        { rootMargin: "300px 0px" }
      );
      observer.observe(el);
      return () => {
        mq.removeEventListener("change", listener);
        observer.disconnect();
      };
    }

    return () => mq.removeEventListener("change", listener);
  }, [config.list]);

  // Keyboard navigation for tablist (Arrow keys move focus, Enter/Space selects)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const count = config.list.length;
    let nextIndex = index;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % count;
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + count) % count;
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedId(config.list[index].id);
    }
  };

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <Section id="models" variant="subtle" className="py-16 sm:py-24 overflow-hidden">
      <div ref={sectionRef}>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <Heading
              level={2}
              badge={t(config.tagKey)}
              subtitle={t(config.lineKey)}
              align="center"
            >
              {t(config.titleKey)}
            </Heading>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* 
            1. Big Showcase Image
            Fixed 4:3 Aspect Ratio, soft crossfade on model change
          */}
          <Reveal delay={0.08} className="w-full">
            <div className="relative w-full aspect-[4/3] max-w-[760px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E0D5] bg-[#FAF7F2] shadow-[0_16px_40px_rgba(28,23,20,0.06)] mb-6 sm:mb-8">
              {config.list.map((model) => {
                const isActive = model.id === selectedId;
                return (
                  <div
                    key={model.id}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: reducedMotion ? "none" : "opacity 0.32s ease-in-out",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={model.worn}
                      alt={`${t(model.nameKey)} wearing fine jewellery`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 760px"
                      className="object-cover"
                    />
                  </div>
                );
              })}

              {/* Discreet model name pill on showcase */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1714]/75 backdrop-blur-xs text-[11px] sm:text-xs font-sans text-[#FAF7F2] border border-white/10 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#B8975A]" />
                  <span>
                    {t(selectedModel.nameKey)} • {t(selectedModel.styleKey)}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 
            2. Row of 3 Model Cards
            Desktop: 3 columns in a row
            Mobile: swipeable row with CSS scroll-snap
            Accessible as an accessible tab list with arrow key navigation
          */}
          <Reveal delay={0.16} className="w-full">
            <div
              role="tablist"
              aria-label="AI Jewellery Models"
              className="w-full max-w-[760px] flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
            >
              {config.list.map((model, idx) => {
                const isSelected = model.id === selectedId;
                return (
                  <button
                    key={model.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`model-tab-${model.id}`}
                    aria-selected={isSelected}
                    aria-controls={`model-panel-${model.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedId(model.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={cn(
                      "flex-shrink-0 w-[240px] sm:w-auto snap-start p-3 sm:p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A] focus-visible:ring-offset-2",
                      isSelected
                        ? "bg-[#FAF7F2] border-[#B8975A] shadow-md ring-1 ring-[#B8975A]/30"
                        : "bg-[#FFFDFB] border-[#E8E0D5] hover:border-[#B8975A]/50 hover:bg-[#FAF7F2]/60"
                    )}
                  >
                    {/* 1:1 Square Portrait Thumbnail */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-xl overflow-hidden border border-[#E8E0D5] flex-shrink-0 bg-[#F5EFE6]">
                      <Image
                        src={model.portrait}
                        alt={t(model.nameKey)}
                        fill
                        loading="lazy"
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Model Details */}
                    <div className="flex flex-col min-w-0 flex-1">
                      {/* Required "AI model" badge */}
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[9px] uppercase tracking-wider font-sans font-semibold text-[#91723A] px-1.5 py-0.5 rounded bg-[#B8975A]/10 border border-[#B8975A]/20">
                          {t("models.aiModelBadge")}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#B8975A] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      {/* Model Name */}
                      <span
                        className={`text-base sm:text-lg font-normal text-[#1C1714] truncate leading-tight ${serifFont}`}
                      >
                        {t(model.nameKey)}
                      </span>

                      {/* Style Tag */}
                      <span className="text-[11px] font-sans text-[#8A7F77] truncate">
                        {t(model.styleKey)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
