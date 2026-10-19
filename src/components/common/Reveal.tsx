"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  width?: "fit-content" | "100%";
  mode?: "scroll" | "mount";
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 20,
  className,
  width = "100%",
  mode = "scroll",
}: RevealProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // SSR or before client mount: render clean HTML
  if (!mounted) {
    return (
      <div className={cn("w-full", className)} style={{ width }}>
        {children}
      </div>
    );
  }

  // Respect prefers-reduced-motion
  if (reducedMotion) {
    return (
      <div className={cn("w-full", className)} style={{ width }}>
        {children}
      </div>
    );
  }

  if (mode === "mount") {
    return (
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={cn("w-full", className)}
        style={{ width }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn("w-full", className)}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
