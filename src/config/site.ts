export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
}

export interface PricingPlan {
  id: string;
  nameKey: string;
  priceKey: string;
  cadenceKey: string;
  descriptionKey: string;
  featuresKeys: string[];
  recommended?: boolean;
}

export interface HeroConfig {
  image: {
    desktop: string;
    mobile: string;
    altKey: string;
    fallbackAlt: string;
    aspectRatio: string;
  };
  motion: {
    enableFloat: boolean;
    enableCursorTilt: boolean;
    enableSparkles: boolean;
  };
}

export interface StepItem {
  id: string;
  stepNumber: number;
  titleKey: string;
  descKey: string;
}

export interface EnhancementPair {
  id: string;
  titleKey: string;
  before: string;
  after: string;
}

export interface EnhancementConfig {
  aspectRatio: string;
  tagKey: string;
  titleKey: string;
  lineKey: string;
  pairs: EnhancementPair[];
}

export interface ModelProfile {
  id: string;
  nameKey: string;
  styleKey: string;
  portrait: string;
  worn: string;
}

export interface ModelsConfig {
  showcaseAspectRatio: string;
  thumbnailAspectRatio: string;
  tagKey: string;
  titleKey: string;
  lineKey: string;
  list: ModelProfile[];
}

export interface TryOnBeat {
  id: string;
  stepNumber: number;
  labelKey: string;
  captionKey: string;
}

export interface TryOnConfig {
  tagKey: string;
  titleKey: string;
  closingLineKey: string;
  sampleSlug: string;
  sampleUrl: string;
  portraitAspectRatio: string;
  qrImage: string;
  customerImage: string;
  resultImage: string;
  earrings: Array<{
    id: string;
    nameKey: string;
    image: string;
  }>;
  beats: TryOnBeat[];
}

export interface ShopLinkConfig {
  tagKey: string;
  titleKey: string;
  lineKey: string;
  sampleSlug: string;
  sampleUrl: string;
  items: Array<{
    id: string;
    titleKey: string;
    image: string;
    ratio: string;
  }>;
}

export const siteConfig = {
  name: "Shrringaar.Live",
  shortName: "Shrringaar",
  domain: "shrringaar.live",
  url: "https://shrringaar.live",
  contact: {
    email: "namaste@shrringaar.live",
    phone: "+91 98200 12345",
    whatsapp: "https://wa.me/919820012345?text=Hello%20Shrringaar%20Team%2C%20I%20would%20like%20to%20know%20more.",
    address: "Mumbai & Jaipur, India",
  },
  hero: {
    image: {
      desktop: "/images/hero-jewellery.webp",
      mobile: "/images/hero-jewellery-mobile.webp",
      altKey: "hero.imageAlt",
      fallbackAlt: "Shrringaar.Live Heritage Gold and Emerald Jewellery",
      aspectRatio: "3 / 4",
    },
    motion: {
      enableFloat: true,
      enableCursorTilt: true,
      enableSparkles: true,
    },
  } as HeroConfig,
  howItWorks: {
    tagKey: "howItWorks.tag",
    titleKey: "howItWorks.title",
    subtitleKey: "howItWorks.subtitle",
    steps: [
      {
        id: "step-1",
        stepNumber: 1,
        titleKey: "howItWorks.steps.0.title",
        descKey: "howItWorks.steps.0.desc",
      },
      {
        id: "step-2",
        stepNumber: 2,
        titleKey: "howItWorks.steps.1.title",
        descKey: "howItWorks.steps.1.desc",
      },
      {
        id: "step-3",
        stepNumber: 3,
        titleKey: "howItWorks.steps.2.title",
        descKey: "howItWorks.steps.2.desc",
      },
      {
        id: "step-4",
        stepNumber: 4,
        titleKey: "howItWorks.steps.3.title",
        descKey: "howItWorks.steps.3.desc",
      },
    ] as StepItem[],
  },
  enhancement: {
    aspectRatio: "4 / 3",
    tagKey: "enhancement.tag",
    titleKey: "enhancement.title",
    lineKey: "enhancement.line",
    pairs: [
      {
        id: "necklace",
        titleKey: "enhancement.pairs.necklace.title",
        before: "/images/before-1.jpg",
        after: "/images/after-1.jpg",
      },
      {
        id: "bangles",
        titleKey: "enhancement.pairs.bangles.title",
        before: "/images/before-2.jpg",
        after: "/images/after-2.jpg",
      },
    ] as EnhancementPair[],
  } as EnhancementConfig,
  models: {
    showcaseAspectRatio: "4 / 3",
    thumbnailAspectRatio: "1 / 1",
    tagKey: "models.tag",
    titleKey: "models.title",
    lineKey: "models.line",
    list: [
      {
        id: "ananya",
        nameKey: "models.list.0.name",
        styleKey: "models.list.0.style",
        portrait: "/images/model-1.jpg",
        worn: "/images/model-1-worn.jpg",
      },
      {
        id: "meera",
        nameKey: "models.list.1.name",
        styleKey: "models.list.1.style",
        portrait: "/images/model-2.jpg",
        worn: "/images/model-2-worn.jpg",
      },
      {
        id: "rhea",
        nameKey: "models.list.2.name",
        styleKey: "models.list.2.style",
        portrait: "/images/model-3.jpg",
        worn: "/images/model-3-worn.jpg",
      },
    ] as ModelProfile[],
  } as ModelsConfig,
  tryOn: {
    tagKey: "tryOn.tag",
    titleKey: "tryOn.title",
    closingLineKey: "tryOn.closingLine",
    sampleSlug: "yourshop",
    sampleUrl: "yourshop.shrringaar.live",
    portraitAspectRatio: "4 / 5",
    qrImage: "/images/qr-sample.svg",
    customerImage: "/images/tryon-customer.jpg",
    resultImage: "/images/tryon-result.jpg",
    earrings: [
      {
        id: "jhumka",
        nameKey: "tryOn.ui.earring1",
        image: "/images/earring-1.png",
      },
      {
        id: "chandbali",
        nameKey: "tryOn.ui.earring2",
        image: "/images/earring-2.png",
      },
      {
        id: "studs",
        nameKey: "tryOn.ui.earring3",
        image: "/images/earring-3.png",
      },
    ],
    beats: [
      {
        id: "beat-1",
        stepNumber: 1,
        labelKey: "tryOn.steps.step1",
        captionKey: "tryOn.captions.beat1",
      },
      {
        id: "beat-2",
        stepNumber: 2,
        labelKey: "tryOn.steps.step2",
        captionKey: "tryOn.captions.beat2",
      },
      {
        id: "beat-3",
        stepNumber: 3,
        labelKey: "tryOn.steps.step3",
        captionKey: "tryOn.captions.beat3",
      },
      {
        id: "beat-4",
        stepNumber: 4,
        labelKey: "tryOn.steps.step4",
        captionKey: "tryOn.captions.beat4",
      },
    ],
  } as TryOnConfig,
  shopLink: {
    tagKey: "shopLink.tag",
    titleKey: "shopLink.title",
    lineKey: "shopLink.line",
    sampleSlug: "yourshop",
    sampleUrl: "yourshop.shrringaar.live",
    items: [
      {
        id: "item-1",
        titleKey: "shopLink.items.item1",
        image: "/images/after-1.jpg",
        ratio: "4/3",
      },
      {
        id: "item-2",
        titleKey: "shopLink.items.item2",
        image: "/images/after-2.jpg",
        ratio: "4/3",
      },
      {
        id: "item-3",
        titleKey: "shopLink.items.item3",
        image: "/images/earring-1.png",
        ratio: "1/1",
      },
      {
        id: "item-4",
        titleKey: "shopLink.items.item4",
        image: "/images/earring-2.png",
        ratio: "1/1",
      },
      {
        id: "item-5",
        titleKey: "shopLink.items.item5",
        image: "/images/earring-3.png",
        ratio: "1/1",
      },
      {
        id: "item-6",
        titleKey: "shopLink.items.item6",
        image: "/images/hero-ring.webp",
        ratio: "1/1",
      },
    ],
  } as ShopLinkConfig,
  nav: [
    { id: "how-it-works", labelKey: "nav.howItWorks", href: "#how-it-works" },
    { id: "catalogue", labelKey: "nav.catalogue", href: "#catalogue" },
    { id: "try-on", labelKey: "nav.tryOn", href: "#try-on" },
    { id: "pricing", labelKey: "nav.pricing", href: "#pricing" },
    { id: "faq", labelKey: "nav.faq", href: "#faq" },
  ] as NavItem[],
  cta: {
    primaryKey: "cta.bookDemo",
    secondaryKey: "cta.exploreCatalogue",
    href: "#demo",
  },
  numbersStrip: [
    { id: "photos", titleKey: "numbersStrip.item1.title", descKey: "numbersStrip.item1.desc" },
    { id: "phones", titleKey: "numbersStrip.item2.title", descKey: "numbersStrip.item2.desc" },
    { id: "no-app", titleKey: "numbersStrip.item3.title", descKey: "numbersStrip.item3.desc" },
    { id: "bilingual", titleKey: "numbersStrip.item4.title", descKey: "numbersStrip.item4.desc" },
  ],
  pricing: {
    showPriceNumber: true, // Flag: when false, shows "Ask us for pricing"
    priceAmount: 5000,
    currencySymbol: "₹",
    singleShop: {
      nameKey: "pricing.single.name",
      priceKey: "pricing.single.price",
      cadenceKey: "pricing.single.cadence",
      hiddenPriceKey: "pricing.single.hiddenPrice",
      descKey: "pricing.single.desc",
      featuresKeys: [
        "pricing.single.f1",
        "pricing.single.f2",
        "pricing.single.f3",
        "pricing.single.f4",
      ],
      ctaKey: "pricing.single.cta",
      ctaHref: "#demo",
    },
    multiShop: {
      nameKey: "pricing.multi.name",
      priceKey: "pricing.multi.price",
      descKey: "pricing.multi.desc",
      ctaKey: "pricing.multi.cta",
      ctaHref: "#demo",
    },
  },
  faq: [
    { id: "q1", questionKey: "faq.q1.q", answerKey: "faq.q1.a" },
    { id: "q2", questionKey: "faq.q2.q", answerKey: "faq.q2.a" },
    { id: "q3", questionKey: "faq.q3.q", answerKey: "faq.q3.a" },
    { id: "q4", questionKey: "faq.q4.q", answerKey: "faq.q4.a" },
    { id: "q5", questionKey: "faq.q5.q", answerKey: "faq.q5.a" },
    { id: "q6", questionKey: "faq.q6.q", answerKey: "faq.q6.a" },
    { id: "q7", questionKey: "faq.q7.q", answerKey: "faq.q7.a" },
    { id: "q8", questionKey: "faq.q8.q", answerKey: "faq.q8.a" },
    { id: "q9", questionKey: "faq.q9.q", answerKey: "faq.q9.a" },
    { id: "q10", questionKey: "faq.q10.q", answerKey: "faq.q10.a", isDynamicPrice: true },
  ],
  demoForm: {
    storeCountOptions: [
      { value: "1", labelKey: "demo.fields.stores.opt1" },
      { value: "2-5", labelKey: "demo.fields.stores.opt2" },
      { value: "6-10", labelKey: "demo.fields.stores.opt3" },
      { value: "10+", labelKey: "demo.fields.stores.opt4" },
    ],
  },
};
