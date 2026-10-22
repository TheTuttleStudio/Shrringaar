"use client";

import React, { useState } from "react";
import type { StaticImageData } from "next/image";
import { useLang } from "./i18n";
import step1 from "./assets/step1-capture.jpg";
import before from "./assets/step2-before.jpg";
import after from "./assets/step2-after.jpg";
import grid from "./assets/step3-catalogue-grid.jpg";

function getSrc(img: string | StaticImageData): string {
  if (typeof img === "string") return img;
  return img?.src || "";
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`pointer-events-none absolute h-5 w-5 text-gold-soft sparkle ${className}`}>
      <path fill="currentColor" d="M12 0l2.2 9.8L24 12l-9.8 2.2L12 24l-2.2-9.8L0 12l9.8-2.2z" />
    </svg>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border bg-card shadow-soft">
      {children}
    </div>
  );
}

export function CaptureVisual({ offset = 0 }: { offset?: number }) {
  return (
    <Frame>
      <img
        src={getSrc(step1)}
        alt="A shop owner's hand photographing a gold temple necklace on a maroon velvet tray at the counter"
        loading="lazy"
        width={1024}
        height={1280}
        className="h-[115%] w-full object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
      <div className="absolute left-[58%] top-[42%] h-40 w-40 -translate-x-1/2 rounded-full bg-glow-gold opacity-50 mix-blend-screen" />
      <Sparkle className="left-[70%] top-[40%]" />
      <Sparkle className="left-[52%] top-[55%] [animation-delay:1.4s]" />
    </Frame>
  );
}

export function BeforeAfterVisual() {
  const { t } = useLang();
  const [pos, setPos] = useState(50);
  return (
    <Frame>
      <div className="relative h-full w-full select-none" style={{ touchAction: "pan-y" }}>
        <img
          src={getSrc(before)}
          alt="Original dim photo of gold jhumkas on a cluttered counter"
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={getSrc(after)}
          alt="Enhanced photo of the same jhumkas, bright on a clean cream background with true gold colour"
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <Sparkle className="right-[22%] top-[30%]" />
        <div className="pointer-events-none absolute inset-y-0 w-px bg-card" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-card font-mono text-xs text-gold shadow-soft">
            ⟷
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-primary/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">{t.before}</span>
        <span className="absolute right-4 top-4 rounded-full bg-card/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">{t.after}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t.drag}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </Frame>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[9/18.5] h-[88%] rounded-[2.4rem] border-[6px] border-primary bg-primary p-1 shadow-soft">
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-primary" />
      <div className="h-full w-full overflow-hidden rounded-[1.9rem] bg-background">{children}</div>
    </div>
  );
}

export function CatalogueVisual() {
  const { t } = useLang();
  const tiles = ["0% 0%", "100% 0%", "0% 100%", "100% 100%", "100% 0%", "0% 0%"];
  const gridSrc = getSrc(grid);
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border bg-section">
      <div className="absolute h-[70%] w-[70%] rounded-full bg-glow-gold opacity-70" />
      <Phone>
        <div className="flex h-full flex-col">
          <div className="border-b px-4 pb-3 pt-8 text-center">
            <p className="font-serif text-lg leading-tight text-foreground">{t.shopName}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gold">shrringaar.live/lakshmi</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-2 overflow-hidden p-3">
            {tiles.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-xl border bg-card">
                <div
                  role="img"
                  aria-label="Gold jewellery piece in the catalogue"
                  className="aspect-square w-full"
                  style={{ backgroundImage: `url(${gridSrc})`, backgroundSize: "200% 200%", backgroundPosition: p }}
                />
                <div className="space-y-1 p-2">
                  <div className="h-1.5 w-3/4 rounded-full bg-border" />
                  <div className="h-1.5 w-1/3 rounded-full bg-gold-soft" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Phone>
    </div>
  );
}

function QrSvg() {
  // Deterministic decorative QR pattern
  const n = 21;
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
      if (finder) continue;
      if ((x * 7 + y * 13 + x * y) % 3 === 0) cells.push([x, y]);
    }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={7} height={7} fill="currentColor" />
      <rect x={x + 1} y={y + 1} width={5} height={5} className="fill-card" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox="0 0 21 21" className="h-full w-full text-foreground" shapeRendering="crispEdges" aria-hidden>
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />)}
      <Finder x={0} y={0} />
      <Finder x={14} y={0} />
      <Finder x={0} y={14} />
    </svg>
  );
}

export function ShareVisual() {
  const { t } = useLang();
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-3xl border bg-section"
      role="img"
      aria-label="A QR code stand on the shop counter next to a WhatsApp message with the catalogue link"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 border-t bg-accent/60" />
      {/* QR stand */}
      <div className="absolute bottom-[22%] left-[10%] w-[42%]">
        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <p className="text-center font-serif text-base text-foreground">{t.shopName}</p>
          <div className="mx-auto my-3 aspect-square w-4/5 rounded-lg border border-gold-soft p-2"><QrSvg /></div>
          <p className="text-center font-mono text-[9px] uppercase tracking-widest text-gold">{t.scan}</p>
        </div>
        <div className="mx-auto h-3 w-1/2 rounded-b-xl bg-gold-soft" />
      </div>
      {/* WhatsApp chat */}
      <div className="absolute right-[7%] top-[14%] w-[46%] space-y-2">
        <div className="rounded-2xl rounded-tr-sm border bg-card p-3 text-xs text-foreground shadow-soft">
          <p>{t.waMsg}</p>
          <div className="mt-2 overflow-hidden rounded-lg border bg-background">
            <img src={getSrc(after)} alt="" loading="lazy" width={1024} height={1024} className="h-20 w-full object-cover" />
            <p className="px-2 py-1.5 font-mono text-[10px] text-accent-foreground">shrringaar.live/lakshmi</p>
          </div>
          <p className="mt-1 text-right font-mono text-[9px] text-muted-foreground">11:42 ✓✓</p>
        </div>
      </div>
      <Sparkle className="left-[48%] top-[20%]" />
    </div>
  );
}
