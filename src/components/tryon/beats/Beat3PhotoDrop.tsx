"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { Camera, Check } from "lucide-react";

export function Beat3PhotoDrop() {
  const { t, isHindi } = useT();
  const config = siteConfig.tryOn;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 bg-[#FAF7F2] overflow-hidden">
      {/* Top Bar with "Add your photo" button */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-[#E8E0D5]">
        <div className="flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[#91723A]" />
          <span className="text-[11px] font-sans font-medium text-[#1C1714]">
            {t("tryOn.ui.customerSelfie")}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-[#B8975A]/15 border border-[#B8975A]/30 text-[9px] font-sans font-semibold text-[#91723A] flex items-center gap-1">
          <Check className="w-2.5 h-2.5 stroke-[3]" />
          <span>{t("tryOn.ui.photoAdded")}</span>
        </div>
      </div>

      {/* Main View: Customer Photo Dropped In (4:5 Ratio) */}
      <div className="relative flex-1 w-full my-2 rounded-2xl overflow-hidden border border-[#E8E0D5] bg-[#F5EFE6] shadow-[0_4px_16px_rgba(28,23,20,0.06)]">
        <Image
          src={config.customerImage}
          alt={t("tryOn.ui.altCustomerSelfie")}
          fill
          className="object-cover"
        />

        {/* Discrete Tap Instruction Overlay */}
        <div className="absolute top-2 left-2 right-2">
          <div className="px-2.5 py-1 rounded-full bg-[#1C1714]/75 backdrop-blur-xs text-[10px] font-sans text-[#FAF7F2] border border-white/10 text-center truncate">
            {t("tryOn.ui.tapEarring")}
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Earring Picker Strip */}
      <div className="w-full bg-[#FFFDFB] p-2 rounded-2xl border border-[#E8E0D5] shadow-xs">
        <div className="grid grid-cols-3 gap-1.5">
          {config.earrings.map((item, idx) => {
            const isSelected = idx === 0; // Earring 1 is tapped
            return (
              <div
                key={item.id}
                className={`relative flex flex-col items-center p-1.5 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-[#FAF7F2] border-[#B8975A] shadow-xs ring-1 ring-[#B8975A]/40"
                    : "bg-[#F9F6F0] border-[#E8E0D5] opacity-65"
                }`}
              >
                {/* 1:1 Earring Thumbnail */}
                <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                  <Image
                    src={item.image}
                    alt={t(item.nameKey)}
                    fill
                    className="object-contain"
                  />
                </div>

                <span className="text-[8px] font-sans text-[#1C1714] font-medium truncate mt-0.5">
                  {t(item.nameKey)}
                </span>

                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#B8975A] text-white flex items-center justify-center">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
