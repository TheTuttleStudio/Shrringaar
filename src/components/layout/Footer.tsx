"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t, isHindi } = useT();
  const currentYear = 2026;

  // Logo always uses Cormorant Garamond in all languages
  const logoFont = "font-[family-name:var(--font-cormorant)]";

  return (
    <footer className="w-full bg-[#F5EFE6] text-[#1C1714] border-t border-[#E8E0D5] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E8E0D5]/70">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-1.5">
              <span
                className={cn(
                  "font-logo text-3xl font-light tracking-wide text-[#1C1714]"
                )}
              >
                {siteConfig.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8975A]" />
            </div>
            <p className="text-sm font-sans text-[#6B625B] max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <p className="text-xs text-[#8A7F77] font-sans tracking-wide">
              {t("footer.location")}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#91723A] font-semibold">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              {siteConfig.nav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-[#5C534D] hover:text-[#1C1714] transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#91723A] font-semibold">
              {t("footer.contact")}
            </h4>
            <div className="space-y-2 text-sm font-sans text-[#5C534D]">
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#B8975A] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-[#B8975A] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="pt-2">
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#91723A] hover:underline"
                >
                  {t("cta.contactWhatsApp")} →
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8A7F77]">
          <p>
            © {currentYear} {siteConfig.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-[#1C1714] transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="#terms" className="hover:text-[#1C1714] transition-colors">
              {t("footer.terms")}
            </Link>
            <Link href="#security" className="hover:text-[#1C1714] transition-colors">
              {t("footer.security")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
