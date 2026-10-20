"use client";

import React from "react";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { useT } from "@/hooks/useT";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function Home() {
  const { t, content, isHindi } = useT();

  const serifHeadingFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <Section
        id="hero"
        variant="ivory"
        className="pt-12 sm:pt-24 md:pt-36 pb-16 sm:pb-24"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Subtle quiet luxury badge */}
          <Reveal mode="mount" delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B8975A]/10 border border-[#B8975A]/25 text-[#91723A] text-xs font-sans tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
              <span>{t("hero.tag")}</span>
            </div>
          </Reveal>

          {/* Cormorant Garamond Heading with italic accent word */}
          <Reveal mode="mount" delay={0.12}>
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.16] sm:leading-[1.14] text-[#1C1714] ${serifHeadingFont}`}
            >
              {t("hero.headingPrefix")}{" "}
              <span className="italic font-normal text-[#91723A]">
                {t("hero.headingAccent")}
              </span>{" "}
              {isHindi ? (
                <span>
                  {t("hero.headingSuffix").replace("।", "")}
                  <span className="inline-block -ml-[0.22em]">।</span>
                </span>
              ) : (
                t("hero.headingSuffix")
              )}
            </h1>
          </Reveal>

          {/* Simple, calm, human body copy */}
          <Reveal mode="mount" delay={0.2} className="w-full flex justify-center">
            <p className="text-base sm:text-lg md:text-xl font-sans font-light text-[#5C534D] max-w-2xl mx-auto leading-relaxed text-center">
              {t("hero.description")}
            </p>
          </Reveal>

          {/* Primary CTA: "Book a demo" */}
          <Reveal mode="mount" delay={0.28}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
              <Button
                href="#book-demo"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>{t("cta.bookDemo")}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                href="#how-it-works"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t("cta.exploreCatalogue")}
              </Button>
            </div>
          </Reveal>

          {/* Trust badge */}
          <Reveal mode="mount" delay={0.35}>
            <div className="pt-4 sm:pt-6 flex items-center justify-center gap-2 text-xs font-sans text-[#8A7F77]">
              <ShieldCheck className="w-4 h-4 text-[#B8975A]" />
              <span>{t("hero.badgeRating")}</span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How it Works Section */}
      <Section id="how-it-works" variant="subtle">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <Heading
              level={2}
              badge={t("placeholderSections.howItWorks.badge")}
              subtitle={t("placeholderSections.howItWorks.subtitle")}
              align="center"
            >
              {t("placeholderSections.howItWorks.title")}
            </Heading>
          </div>
        </Reveal>
      </Section>

      {/* Catalogue Section */}
      <Section id="catalogue" variant="ivory">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <Heading
              level={2}
              badge={t("placeholderSections.catalogue.badge")}
              subtitle={t("placeholderSections.catalogue.subtitle")}
              align="center"
            >
              {t("placeholderSections.catalogue.title")}
            </Heading>
          </div>
        </Reveal>
      </Section>

      {/* Try-On Section (Dark demo section) */}
      <Section id="try-on" variant="dark">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <Heading
              level={2}
              dark
              badge={t("placeholderSections.tryOn.badge")}
              subtitle={t("placeholderSections.tryOn.subtitle")}
              align="center"
            >
              {t("placeholderSections.tryOn.title")}
            </Heading>
          </div>
        </Reveal>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" variant="ivory">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <Heading
              level={2}
              badge={t("placeholderSections.pricing.badge")}
              subtitle={t("placeholderSections.pricing.subtitle")}
              align="center"
            >
              {t("placeholderSections.pricing.title")}
            </Heading>
          </div>
        </Reveal>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" variant="subtle">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <Heading
              level={2}
              badge={t("placeholderSections.faq.badge")}
              subtitle={t("placeholderSections.faq.subtitle")}
              align="center"
            >
              {t("placeholderSections.faq.title")}
            </Heading>
          </div>
        </Reveal>
      </Section>

      {/* Book a Demo CTA Form Section */}
      <Section id="book-demo" variant="ivory" className="pb-32">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Heading
              level={2}
              badge={t("placeholderSections.demo.badge")}
              subtitle={t("placeholderSections.demo.subtitle")}
              align="center"
            >
              {t("placeholderSections.demo.title")}
            </Heading>

            <div className="pt-4 flex justify-center">
              <Button href="#book-demo" variant="primary" size="lg">
                <span>{t("cta.bookDemo")}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
