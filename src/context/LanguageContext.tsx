"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { en, ContentType } from "@/content/en";
import { hi } from "@/content/hi";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
  content: ContentType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const contentMap: Record<Language, ContentType> = {
  en,
  hi,
};

// Helper to access nested keys like "hero.title" or "nav.howItWorks"
function getNestedValue(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryLang = params.get("lang") as Language | null;
      if (queryLang === "en" || queryLang === "hi") {
        setLanguageState(queryLang);
        setMounted(true);
        return;
      }

      const saved = localStorage.getItem("shringaar_lang") as Language | null;
      if (saved === "en" || saved === "hi") {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may fail in restricted privacy mode
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("shringaar_lang", lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const content = useMemo(() => contentMap[language], [language]);

  const t = (path: string, fallback?: string): string => {
    const val = getNestedValue(content, path);
    if (val !== undefined) return val;
    const fallbackVal = getNestedValue(en, path);
    if (fallbackVal !== undefined) return fallbackVal;
    return fallback || path;
  };

  // Sync lang attribute on html tag
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for SSR/tests
    return {
      language: "en" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (path: string, fallback?: string) => getNestedValue(en, path) || fallback || path,
      content: en,
    };
  }
  return context;
}
