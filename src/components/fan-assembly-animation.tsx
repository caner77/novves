"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const TOTAL_FRAMES = 211;

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(4, "0");
  return `/animation/frames/frame-${num}.jpg`;
}

type HeroDict = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroLabel?: string;
  stats: { value: string; label: string }[];
  endCard: {
    series: string;
    title: string;
    desc: string;
    spec1Value: string;
    spec1Label: string;
    spec2Value: string;
    spec2Label: string;
    spec3Value: string;
    spec3Label: string;
    cta: string;
    scroll: string;
  };
};

/* ═══════════════════════════════════════════════════════════
   Mobile Hero — editorial, serif + mono, sand palette
   ═══════════════════════════════════════════════════════════ */

function MobileHero({ dict, locale }: { dict: HeroDict; locale: string }) {
  return (
    <section className="relative bg-sand-200 pt-[80px] lg:hidden">
      {/* Top meta */}
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/55">
        <div className="flex items-center gap-3">
          <span className="text-primary">[ 01 ]</span>
          <span>— Hero</span>
        </div>
        <span className="truncate pl-3 text-ink/45">{dict.heroLabel ?? dict.endCard.series}</span>
      </div>

      {/* Hero copy */}
      <div className="px-5 pb-9 pt-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-primary" />
          <span className="font-mono-eng text-[10px] uppercase tracking-[0.28em] text-primary">
            {dict.badge}
          </span>
        </div>

        <h1 className="mt-6">
          <span className="block text-[17px] font-medium text-ink/55">{dict.titleLine1}</span>
          <span
            className="mt-2 block font-bold text-ink break-words"
            style={{ fontSize: "clamp(2.2rem, 10vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            {dict.titleLine2}
          </span>
          <span className="mt-2 block text-[19px] font-normal text-ink/75">{dict.titleLine3}</span>
        </h1>

        <p className="mt-6 text-[14.5px] leading-[1.65] text-ink/70">{dict.subtitle}</p>
      </div>

      {/* Featured product card */}
      <div className="px-5">
        <Link href={`/${locale}/urunler/hava-hareketi`} className="group block">
          <article className="relative overflow-hidden border border-ink/12 bg-white">
            {/* Corner marks */}
            <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-ink/35 z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-ink/35 z-20" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ink/35 z-20" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-ink/35 z-20" />

            <div className="relative aspect-[5/4] w-full bg-sand-200">
              {/* Series badge */}
              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 bg-ink/85 px-2.5 py-1 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-sand-100 backdrop-blur-sm">
                <span className="text-primary">◆</span> {dict.endCard.series}
              </div>
              <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 border border-ink/15 bg-white/90 px-2.5 py-1 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-ink/65 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {dict.endCard.spec3Value}
              </div>

              <Image
                src="/animation/frames/frame-0211.jpg"
                alt={dict.endCard.title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{ objectPosition: "60% center", filter: "contrast(1.05) saturate(1.08)" }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/95 via-white/60 to-transparent" />

              {/* Title overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/55">
                  Featured Product
                </p>
                <h3 className="mt-1 font-bold text-ink" style={{ fontSize: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.015em" }}>
                  {dict.endCard.title}
                </h3>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10">
              {[
                { v: dict.endCard.spec1Value, l: dict.endCard.spec1Label },
                { v: dict.endCard.spec2Value, l: dict.endCard.spec2Label },
                { v: dict.endCard.spec3Value, l: dict.endCard.spec3Label },
              ].map((s) => (
                <div key={s.l} className="px-3 py-3.5 text-center">
                  <p className="font-bold text-[1.05rem] leading-none text-ink">{s.v}</p>
                  <p className="mt-1.5 font-mono-eng text-[8.5px] uppercase tracking-[0.18em] text-ink/55 truncate">{s.l}</p>
                </div>
              ))}
            </div>

            {/* CTA bar */}
            <div className="flex items-center justify-between border-t border-ink/10 bg-sand-100 px-4 py-3.5">
              <span className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/65">
                {dict.endCard.cta}
              </span>
              <svg className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </article>
        </Link>
      </div>

      {/* Main CTAs */}
      <div className="mt-8 px-5">
        <div className="flex flex-col gap-3">
          <Link
            href={`/${locale}/iletisim`}
            className="group inline-flex w-full items-center justify-between bg-ink px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 transition-all duration-300 hover:bg-primary"
          >
            <span>{dict.ctaPrimary}</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/urunler/hava-hareketi`}
            className="group inline-flex w-full items-center justify-between border border-ink/15 px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/75 transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <span>{dict.ctaSecondary}</span>
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-10 border-y border-ink/12 bg-sand-100">
        <div className="grid grid-cols-2 divide-x divide-ink/10">
          {dict.stats.map((s, i) => (
            <div key={s.label} className={`px-5 py-6 ${i >= 2 ? "border-t border-ink/10" : ""}`}>
              <p className="font-bold text-[2rem] leading-none text-ink">{s.value}</p>
              <p className="mt-2 font-mono-eng text-[9px] uppercase tracking-[0.22em] text-ink/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Desktop Hero — sticky scroll-driven fan assembly
   ═══════════════════════════════════════════════════════════ */

export function FanAssemblyAnimation({ dict, locale }: { dict: HeroDict; locale: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const preloadImages = useCallback(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      images.push(img);
    }
    imagesRef.current = images;
    return images;
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const images = preloadImages();
    const first = images[0];
    if (first.complete) renderFrame(0);
    else first.onload = () => renderFrame(0);

    function onScroll() {
      rafRef.current = requestAnimationFrame(() => {
        const sectionEl = document.getElementById("hero-sticky-section");
        if (!sectionEl) return;
        const rect = sectionEl.getBoundingClientRect();
        const viewH = window.innerHeight;
        const scrolled = -rect.top;
        const scrollRange = sectionEl.offsetHeight - viewH;
        const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

        const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        if (overlayRef.current) {
          const fade = Math.max(1 - progress * 2.2, 0);
          overlayRef.current.style.opacity = String(fade);
          overlayRef.current.style.transform = `translateY(-${progress * 40}px)`;
        }
        if (panelRef.current) {
          // Right text panel slides fully off-screen by progress 0.85
          const slideOut = Math.min(Math.max((progress - 0.55) / 0.3, 0), 1);
          panelRef.current.style.transform = `translateX(${slideOut * 105}%)`;
        }
        if (statsRef.current) {
          const fade = Math.max(1 - progress * 3.5, 0);
          statsRef.current.style.opacity = String(fade);
        }
        if (scrollHintRef.current) {
          const fade = Math.max(1 - progress * 5, 0);
          scrollHintRef.current.style.opacity = String(fade);
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleY(${progress})`;
        }
        if (endCardRef.current) {
          const endFade = Math.max((progress - 0.72) * 4, 0);
          endCardRef.current.style.opacity = String(Math.min(endFade, 1));
          endCardRef.current.style.transform = `translateX(${Math.max(30 - endFade * 30, 0)}px)`;
        }
        if (canvasRef.current) {
          // Fan: starts visible on LEFT (objectPosition 70%), ends visible on RIGHT (15%)
          const shift = Math.min(Math.max((progress - 0.55) * 2.2, 0), 1);
          const xPct = 70 - shift * 55; // 70 → 15
          canvasRef.current.style.objectPosition = `${xPct}% center`;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [preloadImages, renderFrame]);

  return (
    <>
      <MobileHero dict={dict} locale={locale} />

      {/* Desktop sticky container wraps around the canvas; outer spacer elsewhere governs scroll range */}
      <div id="hero-sticky-section" className="hidden lg:block" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-sand-200">
          {/* ── TWO-COLUMN GRID: LEFT = CONTENT, RIGHT = FAN ── */}

          {/* Fan canvas — full width; objectPosition animates left→right on scroll */}
          <div ref={canvasWrapRef} className="absolute top-[84px] bottom-0 inset-x-0 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "70% center" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,transparent_28%,rgba(234,228,211,0.32)_88%)]" />
          </div>

          {/* RIGHT — Solid content panel (fades on scroll) */}
          <div ref={panelRef} className="absolute top-[84px] bottom-0 right-0 w-[42%] bg-sand-200 z-10 will-change-transform">
            <div className="absolute inset-0 blueprint-grid-light opacity-60 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-px bg-ink/10" />
            {/* Soft left fade into canvas area */}
            <div className="pointer-events-none absolute inset-y-0 -left-24 w-24 bg-gradient-to-r from-transparent to-sand-200" />
          </div>

          {/* Top hairline bar with section number (spans full width) */}
          <div className="pointer-events-none absolute inset-x-0 top-[84px] z-30 flex items-center justify-between border-b border-ink/10 bg-sand-200/70 px-8 py-3 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/60 backdrop-blur-sm xl:px-16">
            <div className="flex items-center gap-5">
              <span className="text-primary">[ 01 ]</span>
              <span>— Hero · Hava Hareketi</span>
            </div>
            <div className="flex items-center gap-5">
              <span>{dict.heroLabel ?? dict.endCard.series}</span>
              <span className="text-ink/35">|</span>
              <span className="text-ink/50">EN 12101-3 · F400/2H</span>
            </div>
          </div>

          {/* Hero content — positioned inside RIGHT panel */}
          <div ref={overlayRef} className="absolute top-[130px] bottom-[170px] right-0 w-[42%] z-20 flex items-center">
            <div className="w-full pr-8 pl-10 xl:pr-16 xl:pl-14">
              {/* Eyebrow */}
              <p className="font-mono-eng text-[11px] uppercase tracking-[0.3em] text-primary">
                ● {dict.badge}
              </p>

              {/* Display title */}
              <h1 className="mt-7">
                <span className="block font-light text-ink/70" style={{ fontSize: "clamp(1.3rem, 1.6vw, 1.8rem)", letterSpacing: "-0.01em" }}>
                  {dict.titleLine1}
                </span>
                <span
                  className="mt-1 block font-bold text-ink break-words"
                  style={{
                    fontSize: "clamp(2.6rem, 4.4vw, 5.6rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {dict.titleLine2}
                </span>
                <span className="mt-1 block font-normal text-ink/85" style={{ fontSize: "clamp(1.4rem, 1.8vw, 2rem)", letterSpacing: "-0.015em" }}>
                  {dict.titleLine3}
                </span>
              </h1>

              <p className="mt-7 max-w-[42ch] text-[15px] leading-[1.7] text-ink/78">
                {dict.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href={`/${locale}/iletisim`}
                  className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:bg-primary"
                >
                  <span>{dict.ctaPrimary}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/urunler/hava-hareketi`}
                  className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ink/80 transition-colors hover:text-primary"
                >
                  <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-primary">{dict.ctaSecondary}</span>
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats row — full width bottom strip */}
          <div ref={statsRef} className="absolute bottom-0 left-0 right-0 z-20 bg-sand-100 border-t border-ink/15">
            <div className="grid grid-cols-4 divide-x divide-ink/10">
              {dict.stats.map((s) => (
                <div key={s.label} className="px-6 py-5 xl:px-10">
                  <p className="font-bold text-[2.2rem] leading-none text-ink">{s.value}</p>
                  <p className="mt-2 font-mono-eng text-[9.5px] uppercase tracking-[0.22em] text-ink/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* End-card — appears on scroll over the fan area */}
          <div ref={endCardRef} className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center" style={{ opacity: 0 }}>
            <div className="pointer-events-auto ml-6 w-[min(440px,32vw)] xl:ml-14">
              <div className="relative border border-ink/15 bg-sand-100 p-9 shadow-[0_40px_120px_-30px_rgba(10,14,20,0.35)] corner-mark text-ink">
                <div className="absolute inset-0 blueprint-grid-light opacity-60 pointer-events-none" />

                <div className="relative">
                  <p className="font-mono-eng text-[10px] uppercase tracking-[0.24em] text-primary">
                    ◆ {dict.endCard.series}
                  </p>

                  <h2 className="mt-6 font-bold text-ink" style={{ fontSize: "clamp(2.2rem, 3vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                    {dict.endCard.title}
                  </h2>

                  <p className="mt-5 max-w-[40ch] text-[13.5px] leading-[1.7] text-ink/72">
                    {dict.endCard.desc}
                  </p>

                  <div className="mt-7 grid grid-cols-3 border-y border-ink/12 divide-x divide-ink/10">
                    {[
                      { v: dict.endCard.spec1Value, l: dict.endCard.spec1Label },
                      { v: dict.endCard.spec2Value, l: dict.endCard.spec2Label },
                      { v: dict.endCard.spec3Value, l: dict.endCard.spec3Label },
                    ].map((s) => (
                      <div key={s.l} className="py-4 pl-4 first:pl-0">
                        <p className="font-bold text-[1.6rem] leading-none text-ink">{s.v}</p>
                        <p className="mt-1.5 font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/55">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/urunler/hava-hareketi`}
                    className="group mt-7 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 transition-all duration-300 hover:bg-primary"
                  >
                    {dict.endCard.cta}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — vertical progress bar with label */}
          <div className="absolute right-5 top-[18%] bottom-[18%] z-15 flex items-center pointer-events-none xl:right-8">
            <span
              className="absolute -left-14 top-1/2 font-mono-eng text-[10px] uppercase tracking-[0.3em] text-ink/40"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
            >
              Scroll · Discover
            </span>
            <div className="relative h-full" style={{ width: "1px" }}>
              <div className="h-full w-full bg-ink/15" />
              <div ref={progressBarRef} className="absolute inset-0 origin-top bg-primary" style={{ transform: "scaleY(0)" }} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
