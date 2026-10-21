import { z } from "zod";

/**
 * Standard Indian mobile number cleaner & validator.
 * Accepts 10 digits starting with 6-9, with or without +91 or leading 0, and optional spaces/dashes.
 */
export function cleanIndianMobile(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");
  // If starts with 91 and has 12 digits, strip country code
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }
  // If starts with 0 and has 11 digits, strip leading 0
  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidIndianMobile(value: string): boolean {
  const digits = cleanIndianMobile(value);
  return digits.length === 10 && /^[6-9]/.test(digits);
}

export const demoFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "errors.name" })
    .max(80, { message: "errors.nameMax" }),
  shopName: z
    .string()
    .trim()
    .min(2, { message: "errors.shopName" })
    .max(100, { message: "errors.shopNameMax" }),
  city: z
    .string()
    .trim()
    .min(2, { message: "errors.city" })
    .max(60, { message: "errors.cityMax" }),
  whatsapp: z
    .string()
    .trim()
    .refine((val) => isValidIndianMobile(val), {
      message: "errors.whatsapp",
    }),
  storeCount: z
    .enum(["1", "2-5", "6-10", "10+"], {
      message: "errors.storeCount",
    }),
  message: z
    .string()
    .trim()
    .max(1000, { message: "errors.messageMax" })
    .optional()
    .default(""),
  // Honeypot field (must be empty)
  website_url: z.string().optional().default(""),
});


export type DemoFormData = z.infer<typeof demoFormSchema>;
