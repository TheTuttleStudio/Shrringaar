"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { Check, Sparkles } from "lucide-react";

export function Beat2PhoneScan() {
  const { t, isHindi } = useT();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 bg-[#14110F] overflow-hidden text-white">
      {/* Camera Viewfinder Dark Background with faint QR stand */}
      <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center">
        <div className="relative w-40 h-40">
          <Image
            src={siteConfig.tryOn.qrImage}
            alt={t("tryOn.ui.altTargetQr")}
            fill
            className="object-contain filter blur-[1px]"
          />
        </div>
      </div>

      {/* Top Banner: Camera Scanning Notification */}
      <div className="relative w-full pt-2 z-20">
        <div className="mx-auto max-w-[220px] px-3 py-1.5 rounded-full bg-[#1C1714]/90 border border-[#B8975A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center gap-1.5 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-[#B8975A] animate-ping" />
          <span className="text-[10px] font-sans font-medium text-[#FAF7F2] truncate">
            {t("tryOn.ui.qrDetected")}
          </span>
        </div>
      </div>

      {/* Central Viewfinder Frame & Scan Laser */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 my-auto flex items-center justify-center z-10">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#B8975A] rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#B8975A] rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#B8975A] rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#B8975A] rounded-br-lg" />

        {/* Focused QR Thumbnail */}
        <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-[#B8975A]/50 bg-[#FAF7F2] p-1 shadow-md">
          <Image
            src={siteConfig.tryOn.qrImage}
            alt={t("tryOn.ui.altScannedQr")}
            fill
            className="object-contain"
          />
        </div>

        {/* Gold Scanning Horizontal Laser Beam */}
        <div className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#FFDF99] to-transparent shadow-[0_0_12px_#B8975A] animate-pulse" />
      </div>

      {/* Bottom Popup Drawer: Opening yourshop.shringaar.live */}
      <div className="relative w-full pb-2 z-20">
        <div className="w-full p-2.5 rounded-2xl bg-[#FAF7F2] text-[#1C1714] shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-[#E8E0D5] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#B8975A] text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-sans font-semibold text-[#1C1714] truncate">
              {siteConfig.tryOn.sampleUrl}
            </p>
            <p className="text-[9px] font-sans text-[#6B5E4F] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#B8975A]" />
              <span>{t("tryOn.ui.openingApp")}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
