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
  name: "Shringaar",
  domain: "shringaar.live",
  url: "https://shringaar.live",
  contact: {
    email: "namaste@shringaar.live",
    phone: "+91 98200 12345",
    whatsapp: "https://wa.me/919820012345?text=Hello%20Shringaar%20Team%2C%20I%20would%20like%20to%20know%20more.",
    address: "Mumbai & Jaipur, India",
  },
  hero: {
    image: {
      desktop: "/images/hero-ring.webp",
      mobile: "/images/hero-ring-mobile.webp",
      altKey: "hero.imageAlt",
      fallbackAlt: "Shringaar Fine Jewellery Solitaire Ring",
      aspectRatio: "1 / 1",
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
    sampleUrl: "yourshop.shringaar.live",
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
    sampleUrl: "yourshop.shringaar.live",
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
    href: "#book-demo",
  },
  pricing: [
    {
      id: "starter",
      nameKey: "pricing.starter.name",
      priceKey: "pricing.starter.price",
      cadenceKey: "pricing.starter.cadence",
      descriptionKey: "pricing.starter.desc",
      featuresKeys: [
        "pricing.starter.f1",
        "pricing.starter.f2",
        "pricing.starter.f3",
        "pricing.starter.f4",
      ],
    },
    {
      id: "growth",
      nameKey: "pricing.growth.name",
      priceKey: "pricing.growth.price",
      cadenceKey: "pricing.growth.cadence",
      descriptionKey: "pricing.growth.desc",
      recommended: true,
      featuresKeys: [
        "pricing.growth.f1",
        "pricing.growth.f2",
        "pricing.growth.f3",
        "pricing.growth.f4",
        "pricing.growth.f5",
      ],
    },
    {
      id: "atelier",
      nameKey: "pricing.atelier.name",
      priceKey: "pricing.atelier.price",
      cadenceKey: "pricing.atelier.cadence",
      descriptionKey: "pricing.atelier.desc",
      featuresKeys: [
        "pricing.atelier.f1",
        "pricing.atelier.f2",
        "pricing.atelier.f3",
        "pricing.atelier.f4",
        "pricing.atelier.f5",
      ],
    },
  ] as PricingPlan[],
};
