"use client";

import React, { useState } from "react";
import { useT } from "@/hooks/useT";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/common/Section";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/common/Button";
import { demoFormSchema, type DemoFormData } from "@/lib/validations/demo";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  shopName?: string;
  city?: string;
  whatsapp?: string;
  storeCount?: string;
  generic?: string;
}

export function DemoFormSection() {
  const { t, isHindi } = useT();

  const [formData, setFormData] = useState<Partial<DemoFormData>>({
    name: "",
    shopName: "",
    city: "",
    whatsapp: "",
    storeCount: "1",
    message: "",
    website_url: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, generic: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validate with shared Zod schema
    const parseResult = demoFormSchema.safeParse(formData);

    if (!parseResult.success) {
      const newErrors: FormErrors = {};
      for (const issue of parseResult.error.issues) {
        const fieldName = issue.path[0] as keyof FormErrors;
        if (fieldName) {
          // Resolve translation key for error
          newErrors[fieldName] = t(`demo.${issue.message}`);
        }
      }
      setErrors(newErrors);

      // Focus the first invalid field
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`field-${firstErrorField}`);
        element?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseResult.data),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedName(parseResult.data.name);
        setIsSuccess(true);
      } else {
        setErrors({
          generic: t("demo.errors.generic"),
        });
      }
    } catch {
      setErrors({
        generic: t("demo.errors.generic"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="demo" variant="ivory" className="py-20 sm:py-28">
      {/* Anchor for backward compatibility if any legacy link points to #book-demo */}
      <span id="book-demo" className="relative -top-24 block invisible" aria-hidden="true" />

      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <Heading
              level={2}
              align="center"
              subtitle={t("demo.subtitle")}
            >
              {t("demo.title")}
            </Heading>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-[#FFFDFB] rounded-2xl border border-[#E8E0D5] p-6 sm:p-10 shadow-[0_8px_30px_rgba(28,23,20,0.03)]">
            {isSuccess ? (
              <div
                className="py-8 text-center space-y-4"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF3E6] text-[#B8975A]">
                  <CheckCircle2 className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h3
                  className={cn(
                    "text-2xl sm:text-3xl font-light text-[#1C1714]",
                    isHindi
                      ? "font-[family-name:var(--font-tiro-hindi)] font-normal"
                      : "font-[family-name:var(--font-cormorant)] text-3xl font-medium"
                  )}
                >
                  {t("demo.successTitle").replace("{name}", submittedName)}
                </h3>
                <p className="text-sm sm:text-base font-sans font-light text-[#5C534D] max-w-md mx-auto leading-relaxed">
                  {t("demo.successMessage")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {errors.generic && (
                  <div
                    className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5"
                    role="alert"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                    <span>{errors.generic}</span>
                  </div>
                )}

                {/* Offscreen Honeypot Field */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] opacity-0 pointer-events-none"
                  tabIndex={-1}
                >
                  <label htmlFor="field-website_url">Website</label>
                  <input
                    type="text"
                    id="field-website_url"
                    name="website_url"
                    value={formData.website_url || ""}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {/* Name & Shop Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="field-name"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-[#5C534D]"
                    >
                      {t("demo.fields.name")} <span className="text-[#B8975A]">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-name"
                      name="name"
                      required
                      value={formData.name || ""}
                      onChange={handleChange}
                      placeholder={t("demo.fields.namePlaceholder")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "error-name" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-[#FAF7F2]/40 text-sm font-sans text-[#1C1714] placeholder:text-[#A89F97] focus:outline-none focus:ring-2 focus:ring-[#B8975A] focus:border-transparent transition-all",
                        errors.name ? "border-red-400 bg-red-50/20" : "border-[#E8E0D5]"
                      )}
                    />
                    {errors.name && (
                      <p id="error-name" className="text-xs text-red-600 pt-0.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="field-shopName"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-[#5C534D]"
                    >
                      {t("demo.fields.shopName")} <span className="text-[#B8975A]">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-shopName"
                      name="shopName"
                      required
                      value={formData.shopName || ""}
                      onChange={handleChange}
                      placeholder={t("demo.fields.shopNamePlaceholder")}
                      aria-invalid={Boolean(errors.shopName)}
                      aria-describedby={errors.shopName ? "error-shopName" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-[#FAF7F2]/40 text-sm font-sans text-[#1C1714] placeholder:text-[#A89F97] focus:outline-none focus:ring-2 focus:ring-[#B8975A] focus:border-transparent transition-all",
                        errors.shopName ? "border-red-400 bg-red-50/20" : "border-[#E8E0D5]"
                      )}
                    />
                    {errors.shopName && (
                      <p id="error-shopName" className="text-xs text-red-600 pt-0.5">
                        {errors.shopName}
                      </p>
                    )}
                  </div>
                </div>

                {/* City & WhatsApp row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="field-city"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-[#5C534D]"
                    >
                      {t("demo.fields.city")} <span className="text-[#B8975A]">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-city"
                      name="city"
                      required
                      value={formData.city || ""}
                      onChange={handleChange}
                      placeholder={t("demo.fields.cityPlaceholder")}
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? "error-city" : undefined}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-[#FAF7F2]/40 text-sm font-sans text-[#1C1714] placeholder:text-[#A89F97] focus:outline-none focus:ring-2 focus:ring-[#B8975A] focus:border-transparent transition-all",
                        errors.city ? "border-red-400 bg-red-50/20" : "border-[#E8E0D5]"
                      )}
                    />
                    {errors.city && (
                      <p id="error-city" className="text-xs text-red-600 pt-0.5">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="field-whatsapp"
                      className="block text-xs font-sans font-medium uppercase tracking-wider text-[#5C534D]"
                    >
                      {t("demo.fields.whatsapp")} <span className="text-[#B8975A]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-medium text-[#8A7F77] border-r border-[#E8E0D5] pr-2.5 my-2">
                        +91
                      </div>
                      <input
                        type="tel"
                        id="field-whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp || ""}
                        onChange={handleChange}
                        placeholder={t("demo.fields.whatsappPlaceholder")}
                        aria-invalid={Boolean(errors.whatsapp)}
                        aria-describedby={errors.whatsapp ? "error-whatsapp" : undefined}
                        className={cn(
                          "w-full pl-16 pr-4 py-3 rounded-lg border bg-[#FAF7F2]/40 text-sm font-sans text-[#1C1714] placeholder:text-[#A89F97] focus:outline-none focus:ring-2 focus:ring-[#B8975A] focus:border-transparent transition-all",
                          errors.whatsapp ? "border-red-400 bg-red-50/20" : "border-[#E8E0D5]"
                        )}
                      />
                    </div>
                    {errors.whatsapp && (
                      <p id="error-whatsapp" className="text-xs text-red-600 pt-0.5">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                {/* Number of Stores Select */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-storeCount"
                    className="block text-xs font-sans font-medium uppercase tracking-wider text-[#5C534D]"
                  >
                    {t("demo.fields.stores.label")} <span className="text-[#B8975A]">*</span>
                  </label>
                  <select
                    id="field-storeCount"
                    name="storeCount"
                    value={formData.storeCount || "1"}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E0D5] bg-[#FAF7F2]/40 text-sm font-sans text-[#1C1714] focus:outline-none focus:ring-2 focus:ring-[#B8975A] focus:border-transparent transition-all"
                  >
                    {siteConfig.demoForm.storeCountOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="field-message"
                    className="block text-xs font-sans font-medium uppercase tracking-wider text-[#5C534D]"
                  >
                    {t("demo.fields.message")}
                  </label>
                  <textarea
                    id="field-message"
                    name="message"
                    rows={3}
                    value={formData.message || ""}
                    onChange={handleChange}
                    placeholder={t("demo.fields.messagePlaceholder")}
                    className="w-full px-4 py-3 rounded-lg border border-[#E8E0D5] bg-[#FAF7F2]/40 text-sm font-sans text-[#1C1714] placeholder:text-[#A89F97] focus:outline-none focus:ring-2 focus:ring-[#B8975A] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit button & Privacy assurance */}
                <div className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full text-center py-3.5"
                  >
                    {isSubmitting ? t("demo.submitting") : t("demo.submit")}
                  </Button>

                  <p className="text-center text-xs font-sans text-[#8A7F77]">
                    {t("demo.privacy")}
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
