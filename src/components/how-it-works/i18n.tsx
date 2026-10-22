"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

export type Lang = "en" | "hi";

export const dict = {
  en: {
    nav: ["How it works", "Catalogue", "Virtual try-on", "Pricing", "FAQ"],
    bookDemo: "Book a demo",
    pill: "Simple 4-step process",
    title: "How it works in your shop",
    subtitle: "No camera gear. No studio lights. Just your counter, your jewellery and your phone.",
    steps: [
      { title: "Upload your photos", body: "Snap photos on your phone right at your counter. No special lights needed." },
      { title: "We clean and enhance them", body: "We fix the light and clean the background. Your gold keeps its true colour." },
      { title: "Your catalogue goes live", body: "Your pieces appear on your shop's own link, ready for customers to browse." },
      { title: "Share it with a link or QR", body: "Place a QR stand at your counter or send the link over WhatsApp." },
    ],
    before: "Before",
    after: "After",
    drag: "Drag to compare",
    shopName: "Lakshmi Jewellers",
    scan: "Scan to view catalogue",
    waMsg: "Namaste! See our new collection here 👇",
    setup: "Set up in under a day.",
  },
  hi: {
    nav: ["कैसे काम करता है", "कैटलॉग", "वर्चुअल ट्राई-ऑन", "कीमत", "सवाल-जवाब"],
    bookDemo: "डेमो बुक करें",
    pill: "आसान 4-चरण प्रक्रिया",
    title: "आपकी दुकान में यह कैसे काम करता है",
    subtitle: "न कैमरा, न स्टूडियो लाइट। बस आपका काउंटर, आपके गहने और आपका फ़ोन।",
    steps: [
      { title: "अपनी फ़ोटो अपलोड करें", body: "काउंटर पर ही फ़ोन से फ़ोटो लें। किसी खास लाइट की ज़रूरत नहीं।" },
      { title: "हम उन्हें साफ़ और बेहतर बनाते हैं", body: "हम रोशनी ठीक करते हैं और बैकग्राउंड साफ़ करते हैं। आपके सोने का असली रंग बना रहता है।" },
      { title: "आपका कैटलॉग लाइव हो जाता है", body: "आपके गहने आपकी दुकान के अपने लिंक पर दिखते हैं, ग्राहकों के देखने के लिए तैयार।" },
      { title: "लिंक या QR से शेयर करें", body: "काउंटर पर QR स्टैंड रखें या WhatsApp पर लिंक भेजें।" },
    ],
    before: "पहले",
    after: "बाद में",
    drag: "तुलना के लिए खींचें",
    shopName: "लक्ष्मी ज्वेलर्स",
    scan: "कैटलॉग देखने के लिए स्कैन करें",
    waMsg: "नमस्ते! हमारा नया कलेक्शन यहाँ देखें 👇",
    setup: "एक दिन से कम में सेटअप।",
  },
};

export type Dict = (typeof dict)["en"];

interface CtxValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  isExplicit?: boolean;
}

const Ctx = createContext<CtxValue>({
  lang: "en",
  setLang: () => {},
  t: dict.en,
  isExplicit: false,
});

export function LangProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang || "en");
  return (
    <Ctx.Provider value={{ lang, setLang, t: (dict[lang] || dict.en) as Dict, isExplicit: true }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const customCtx = useContext(Ctx);
  const globalLang = useLanguage();

  const activeLang: Lang = customCtx.isExplicit
    ? customCtx.lang
    : (globalLang?.language === "hi" ? "hi" : "en");

  return {
    lang: activeLang,
    setLang: customCtx.setLang,
    t: (dict[activeLang] || dict.en) as Dict,
  };
}
