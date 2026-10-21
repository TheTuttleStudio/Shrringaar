"use client";

import React from "react";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

export function NumbersStripSection() {
  const { t, isHindi } = useT();

  return (
    <Section
      id="highlights"
      variant="subtle"
      className="py-12 sm:py-16 border-y border-[#E8E0D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {siteConfig.numbersStrip.map((item, index) => {
              const title = t(item.titleKey);
              const desc = t(item.descKey);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col space-y-1.5 relative",
                    // Subtle left border on desktop for items after the first
                    index > 0 && "lg:border-l lg:border-[#E8E0D5] lg:pl-6"
                  )}
                >
                  <h3
                    className={cn(
                      "text-base sm:text-lg font-medium text-[#1C1714] tracking-tight",
                      isHindi
                        ? "font-[family-name:var(--font-tiro-hindi)] text-lg"
                        : "font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-semibold"
                    )}
                  >
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-light text-[#6B625B] leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
