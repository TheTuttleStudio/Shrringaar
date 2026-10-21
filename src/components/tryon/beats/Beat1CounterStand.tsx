"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";

export function Beat1CounterStand() {
  const { t, isHindi } = useT();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Ambient warm radial glow behind the QR stand */}
      <div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#B8975A]/12 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Stand & Glass Counter Assembly */}
      <div className="relative flex flex-col items-center z-10 w-full max-w-[280px] sm:max-w-[320px]">
        {/* Upright Acrylic / Brass QR Plaque */}
        <div className="relative w-48 sm:w-56 p-3 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#B8975A]/50 shadow-[0_20px_48px_rgba(0,0,0,0.6),0_2px_6px_rgba(184,151,90,0.2)] flex flex-col items-center">
          {/* Subtle gold plaque corner accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#B8975A]/60" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#B8975A]/60" />

          {/* Top Brand Tag */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
            <span className="text-[11px] font-serif font-medium text-[#1C1714] tracking-wider uppercase">
              Shringaar
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
          </div>

          {/* Prominent, high-clarity QR Code */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border border-[#E8E0D5] bg-white p-2 shadow-inner my-1">
            <Image
              src={siteConfig.tryOn.qrImage}
              alt={t("tryOn.ui.altQrStand")}
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Prompt badge */}
          <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-[#B8975A]/15 border border-[#B8975A]/30">
            <span className="text-[10px] font-sans font-medium text-[#91723A]">
              {t("tryOn.ui.scanToTryOn")}
            </span>
          </div>

          {/* Shop Link in clean Manrope font */}
          <span className="text-[10px] sm:text-[11px] font-sans font-medium text-[#6B5E4F] mt-1 text-center truncate max-w-full">
            {siteConfig.tryOn.sampleUrl}
          </span>
        </div>


        {/* Slotted Brass Stand Base Foot */}
        <div className="relative -mt-1 z-20 flex flex-col items-center">
          {/* Solid brass holder block */}
          <div className="w-28 sm:w-32 h-2.5 rounded-t-sm rounded-b bg-gradient-to-r from-[#91723A] via-[#D4BD8B] to-[#91723A] shadow-md border-t border-[#FFF2D6]/40" />
          {/* Contact shadow right under the stand */}
          <div className="w-36 sm:w-40 h-1 bg-black/40 rounded-full blur-[2px]" />
        </div>

        {/* Minimal Glass Jewellery Counter Top (SVG) */}
        <div className="w-full mt-1 relative z-10 flex justify-center">
          <svg
            viewBox="0 0 320 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-w-[320px] overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Thin gold bevel edge gradient */}
              <linearGradient id="goldBevel" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B8975A" stopOpacity="0.1" />
                <stop offset="20%" stopColor="#D4BD8B" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFF2D6" stopOpacity="1" />
                <stop offset="80%" stopColor="#D4BD8B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#B8975A" stopOpacity="0.1" />
              </linearGradient>

              {/* Glass surface reflection gradient */}
              <linearGradient id="glassSurface" x1="160" y1="4" x2="160" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.18" />
                <stop offset="35%" stopColor="#D4BD8B" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1C1714" stopOpacity="0.45" />
              </linearGradient>

              {/* Glass front bevel edge */}
              <linearGradient id="glassFront" x1="0" y1="38" x2="320" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B8975A" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#D4BD8B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B8975A" stopOpacity="0.2" />
              </linearGradient>

              {/* Specular light streak across glass */}
              <linearGradient id="glassStreak" x1="40" y1="12" x2="200" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Stand contact reflection on glass */}
            <ellipse cx="160" cy="8" rx="72" ry="4" fill="#000000" fillOpacity="0.4" />
            <ellipse cx="160" cy="11" rx="48" ry="3" fill="#D4BD8B" fillOpacity="0.18" />

            {/* Glass Countertop Top Plane (Trapezoid for perspective) */}
            <polygon points="12,4 308,4 320,38 0,38" fill="url(#glassSurface)" />

            {/* Specular reflection glint across top plane */}
            <polygon points="60,6 180,6 210,34 90,34" fill="url(#glassStreak)" />

            {/* Thin Champagne Gold Top Bevel Edge */}
            <line x1="12" y1="4" x2="308" y2="4" stroke="url(#goldBevel)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Front Glass Edge (Depth thickness) */}
            <polygon points="0,38 320,38 320,44 0,44" fill="url(#glassFront)" />
            <line x1="0" y1="44" x2="320" y2="44" stroke="#B8975A" strokeOpacity="0.4" strokeWidth="1" />

            {/* Under-counter subtle dark depth gradient */}
            <polygon points="0,44 320,44 310,54 10,54" fill="#14110F" fillOpacity="0.7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
