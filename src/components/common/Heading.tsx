"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/useT";

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  badge?: string;
  children?: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  subtitleClassName?: string;
  dark?: boolean;
}

export function Heading({
  level = 2,
  as,
  badge,
  children,
  subtitle,
  align = "left",
  className,
  subtitleClassName,
  dark = false,
}: HeadingProps) {
  const { isHindi } = useT();
  const Component = as || (`h${level}` as const);

  const levelStyles = {
    1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.12]",
    2: "text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.18]",
    3: "text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.25]",
    4: "text-xl sm:text-2xl font-normal leading-[1.3]",
    5: "text-lg sm:text-xl font-medium leading-[1.35]",
    6: "text-base sm:text-lg font-medium leading-[1.4]",
  };

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const fontFamily = isHindi ? "font-[family-name:var(--font-tiro-hindi)]" : "font-[family-name:var(--font-cormorant)]";

  return (
    <div className={cn("flex flex-col", alignStyles[align])}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-4">
          <span
            className={cn(
              "text-xs tracking-widest uppercase px-3 py-1 rounded-full font-sans transition-colors duration-200",
              dark
                ? "bg-white/5 text-[#D4BD8B] border border-white/10"
                : "bg-[#B8975A]/10 text-[#91723A] border border-[#B8975A]/25"
            )}
          >
            {badge}
          </span>
        </div>
      )}

      <Component
        className={cn(
          fontFamily,
          levelStyles[level],
          dark ? "text-[#FAF7F2]" : "text-[#1C1714]",
          className
        )}
      >
        {children}
      </Component>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg font-sans font-light max-w-2xl leading-relaxed",
            dark ? "text-[#E0D8D0]/80" : "text-[#5C534D]",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
