"use client";

import React from "react";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/common/Button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const { t, isHindi } = useT();

  const formattedPrice = React.useMemo(() => {
    try {
      const num = new Intl.NumberFormat("en-IN").format(siteConfig.pricing.priceAmount);
      return `${siteConfig.pricing.currencySymbol}${num}`;
    } catch {
      return `₹${siteConfig.pricing.priceAmount}`;
    }
  }, []);

  const showPriceNumber = siteConfig.pricing.showPriceNumber;

  return (
    <Section id="pricing" variant="ivory" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header without tag/badge */}
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
            <Heading
              level={2}
              align="center"
              subtitle={t("pricing.subtitle")}
            >
              {t("pricing.title")}
            </Heading>
          </div>
        </Reveal>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto">
          {/* Card 1: One shop (Featured) */}
          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#FFFDFB] border-2 border-[#B8975A]/40 shadow-[0_8px_30px_rgba(28,23,20,0.04)] transition-all hover:border-[#B8975A]/70">
              <div className="space-y-6">
                <div>
                  <h3
                    className={cn(
                      "text-xl sm:text-2xl font-light text-[#1C1714]",
                      isHindi
                        ? "font-[family-name:var(--font-tiro-hindi)] font-normal"
                        : "font-[family-name:var(--font-cormorant)] text-3xl font-medium"
                    )}
                  >
                    {t(siteConfig.pricing.singleShop.nameKey)}
                  </h3>
                  <p className="mt-2 text-sm font-sans text-[#6B625B] leading-relaxed">
                    {t(siteConfig.pricing.singleShop.descKey)}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-[#E8E0D5]">
                  {showPriceNumber ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-light font-sans text-[#1C1714] tracking-tight">
                        {formattedPrice}
                      </span>
                      <span className="text-sm font-sans text-[#8A7F77]">
                        / {t(siteConfig.pricing.singleShop.cadenceKey)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-light font-sans text-[#1C1714]">
                      {t(siteConfig.pricing.singleShop.hiddenPriceKey)}
                    </div>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 pt-2" aria-label="Included features">
                  {siteConfig.pricing.singleShop.featuresKeys.map((featureKey) => (
                    <li key={featureKey} className="flex items-start gap-3 text-sm font-sans text-[#3A322D]">
                      <span className="mt-0.5 rounded-full p-0.5 bg-[#FAF3E6] text-[#B8975A] shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span className="leading-snug">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-8 mt-6">
                <Button
                  href={siteConfig.pricing.singleShop.ctaHref}
                  variant="primary"
                  size="lg"
                  className="w-full text-center"
                >
                  {t(siteConfig.pricing.singleShop.ctaKey)}
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Two or more shops */}
          <Reveal delay={0.2} className="h-full">
            <div className="h-full flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#FFFDFB]/80 border border-[#E8E0D5] transition-all hover:border-[#D1C7BA]">
              <div className="space-y-6">
                <div>
                  <h3
                    className={cn(
                      "text-xl sm:text-2xl font-light text-[#1C1714]",
                      isHindi
                        ? "font-[family-name:var(--font-tiro-hindi)] font-normal"
                        : "font-[family-name:var(--font-cormorant)] text-3xl font-medium"
                    )}
                  >
                    {t(siteConfig.pricing.multiShop.nameKey)}
                  </h3>
                  <p className="mt-2 text-sm font-sans text-[#6B625B] leading-relaxed">
                    {t(siteConfig.pricing.multiShop.descKey)}
                  </p>
                </div>

                {/* Price Line: Custom Pricing (no duplicate "Talk to us") */}
                <div className="pt-2 pb-4 border-b border-[#E8E0D5]">
                  <div className="text-2xl sm:text-3xl font-light font-sans text-[#1C1714]">
                    {t(siteConfig.pricing.multiShop.priceKey)}
                  </div>
                </div>

                {/* Informational Callout Box to balance height with Card 1 */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5]/70">
                  <p className="text-xs sm:text-sm font-sans font-light text-[#5C534D] leading-relaxed">
                    {t("pricing.multi.note")}
                  </p>
                </div>
              </div>

              {/* CTA Button: "Talk to us" appears ONLY here */}
              <div className="pt-8 mt-6">
                <Button
                  href={siteConfig.pricing.multiShop.ctaHref}
                  variant="secondary"
                  size="lg"
                  className="w-full text-center"
                >
                  {t(siteConfig.pricing.multiShop.ctaKey)}
                </Button>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  );
}
