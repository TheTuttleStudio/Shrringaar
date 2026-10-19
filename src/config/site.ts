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
