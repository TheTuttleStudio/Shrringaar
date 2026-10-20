"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";

export function Beat1CounterStand() {
  const { isHindi } = useT();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-[#F7F2EA] via-[#FAF7F2] to-[#ECE3D5] overflow-hidden">
      {/* Soft background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#B8975A]/10 blur-2xl pointer-events-none" />

      {/* Header prompt inside screen */}
      <div className="relative text-center pt-2 z-10">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#B8975A]/15 border border-[#B8975A]/30 text-[9px] font-sans font-semibold text-[#91723A] uppercase tracking-wider mb-1">
          {isHindi ? "काउंटर डिस्प्ले" : "Shop Counter Stand"}
        </span>
        <h4 className="text-xs sm:text-sm font-sans font-medium text-[#1C1714]">
          {isHindi ? "कैमरे से स्कैन करें" : "Scan to browse & try on"}
        </h4>
      </div>

      {/* Counter Stand Presentation */}
      <div className="relative flex flex-col items-center my-auto z-10">
        {/* Acrylic / Wood Standing Plaque */}
        <div className="relative w-36 sm:w-40 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#B8975A]/40 shadow-[0_12px_28px_rgba(28,23,20,0.12)] flex flex-col items-center">
          {/* Top Brand Tag */}
          <div className="flex items-center gap-1 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
            <span className="text-[9px] font-serif font-normal text-[#1C1714] tracking-wide">
              Shringaar
            </span>
          </div>

          {/* QR Code Graphic */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-[#E8E0D5] bg-white p-1">
            <Image
              src={siteConfig.tryOn.qrImage}
              alt="Counter QR Code"
              fill
              className="object-contain"
            />
          </div>

          {/* Stand Label */}
          <span className="text-[8px] font-sans text-[#8A7F77] mt-1.5 text-center leading-tight">
            {siteConfig.tryOn.sampleUrl}
          </span>
        </div>

        {/* Acrylic Stand Base / Feet */}
        <div className="w-44 sm:w-48 h-2 rounded-full bg-gradient-to-r from-transparent via-[#D4BD8B] to-transparent mt-[-2px] opacity-80" />
        <div className="w-32 h-1 bg-[#1C1714]/15 rounded-full blur-[2px] mt-0.5" />
      </div>

      {/* Countertop Table Surface (Calm minimal wood / marble edge) */}
      <div className="w-full relative z-10 pt-2">
        <div className="w-full h-1 bg-gradient-to-r from-[#B8975A]/20 via-[#B8975A]/60 to-[#B8975A]/20" />
        <div className="w-full py-1.5 bg-[#E8DECF] border-t border-[#D9CEBD] text-center">
          <span className="text-[9px] font-sans font-light text-[#6B5E4F] tracking-wide">
            {isHindi ? "ज्वैलरी शोरूम काउंटर" : "Jewellery Counter • Glass Top"}
          </span>
        </div>
      </div>
    </div>
  );
}
