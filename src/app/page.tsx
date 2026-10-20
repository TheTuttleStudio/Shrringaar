"use client";

import React from "react";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Button } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { useT } from "@/hooks/useT";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { HeroJewelleryStage } from "@/components/canvas/HeroJewelleryStage";

export default function Home() {
  const { t, isHindi } = useT();

  const serifHeadingFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <Section
        id="hero"
        variant="ivory"
        className="pt-6 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-24 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Heading & Content on Desktop */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 order-1">
            {/* Subtle quiet luxury badge */}
            <Reveal mode="mount" delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8975A]/10 border border-[#B8975A]/25 text-[#91723A] text-xs font-sans tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#B8975A]" />
                <span>{t("hero.tag")}</span>
              </div>
            </Reveal>

            {/* Cormorant Garamond / Tiro Devanagari Heading with italic accent */}
            <Reveal mode="mount" delay={0.12}>
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-light tracking-tight leading-[1.12] text-[#1C1714] ${serifHeadingFont}`}
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

            {/* Desktop Description */}
            <Reveal mode="mount" delay={0.2} className="hidden lg:block">
              <p className="text-base sm:text-lg md:text-xl font-sans font-light text-[#5C534D] max-w-xl leading-relaxed">
                {t("hero.description")}
              </p>
            </Reveal>

            {/* Desktop CTAs */}
            <Reveal mode="mount" delay={0.26} className="hidden lg:block">
              <div className="flex items-center gap-3.5 pt-1 w-full sm:w-auto">
                <Button
                  href="#book-demo"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto font-normal shadow-sm"
                >
                  <span>{t("cta.bookDemo")}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
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

            {/* Desktop Trust Badge */}
            <Reveal mode="mount" delay={0.3} className="hidden lg:block">
              <div className="pt-1 flex items-center justify-start gap-2 text-xs font-sans text-[#8A7F77]">
                <ShieldCheck className="w-4 h-4 text-[#B8975A]" />
                <span>{t("hero.badgeRating")}</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column on Desktop / Center on Mobile: Single 3D Ring Stage */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center order-2 w-full my-1 sm:my-2 lg:my-0">
            <Reveal mode="mount" delay={0.16}>
              <HeroJewelleryStage />
            </Reveal>
          </div>

          {/* Mobile Only: CTA, Description, Trust (Right below the ring stage) */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-4 order-3 w-full">
            {/* Immediate "Book a demo" button visible above/at the fold */}
            <Reveal mode="mount" delay={0.22} className="w-full">
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                <Button
                  href="#book-demo"
                  variant="primary"
                  size="lg"
                  className="w-full font-normal shadow-sm"
                >
                  <span>{t("cta.bookDemo")}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  href="#how-it-works"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  {t("cta.exploreCatalogue")}
                </Button>
              </div>
            </Reveal>

            {/* Body Copy */}
            <Reveal mode="mount" delay={0.26}>
              <p className="text-sm sm:text-base font-sans font-light text-[#5C534D] max-w-xl leading-relaxed">
                {t("hero.description")}
              </p>
            </Reveal>

            {/* Trust Badge */}
            <Reveal mode="mount" delay={0.3}>
              <div className="pt-1 flex items-center justify-center gap-2 text-xs font-sans text-[#8A7F77]">
                <ShieldCheck className="w-4 h-4 text-[#B8975A]" />
                <span>{t("hero.badgeRating")}</span>
              </div>
            </Reveal>
          </div>
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
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
