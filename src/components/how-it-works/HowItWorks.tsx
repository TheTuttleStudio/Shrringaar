"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLang } from "./i18n";
import { BeforeAfterVisual, CaptureVisual, CatalogueVisual, ShareVisual } from "./visuals";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const h = () => setR(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return r;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setV(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={v}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const visuals = [
  (o: number) => <CaptureVisual offset={o} />,
  () => <BeforeAfterVisual />,
  () => <CatalogueVisual />,
  () => <ShareVisual />,
];

export function HowItWorks() {
  const { t, lang } = useLang();
  const isHindi = lang === "hi";
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const stepsRef = useRef<HTMLOListElement>(null);
  const stepEls = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const list = stepsRef.current;
      if (!list) return;
      const mid = window.innerHeight * 0.5;
      const r = list.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
      let idx = 0;
      stepEls.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < mid) idx = i;
      });
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const parallax = reduced ? 0 : -progress * 40;

  const serifHeadingFont = isHindi
    ? "font-[family-name:var(--font-tiro-hindi)]"
    : "font-[family-name:var(--font-cormorant)]";

  return (
    <section id="how-it-works" className="bg-section py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-gold-soft bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-foreground">
            {t.pill}
          </span>
          <h2 className={`mt-5 text-4xl text-foreground sm:text-5xl ${serifHeadingFont}`}>
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* Steps */}
          <ol ref={stepsRef} className="relative space-y-10 lg:space-y-0">
            <div
              aria-hidden
              className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-border lg:block"
            />
            <div
              aria-hidden
              className="absolute left-[19px] top-0 hidden w-px origin-top bg-gold lg:block"
              style={{ height: `${progress * 100}%` }}
            />
            {t.steps.map((s, i) => {
              const on = active === i;
              return (
                <li
                  key={i}
                  ref={(el) => {
                    stepEls.current[i] = el;
                  }}
                  className="relative lg:flex lg:min-h-[70vh] lg:items-center"
                >
                  <Reveal className="w-full">
                    <div className="mb-6 aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:hidden">
                      {visuals[i]?.(0)}
                    </div>
                    <div className="flex gap-5">
                      <span
                        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-card font-mono text-xs transition-colors duration-500 ${
                          on ? "border-gold text-gold" : "text-muted-foreground"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className={`min-w-0 transition-opacity duration-500 ${
                          on ? "lg:opacity-100" : "lg:opacity-45"
                        }`}
                      >
                        <h3 className={`text-3xl text-foreground ${serifHeadingFont}`}>
                          {s.title}
                        </h3>
                        <p className="mt-2 max-w-sm text-muted-foreground">{s.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-280px)] h-[560px]">
              {visuals.map((v, i) => (
                <div
                  key={i}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    active === i
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none translate-y-6 scale-[0.98] opacity-0"
                  }`}
                >
                  {v(parallax)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-20 flex flex-col items-center gap-3 text-center">
          <a
            href="#demo"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.bookDemo}
          </a>
          <p className={`text-lg italic text-muted-foreground ${serifHeadingFont}`}>
            {t.setup}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
