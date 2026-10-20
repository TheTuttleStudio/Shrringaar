"use client";

import React from "react";
import { Lock, RotateCw } from "lucide-react";
import { siteConfig } from "@/config/site";

interface PhoneFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export function PhoneFrame({
  children,
  url = siteConfig.tryOn.sampleUrl,
  className = "",
}: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto rounded-[32px] sm:rounded-[42px] p-2 sm:p-3 bg-[#241E1B] border-2 border-[#3D3530] shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] select-none w-[clamp(240px,72vw,280px)] h-[clamp(360px,50svh,410px)] lg:w-[310px] lg:h-[540px] flex-shrink-0 ${className}`}
    >
      {/* Outer Phone Shell */}
      <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#FAF7F2] flex flex-col border border-black/10">
        {/* Dynamic Island / Notch + Phone Speaker */}
        <div className="w-full bg-[#FAF7F2] pt-2 px-4 pb-1.5 flex items-center justify-between border-b border-[#E8E0D5]/60 z-30">
          <span className="text-[10px] font-mono font-semibold text-[#1C1714]/80">9:41</span>
          
          {/* Speaker pill */}
          <div className="w-16 h-3.5 bg-[#1C1714] rounded-full flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2C2420]" />
            <div className="w-6 h-1 rounded-full bg-[#2C2420]" />
          </div>

          {/* Signal / Battery indicators */}
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2 border border-[#1C1714]/70 rounded-xs flex items-center p-0.5">
              <div className="w-full h-full bg-[#1C1714]/80" />
            </div>
          </div>
        </div>

        {/* In-Browser Top Bar */}
        <div className="w-full bg-[#F5EFE6] px-2.5 py-1.5 flex items-center gap-1.5 border-b border-[#E8E0D5] z-30">
          <div className="flex-1 bg-[#FAF7F2] border border-[#E8E0D5] rounded-lg px-2 py-1 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-1 min-w-0">
              <Lock className="w-2.5 h-2.5 text-[#91723A] flex-shrink-0" />
              <span className="text-[10px] font-mono text-[#1C1714] truncate tracking-tight font-medium">
                {url}
              </span>
            </div>
            <RotateCw className="w-2.5 h-2.5 text-[#8A7F77] flex-shrink-0" />
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="relative flex-1 w-full overflow-hidden bg-[#FAF7F2]">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="w-full bg-[#FAF7F2] pb-1.5 pt-1 flex justify-center z-30">
          <div className="w-24 h-1 bg-[#1C1714]/25 rounded-full" />
        </div>
      </div>
    </div>
  );
}
