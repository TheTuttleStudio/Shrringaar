"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "ivory" | "dark" | "subtle" | "transparent";
  container?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  variant = "ivory",
  container = true,
  containerSize = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    ivory: "bg-[#FAF7F2] text-[#1C1714]",
    subtle: "bg-[#F5EFE6] text-[#1C1714]",
    dark: "bg-[#14110F] text-[#FAF7F2]",
    transparent: "bg-transparent",
  };

  const containerSizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-20 sm:py-28 md:py-36 transition-colors duration-300",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {container ? (
        <div
          className={cn(
            "mx-auto px-6 sm:px-8 lg:px-12 w-full",
            containerSizes[containerSize]
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
