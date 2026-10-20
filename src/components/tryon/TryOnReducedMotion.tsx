"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { PhoneFrame } from "./PhoneFrame";
import { Beat1CounterStand } from "./beats/Beat1CounterStand";
import { Beat2PhoneScan } from "./beats/Beat2PhoneScan";
import { Beat3PhotoDrop } from "./beats/Beat3PhotoDrop";
import { Beat4Result } from "./beats/Beat4Result";
import { Sparkles } from "lucide-react";

export function TryOnReducedMotion() {
  const { t, isHindi } = useT();
  const config = siteConfig.tryOn;

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  const beatComponents = [
    <Beat1CounterStand key="beat-1" />,
    <Beat2PhoneScan key="beat-2" />,
    <Beat3PhotoDrop key="beat-3" />,
    <Beat4Result key="beat-4" />,
  ];

  return (
    <section id="try-on" className="w-full bg-[#1C1714] text-[#FAF7F2] py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8975A]/15 border border-[#B8975A]/30 text-[#D4BD8B] text-xs font-sans tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
            <span>{t(config.tagKey)}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light text-[#FAF7F2] leading-tight mb-3 ${serifFont}`}>
            {t(config.titleKey)}
          </h2>
          <p className="text-sm sm:text-base font-sans font-light text-[#C4B7AA]">
            {t(config.closingLineKey)}
          </p>
        </div>

        {/* 4 Still Cards Stacked Vertically */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {config.beats.map((beat, idx) => (
            <div
              key={beat.id}
              className="flex flex-col items-center bg-[#251F1C] border border-[#3D3530] rounded-3xl p-6 shadow-md"
            >
              {/* Step Badge & Caption (Manrope font-sans) */}
              <div className="text-center mb-6 w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-[#B8975A]/20 border border-[#B8975A]/40 text-xs font-sans font-medium text-[#E5D4B3] mb-2">
                  0{idx + 1} • {t(beat.labelKey)}
                </span>
                <p className="text-sm font-sans font-light text-[#EAE3D9] max-w-sm mx-auto leading-relaxed">
                  {t(beat.captionKey)}
                </p>
              </div>

              {/* Card Visual: Beat 1 is standalone Counter Stand; Beats 2-4 use PhoneFrame */}
              {idx === 0 ? (
                <div className="w-full max-w-[310px] h-[520px] flex items-center justify-center rounded-[32px] bg-[#1C1714] border border-[#3D3530] p-4">
                  <Beat1CounterStand />
                </div>
              ) : (
                <PhoneFrame url={config.sampleUrl}>
                  {beatComponents[idx]}
                </PhoneFrame>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
