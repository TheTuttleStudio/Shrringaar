"use client";

import React from "react";
import Image from "next/image";
import { useT } from "@/hooks/useT";
import { X, Sparkles, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type RingPartId = "head" | "basket" | "shoulder" | "shank";

interface RingPartDetailProps {
  partId: RingPartId | null;
  onClose: () => void;
}

export function RingPartDetail({ partId, onClose }: RingPartDetailProps) {
  const { t, isHindi } = useT();

  if (!partId) return null;

  // Retrieve part specifications from localized content
  const label = t(`ringInspection.parts.${partId}.label`);
  const subtitle = t(`ringInspection.parts.${partId}.subtitle`);
  const description = t(`ringInspection.parts.${partId}.description`);
  const image = `/images/parts/${
    partId === "head"
      ? "crown.jpg"
      : partId === "basket"
      ? "basket.jpg"
      : partId === "shoulder"
      ? "pave.jpg"
      : "shank.jpg"
  }`;

  // 4 craft specifications per part
  const specs = [
    {
      name: t(`ringInspection.parts.${partId}.specs.0.name`),
      value: t(`ringInspection.parts.${partId}.specs.0.value`),
    },
    {
      name: t(`ringInspection.parts.${partId}.specs.1.name`),
      value: t(`ringInspection.parts.${partId}.specs.1.value`),
    },
    {
      name: t(`ringInspection.parts.${partId}.specs.2.name`),
      value: t(`ringInspection.parts.${partId}.specs.2.value`),
    },
    {
      name: t(`ringInspection.parts.${partId}.specs.3.name`),
      value: t(`ringInspection.parts.${partId}.specs.3.value`),
    },
  ];

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <AnimatePresence>
      <motion.div
        key={partId}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-2.5 left-2.5 right-2.5 sm:right-auto sm:max-w-[285px] z-30 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-xl border border-[#B8975A]/35 shadow-[0_14px_38px_rgba(28,23,20,0.14)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Luxury Gradient Accent Line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#B8975A]/20 via-[#B8975A] to-[#B8975A]/20" />

        <div className="p-3 sm:p-3.5 flex flex-col gap-2.5">
          {/* Header Row: Macro thumbnail + Titles + Close Button */}
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Macro Image Thumbnail */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-[#B8975A]/50 shadow-sm flex-shrink-0 group">
                <Image
                  src={image}
                  alt={label}
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0.5 right-0.5 p-0.5 rounded bg-black/40 text-white backdrop-blur-xs">
                  <ZoomIn className="w-2 h-2" />
                </div>
              </div>

              {/* Title & Category Badge */}
              <div className="flex flex-col min-w-0">
                <div className="inline-flex items-center gap-1 text-[9px] font-sans uppercase tracking-wider text-[#91723A] font-semibold truncate">
                  <Sparkles className="w-2.5 h-2.5 text-[#B8975A] flex-shrink-0" />
                  <span className="truncate">{subtitle}</span>
                </div>
                <h3
                  className={`text-sm sm:text-base font-normal text-[#1C1714] leading-snug truncate ${serifFont}`}
                >
                  {label}
                </h3>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1 -mr-1 -mt-1 rounded-full text-[#8A7F77] hover:text-[#1C1714] hover:bg-[#F5EFE6] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B8975A]"
              aria-label={t("ringInspection.closeAria")}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-[11px] font-sans font-light text-[#5C534D] leading-snug">
            {description}
          </p>

          {/* 4 Precision Specifications Badges in compact grid */}
          <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-[#E8E0D5]/70">
            {specs.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col px-2 py-1 rounded-md bg-[#F5EFE6]/70 border border-[#E8E0D5]/60"
              >
                <span className="text-[9px] font-sans uppercase tracking-wider text-[#8A7F77] truncate">
                  {s.name}
                </span>
                <span className="text-[11px] font-sans font-medium text-[#1C1714] truncate">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Dismiss hint & Done */}
          <div className="flex items-center justify-between pt-0.5 text-[9px] font-sans text-[#8A7F77]">
            <span>Click outside to rotate</span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#91723A] hover:underline font-medium text-[10px]"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
