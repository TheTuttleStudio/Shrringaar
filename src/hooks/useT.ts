"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Hook to access localized text and language state.
 * Returns:
 * - t: function to resolve key paths e.g. t('nav.howItWorks')
 * - content: directly typed current dictionary object
 * - language: 'en' | 'hi'
 * - setLanguage: (lang: 'en' | 'hi') => void
 * - toggleLanguage: () => void
 */
export function useT() {
  const { t, content, language, setLanguage, toggleLanguage } = useLanguage();
  return {
    t,
    content,
    language,
    setLanguage,
    toggleLanguage,
    isHindi: language === "hi",
  };
}
