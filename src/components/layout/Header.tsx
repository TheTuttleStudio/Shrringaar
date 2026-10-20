"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { Button } from "@/components/common/Button";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, language, setLanguage, isHindi } = useT();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logo always uses Cormorant Garamond in all languages
  const logoFont = "font-[family-name:var(--font-cormorant)]";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D5]/80 shadow-[0_4px_20px_rgba(28,23,20,0.03)]"
          : "bg-[#FAF7F2]/80 backdrop-blur-sm border-b border-[#E8E0D5]/40"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-1.5 group select-none"
          aria-label="Shringaar Home"
        >
          <span
            className={cn(
              "font-logo text-2xl sm:text-3xl font-light tracking-wide text-[#1C1714] transition-colors group-hover:text-[#B8975A]"
            )}
          >
            {siteConfig.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A] inline-block transition-transform duration-300 group-hover:scale-125" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main Navigation"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-sans tracking-wide text-[#5C534D] hover:text-[#1C1714] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B8975A] hover:after:w-full after:transition-all after:duration-300"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Right Section: Language Switcher & CTA */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Quiet Language Toggle */}
          <div
            className="relative flex items-center p-0.5 rounded-full border border-[#E8E0D5] bg-[#FFFDFB] text-xs font-sans select-none"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "relative z-10 px-2.5 py-1 rounded-full transition-all duration-200 font-medium",
                language === "en"
                  ? "bg-[#1C1714] text-[#FAF7F2] shadow-sm"
                  : "text-[#6B625B] hover:text-[#1C1714]"
              )}
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={cn(
                "relative z-10 px-2.5 py-1 rounded-full transition-all duration-200 font-medium",
                language === "hi"
                  ? "bg-[#1C1714] text-[#FAF7F2] shadow-sm"
                  : "text-[#6B625B] hover:text-[#1C1714]"
              )}
              aria-pressed={language === "hi"}
            >
              हिंदी
            </button>
          </div>

          {/* Book a Demo CTA */}
          <Button
            href="#book-demo"
            variant="primary"
            size="sm"
            className="hidden md:inline-flex font-normal"
          >
            {t("cta.bookDemo")}
          </Button>
        </div>

        {/* Mobile Controls (Language & Hamburger) */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-[#E8E0D5] text-[#5C534D] hover:border-[#B8975A] transition-colors"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#B8975A]" />
            <span>{language === "en" ? "हिंदी" : "EN"}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 rounded-lg text-[#1C1714] hover:bg-[#F5EFE6] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E0D5] bg-[#FAF7F2]/98 backdrop-blur-xl px-6 pt-4 pb-8 space-y-5 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-sans text-[#1C1714] py-1 border-b border-[#E8E0D5]/40 hover:text-[#B8975A] transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <Button
              href="#book-demo"
              variant="primary"
              size="md"
              className="w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("cta.bookDemo")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
