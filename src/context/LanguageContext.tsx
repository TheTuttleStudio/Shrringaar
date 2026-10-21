"use client";

import React, { createContext, useContext, useMemo } from "react";
import { en, ContentType } from "@/content/en";
import { hi } from "@/content/hi";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  t: (path: string, fallback?: string) => string;
  content: ContentType;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const contentMap: Record<Language, ContentType> = {
  en,
  hi,
};

// Helper to access nested keys like "hero.title" or "pricing.title"
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

export function LanguageProvider({
  language,
  children,
}: {
  language: Language;
  children: React.ReactNode;
}) {
  const content = useMemo(() => contentMap[language] || en, [language]);

  const t = (path: string, fallback?: string): string => {
    const val = getNestedValue(content, path);
    if (val !== undefined) return val;
    const fallbackVal = getNestedValue(en, path);
    if (fallbackVal !== undefined) return fallbackVal;
    return fallback || path;
  };

  const isHindi = language === "hi";

  return (
    <LanguageContext.Provider value={{ language, t, content, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en" as Language,
      t: (path: string, fallback?: string) => getNestedValue(en, path) || fallback || path,
      content: en,
      isHindi: false,
    };
  }
  return context;
}

