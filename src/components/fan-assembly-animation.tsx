"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   Fan Assembly Hero — Luxury Industrial

   Left: scroll-driven video sequence (fan → housing)
   Right: refined typography overlay that fades on scroll
   Bottom: stats strip with staggered reveal
   ═══════════════════════════════════════════════════════════ */

const TOTAL_FRAMES = 250;

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

export function FanAssemblyAnimation({
  dict,
  locale,
}: {
  dict: HeroDict;
  locale: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const preloadImages = useCallback(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
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
    if (!mounted) return;

    const images = preloadImages();
    images[0].onload = () => renderFrame(0);

    function onScroll() {
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewH = window.innerHeight;
        const progress = Math.min(Math.max(scrollY / viewH, 0), 1);

        /* Frame sequence */
        const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        /* Overlay fade — text disappears in first 40% of scroll */
        const textFade = Math.max(1 - progress * 2.5, 0);
        const textShift = progress * 60; // px upward
        if (overlayRef.current) {
          overlayRef.current.style.opacity = String(textFade);
          overlayRef.current.style.transform = `translateY(-${textShift}px)`;
        }

        /* Stats fade — disappears slightly later */
        const statsFade = Math.max(1 - progress * 2, 0);
        if (statsRef.current) {
          statsRef.current.style.opacity = String(statsFade);
        }

        /* Scroll hint — hemen kaybolur */
        if (scrollHintRef.current) {
          scrollHintRef.current.style.opacity = String(Math.max(1 - progress * 8, 0));
        }

        /* End card — animasyon %80+ tamamlandığında soldan fade-in */
        const endFade = Math.max((progress - 0.75) * 4, 0); // 0.75-1.0 arası 0→1
        const endShift = Math.max(30 - endFade * 30, 0); // 30px soldan → 0
        if (endCardRef.current) {
          endCardRef.current.style.opacity = String(Math.min(endFade, 1));
          endCardRef.current.style.transform = `translateX(-${endShift}px)`;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, preloadImages, renderFrame]);

  return (
    <div className="sticky top-0 h-screen w-full bg-black" style={{ zIndex: 0 }}>
      {/* ── Video canvas ── */}
      <div className="absolute inset-0 top-[85px] overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "60% center" }}
        />
      </div>

      {/* ── Right side overlay — typography + CTA ── */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 top-[85px] flex items-center justify-end overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <div className="pointer-events-auto mr-[8vw] max-w-[600px] pr-4 lg:mr-[12vw]" style={{ marginTop: "-8vh" }}>
          {/* Accent line */}
          <div className="mb-10 flex items-center gap-5">
            <div className="h-px w-16 bg-primary/70" />
            <span className="text-[11px] font-light uppercase tracking-[0.35em] text-white/35">
              {dict.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="leading-[1.05]">
            <span
              className="block font-extralight uppercase tracking-[0.02em] text-white/90"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)" }}
            >
              {dict.titleLine1}
            </span>
            <span
              className="mt-1 block font-bold uppercase tracking-[-0.01em] text-white"
              style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
            >
              {dict.titleLine2}
            </span>
            <span
              className="mt-1 block font-extralight uppercase tracking-[0.02em] text-primary/80"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)" }}
            >
              {dict.titleLine3}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-7 max-w-md text-[14px] font-light leading-relaxed text-white/30">
            {dict.subtitle}
          </p>

          {/* CTA */}
          <div className="mt-12 flex items-center gap-6">
            <Link
              href={`/${locale}/iletisim`}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/[0.15] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-500 hover:border-primary/40 hover:text-white"
            >
              <span className="relative z-10">{dict.ctaPrimary}</span>
              <svg
                className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <span className="absolute inset-0 -translate-x-full bg-primary/10 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>

            <Link
              href={`/${locale}/urunler/hava-hareketi`}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/25 transition-colors duration-300 hover:text-white/60"
            >
              {dict.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* ── End card — animasyon bittikten sonra solda beliren ürün bilgisi ── */}
      <div
        ref={endCardRef}
        className="pointer-events-none absolute left-0 top-[85px] bottom-0 flex items-center"
        style={{ zIndex: 10, opacity: 0 }}
      >
        <div className="pointer-events-auto ml-[6vw] max-w-[500px] lg:ml-[8vw]">
          {/* Accent */}
          <div className="mb-8 flex items-center gap-5">
            <div className="h-[2px] w-14 bg-primary" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-primary">{dict.endCard.series}</span>
          </div>

          <h2 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.endCard.title}
          </h2>

          <p className="mt-6 max-w-md text-[15px] font-light leading-[1.8] text-white/50">
            {dict.endCard.desc}
          </p>

          <div className="mt-10 flex gap-0">
            <div className="pr-8">
              <p className="text-2xl font-bold text-white">{dict.endCard.spec1Value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{dict.endCard.spec1Label}</p>
            </div>
            <div className="border-l border-white/[0.12] px-8">
              <p className="text-2xl font-bold text-white">{dict.endCard.spec2Value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{dict.endCard.spec2Label}</p>
            </div>
            <div className="border-l border-white/[0.12] pl-8">
              <p className="text-2xl font-bold text-white">{dict.endCard.spec3Value}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">{dict.endCard.spec3Label}</p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href={`/${locale}/urunler/hava-hareketi`}
              className="group inline-flex items-center gap-3 rounded-full border border-primary/30 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary transition-all duration-400 hover:border-primary hover:bg-primary/10 hover:text-white"
            >
              {dict.endCard.cta}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll hint — mouse aşağı kaydır ── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 15 }}
      >
        {/* Mouse outline */}
        <div className="relative h-10 w-6 rounded-full border-2 border-white/20">
          <div className="absolute left-1/2 top-2 h-2 w-0.5 -translate-x-1/2 animate-[scrollDot_1.8s_ease-in-out_infinite] rounded-full bg-white/60" />
        </div>
        <span className="text-[9px] font-light uppercase tracking-[0.3em] text-white/20">{dict.endCard.scroll}</span>

        <style>{`
          @keyframes scrollDot {
            0% { opacity: 1; transform: translateX(-50%) translateY(0); }
            50% { opacity: 0.3; transform: translateX(-50%) translateY(12px); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}</style>
      </div>

      {/* ── Bottom stats strip ── */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0"
        style={{ zIndex: 10 }}
      >
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto flex max-w-6xl items-stretch px-4">
            {dict.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-1 flex-col items-center justify-center py-6 ${
                  i < dict.stats.length - 1 ? "border-r border-white/[0.06]" : ""
                }`}
              >
                <span className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/55">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
