"use client";

import React from "react";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";

export function HowItWorksSection() {
  const { t, isHindi } = useT();
  const config = siteConfig.howItWorks;

  const serifFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  // 4 hand-drawn inline SVG icons in champagne gold (#B8975A) with 1.5px stroke
  const icons = [
    // Step 1: Upload (Phone + upward arrow)
    <svg
      key="icon-1"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B8975A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M12 18h.01" />
      <path d="M12 13V7" />
      <path d="M9 10l3-3 3 3" />
    </svg>,

    // Step 2: Clean & Enhance (Glint sparkles + clean lens)
    <svg
      key="icon-2"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B8975A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M18.36 5.64l-2.12 2.12" />
      <path d="M7.76 16.24l-2.12 2.12" />
      <path d="M5.64 5.64l2.12 2.12" />
      <path d="M16.24 16.24l2.12 2.12" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>,

    // Step 3: Catalogue Live (Live storefront card)
    <svg
      key="icon-3"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B8975A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
      <circle cx="6" cy="6" r="0.75" fill="#B8975A" />
      <circle cx="8.5" cy="6" r="0.75" fill="#B8975A" />
    </svg>,

    // Step 4: Share QR / Link
    <svg
      key="icon-4"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B8975A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" />
      <path d="M17 21v-4h4" />
    </svg>,
  ];

  return (
    <Section id="how-it-works" variant="subtle" className="py-16 sm:py-24">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Heading
            level={2}
            badge={t(config.tagKey)}
            subtitle={t(config.subtitleKey)}
            align="center"
          >
            {t(config.titleKey)}
          </Heading>
        </div>
      </Reveal>

      {/* Steps Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Horizontal Connecting Line (Desktop) */}
        <div
          className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-[#B8975A]/10 via-[#B8975A]/35 to-[#B8975A]/10 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-6 md:gap-4 relative z-10">
          {config.steps.map((step, idx) => {
            const stepNum = String(idx + 1).padStart(2, "0");
            return (
              <Reveal key={step.id} delay={0.08 * (idx + 1)}>
                <div className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 sm:gap-5 md:gap-0 group">
                  {/* Left Column on Mobile / Centered Icon on Desktop */}
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    {/* Vertical Connecting Line (Mobile only, between icon bottoms and tops) */}
                    {idx < config.steps.length - 1 && (
                      <div
                        className="md:hidden absolute top-[58px] bottom-[-34px] w-[1px] bg-[#B8975A]/35 z-0 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon & Step Circle */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] group-hover:border-[#B8975A]/60 shadow-[0_4px_20px_rgba(28,23,20,0.03)] flex items-center justify-center transition-all duration-300 md:mb-5 z-10">
                      {icons[idx]}

                      {/* Step Number Badge */}
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#B8975A]/40 text-[9px] sm:text-[10px] font-mono font-medium text-[#91723A] shadow-xs">
                        {stepNum}
                      </span>
                    </div>
                  </div>

                  {/* Text Column on Mobile / Below on Desktop */}
                  <div className="flex-1 min-w-0 pt-1 md:pt-0">
                    <h3
                      className={`text-base sm:text-lg md:text-xl font-normal text-[#1C1714] leading-snug mb-1 md:mb-2 ${serifFont}`}
                    >
                      {t(step.titleKey)}
                    </h3>

                    <p className="text-xs sm:text-[13px] font-sans font-light text-[#6B5E4F] leading-relaxed max-w-[280px] md:max-w-[240px]">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
