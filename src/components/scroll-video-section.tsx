"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   Scroll Video Section — Reusable scroll-driven frame animation

   Heroya benzer mantık: sticky canvas, scroll ile frame ilerler.
   Başta solda yazılar fade-in, sonda sağda ürün kartı çıkar.
   ═══════════════════════════════════════════════════════════ */

type StartCard = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
};

type EndCard = {
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
};

export function ScrollVideoSection({
  framesPath,
  totalFrames,
  id,
  startCard,
  endCard,
  locale,
  productHref,
}: {
  framesPath: string;
  totalFrames: number;
  id: string;
  startCard?: StartCard;
  endCard?: EndCard;
  locale?: string;
  productHref?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startCardRef = useRef<HTMLDivElement>(null);
  const endCardRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const preloadImages = useCallback(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const num = String(i).padStart(4, "0");
      img.src = `${framesPath}/frame-${num}.jpg`;
      images.push(img);
    }
    imagesRef.current = images;
    return images;
  }, [framesPath, totalFrames]);

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
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewH = window.innerHeight;

        const scrolled = -rect.top;
        const scrollRange = container.offsetHeight - viewH;
        const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

        const frameIndex = Math.round(progress * (totalFrames - 1));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }

        /* Start card — sol taraf: ilk %40'ta görünür, sonra solar */
        if (startCardRef.current) {
          const startFade = Math.max(1 - progress * 2.5, 0);
          const startShift = progress * 60;
          startCardRef.current.style.opacity = String(startFade);
          startCardRef.current.style.transform = `translateY(-${startShift}px)`;
        }

        /* End card — sağ taraf: %75+ tamamlandığında sağdan fade-in */
        if (endCardRef.current) {
          const endFade = Math.max((progress - 0.75) * 4, 0);
          const endShift = Math.max(30 - endFade * 30, 0);
          endCardRef.current.style.opacity = String(Math.min(endFade, 1));
          endCardRef.current.style.transform = `translateX(${endShift}px)`;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, preloadImages, renderFrame, totalFrames]);

  return (
    <div ref={containerRef} id={id} className="relative h-[300vh] bg-black">
      {/* Sticky canvas — container scroll edilirken sabit kalır */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center center" }}
        />

        {/* ── Start card — sol tarafta başlangıç yazıları ── */}
        {startCard && (
          <div
            ref={startCardRef}
            className="pointer-events-none absolute inset-0 flex items-center"
            style={{ zIndex: 10 }}
          >
            <div className="pointer-events-auto ml-[6vw] max-w-[550px] lg:ml-[8vw]">
              {/* Accent line */}
              <div className="mb-10 flex items-center gap-5">
                <div className="h-px w-16 bg-primary/70" />
                <span className="text-[11px] font-light uppercase tracking-[0.35em] text-white/35">
                  {startCard.badge}
                </span>
              </div>

              {/* Headline */}
              <h2 className="leading-[1.05]">
                <span
                  className="block font-extralight uppercase tracking-[0.02em] text-white/90"
                  style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)" }}
                >
                  {startCard.titleLine1}
                </span>
                <span
                  className="mt-1 block font-bold uppercase tracking-[-0.01em] text-white"
                  style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
                >
                  {startCard.titleLine2}
                </span>
                <span
                  className="mt-1 block font-extralight uppercase tracking-[0.02em] text-primary/80"
                  style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)" }}
                >
                  {startCard.titleLine3}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-7 max-w-md text-[14px] font-light leading-relaxed text-white/30">
                {startCard.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* ── End card — sağ tarafta ürün bilgisi ── */}
        {endCard && (
          <div
            ref={endCardRef}
            className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center"
            style={{ zIndex: 10, opacity: 0 }}
          >
            <div className="pointer-events-auto mr-[6vw] max-w-[500px] lg:mr-[8vw]">
              {/* Accent */}
              <div className="mb-8 flex items-center gap-5">
                <div className="h-[2px] w-14 bg-primary" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.3em] text-primary">
                  {endCard.series}
                </span>
              </div>

              <h2 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
                {endCard.title}
              </h2>

              <p className="mt-6 max-w-md text-[15px] font-light leading-[1.8] text-white/50">
                {endCard.desc}
              </p>

              <div className="mt-10 flex gap-0">
                <div className="pr-8">
                  <p className="text-2xl font-bold text-white">{endCard.spec1Value}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                    {endCard.spec1Label}
                  </p>
                </div>
                <div className="border-l border-white/[0.12] px-8">
                  <p className="text-2xl font-bold text-white">{endCard.spec2Value}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                    {endCard.spec2Label}
                  </p>
                </div>
                <div className="border-l border-white/[0.12] pl-8">
                  <p className="text-2xl font-bold text-white">{endCard.spec3Value}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                    {endCard.spec3Label}
                  </p>
                </div>
              </div>

              {locale && productHref && (
                <div className="mt-10">
                  <Link
                    href={`/${locale}${productHref}`}
                    className="group inline-flex items-center gap-3 rounded-full border border-primary/30 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-primary transition-all duration-400 hover:border-primary hover:bg-primary/10 hover:text-white"
                  >
                    {endCard.cta}
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
