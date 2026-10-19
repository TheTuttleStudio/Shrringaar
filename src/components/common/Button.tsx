"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      href,
      isExternal,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8975A] disabled:opacity-50 disabled:pointer-events-none select-none";

    const sizeStyles = {
      sm: "text-xs px-4 py-2 rounded-full font-medium gap-1.5",
      md: "text-sm px-6 py-2.5 rounded-full font-medium gap-2",
      lg: "text-base px-8 py-3.5 rounded-full font-medium gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#1C1714] text-[#FAF7F2] border border-[#1C1714] hover:bg-[#2C2420] hover:border-[#2C2420] shadow-[0_2px_8px_rgba(28,23,20,0.08)] active:scale-[0.99]",
      secondary:
        "bg-transparent text-[#1C1714] border border-[#B8975A]/40 hover:border-[#B8975A] hover:bg-[#B8975A]/5 active:scale-[0.99]",
      outline:
        "bg-[#FAF7F2] text-[#1C1714] border border-[#E8E0D5] hover:border-[#B8975A] hover:bg-[#FFFDFB] active:scale-[0.99]",
      ghost:
        "bg-transparent text-[#1C1714] hover:text-[#B8975A] hover:bg-[#B8975A]/5",
      dark:
        "bg-[#FAF7F2] text-[#1C1714] border border-[#FAF7F2] hover:bg-[#EAE3D9] hover:border-[#EAE3D9] active:scale-[0.99]",
    };

    const combinedClasses = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
