"use client";

import React, { useState } from "react";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { t, isHindi } = useT();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const formattedPrice = React.useMemo(() => {
    try {
      const num = new Intl.NumberFormat("en-IN").format(siteConfig.pricing.priceAmount);
      return `${siteConfig.pricing.currencySymbol}${num}`;
    } catch {
      return `₹${siteConfig.pricing.priceAmount}`;
    }
  }, []);

  return (
    <Section id="faq" variant="subtle" className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
        <Reveal>
          <div className="text-center mb-14 sm:mb-18">
            <Heading
              level={2}
              align="center"
              subtitle={t("faq.subtitle")}
            >
              {t("faq.title")}
            </Heading>
          </div>
        </Reveal>

        {/* Accordion List */}
        <div className="divide-y divide-[#E8E0D5] border-y border-[#E8E0D5]">
          {siteConfig.faq.map((item, index) => {
            const isOpen = openId === item.id;
            const questionText = t(item.questionKey);

            // Dynamic answer for Q10 based on pricing config
            let answerText = "";
            if (item.isDynamicPrice) {
              if (siteConfig.pricing.showPriceNumber) {
                const template = t("faq.q10.aShown");
                answerText = template.replace("{price}", formattedPrice);
              } else {
                answerText = t("faq.q10.aHidden");
              }
            } else {
              answerText = t(item.answerKey);
            }

            const qId = `faq-q-${item.id}`;
            const aId = `faq-a-${item.id}`;

            return (
              <Reveal key={item.id} delay={0.03 * index}>
                <div className="group">
                  <h3>
                    <button
                      id={qId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={aId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8975A] rounded-sm transition-colors group-hover:text-[#B8975A]"
                    >
                      <span
                        className={cn(
                          "text-base sm:text-lg font-medium text-[#1C1714] transition-colors group-hover:text-[#B8975A]",
                          isHindi
                            ? "font-[family-name:var(--font-tiro-hindi)] font-normal text-lg"
                            : "font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-medium"
                        )}
                      >
                        {questionText}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 p-1 rounded-full text-[#8A7F77] group-hover:text-[#B8975A] transition-transform duration-300 motion-reduce:transition-none",
                          isOpen && "rotate-180 text-[#B8975A]"
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </button>
                  </h3>

                  {/* Accessible CSS Grid-template-rows animation (no JS height calculation) */}
                  <div
                    id={aId}
                    role="region"
                    aria-labelledby={qId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-4 sm:pr-8 text-sm sm:text-base font-sans font-light text-[#5C534D] leading-relaxed">
                        {answerText}
                      </p>
                    </div>
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
