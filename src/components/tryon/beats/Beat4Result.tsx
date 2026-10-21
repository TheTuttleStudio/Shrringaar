"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { Sparkles, Share2 } from "lucide-react";

export function Beat4Result() {
  const { t, isHindi } = useT();
  const config = siteConfig.tryOn;

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 bg-[#FAF7F2] overflow-hidden">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between pb-1.5 border-b border-[#E8E0D5]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
          <span className="text-[11px] font-sans font-semibold text-[#1C1714]">
            {t("tryOn.ui.liveTryOn")}
          </span>
        </div>
        <button
          type="button"
          className="p-1 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#6B5E4F]"
          aria-label="Share try-on result"
        >
          <Share2 className="w-3 h-3 text-[#91723A]" />
        </button>
      </div>

      {/* Main View: Result Photo with Earring Worn (4:5 Ratio) */}
      <div className="relative flex-1 w-full my-2 rounded-2xl overflow-hidden border border-[#B8975A]/40 bg-[#F5EFE6] shadow-[0_8px_24px_rgba(184,151,90,0.15)]">
        <Image
          src={config.resultImage}
          alt={t("tryOn.ui.altTryOnResult")}
          fill
          className="object-cover"
        />

        {/* Floating Worn Earring Pill */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-center">
          <div className="px-3 py-1 rounded-full bg-[#1C1714]/85 backdrop-blur-xs text-[10px] font-sans text-[#FAF7F2] border border-white/10 shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#B8975A]" />
            <span>{t("tryOn.ui.wornPill")}</span>
          </div>
        </div>
      </div>


      {/* Finishing Frame Callout: "Try it on, right from your phone." */}
      <div className="w-full py-2 px-2.5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] border border-[#B8975A]/50 text-center shadow-xs">
        <p className={`text-xs sm:text-[13px] font-medium text-[#1C1714] leading-snug ${serifFont}`}>
          {t(config.closingLineKey)}
        </p>
      </div>
    </div>
  );
}
