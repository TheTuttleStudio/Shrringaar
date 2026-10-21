"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Hook to access localized text and language state.
 * Returns:
 * - t: function to resolve key paths e.g. t('nav.howItWorks')
 * - content: directly typed current dictionary object
 * - language: 'en' | 'hi'
 * - isHindi: boolean
 */
export function useT() {
  const { t, content, language, isHindi } = useLanguage();
  return {
    t,
    content,
    language,
    isHindi,
  };
}

