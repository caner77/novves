"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

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
  sideLabel,
  sectionNumber = "02",
}: {
  framesPath: string;
  totalFrames: number;
  id: string;
  startCard?: StartCard;
  endCard?: EndCard;
  locale?: string;
  productHref?: string;
  sideLabel?: string;
  sectionNumber?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const startCardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
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
    const first = images[0];
    if (first.complete) renderFrame(0);
    else first.onload = () => renderFrame(0);

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

        if (startCardRef.current) {
          const fade = Math.max(1 - progress * 2.4, 0);
          startCardRef.current.style.opacity = String(fade);
          startCardRef.current.style.transform = `translateY(-${progress * 30}px)`;
        }

        if (panelRef.current) {
          // Left ink panel slides fully off-screen left by progress 0.85
          const slideOut = Math.min(Math.max((progress - 0.55) / 0.3, 0), 1);
          panelRef.current.style.transform = `translateX(-${slideOut * 105}%)`;
        }

        if (canvasRef.current) {
          // Fan: starts visible RIGHT (70%), ends visible LEFT (15%) — mirror of hero
          const shift = Math.min(Math.max((progress - 0.55) * 2.2, 0), 1);
          const xPct = 70 - shift * 55;
          canvasRef.current.style.objectPosition = `${xPct}% center`;
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleY(${progress})`;
        }

        if (endCardRef.current) {
          const fade = Math.max((progress - 0.72) * 4, 0);
          const shift = Math.max(40 - fade * 40, 0);
          endCardRef.current.style.opacity = String(Math.min(fade, 1));
          endCardRef.current.style.transform = `translateX(${shift}px)`;
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
    <div
      ref={containerRef}
      id={id}
      className="relative bg-sand-200"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — fan visible on right side */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
        />

        {/* LEFT — Solid sand panel for text readability (slides off at end) */}
        <div ref={panelRef} className="absolute top-0 bottom-0 left-0 w-[42%] bg-sand-200 z-10 will-change-transform">
          <div className="absolute inset-0 blueprint-grid-light opacity-60 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-px bg-ink/10" />
          {/* Soft right-edge fade into canvas area */}
          <div className="pointer-events-none absolute inset-y-0 -right-24 w-24 bg-gradient-to-l from-transparent to-sand-200" />
        </div>

        {/* Top hairline — section meta */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-sand-200/70 px-8 py-3 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/60 backdrop-blur-sm xl:px-16">
          <div className="flex items-center gap-5">
            <span className="text-primary">[ {sectionNumber} ]</span>
            <span>— {sideLabel ?? "Scroll Sequence"}</span>
          </div>
          {endCard && (
            <div className="flex items-center gap-5">
              <span>{endCard.series}</span>
              <span className="text-ink/30">|</span>
              <span className="text-ink/55">{endCard.spec1Value} · {endCard.spec3Value}</span>
            </div>
          )}
        </div>

        {/* Right-side progress rail */}
        {sideLabel && (
          <div className="absolute right-5 top-[18%] bottom-[18%] z-15 flex items-center pointer-events-none xl:right-8">
            <span
              className="absolute -left-14 top-1/2 font-mono-eng text-[10px] uppercase tracking-[0.3em] text-ink/45"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
            >
              {sideLabel}
            </span>
            <div className="relative h-full" style={{ width: "1px" }}>
              <div className="h-full w-full bg-ink/20" />
              <div
                ref={progressBarRef}
                className="absolute inset-0 origin-top bg-primary"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
          </div>
        )}

        {/* START CARD — sits inside left ink panel */}
        {startCard && (
          <div
            ref={startCardRef}
            className="absolute top-[130px] bottom-[40px] left-0 w-[42%] z-20 flex items-center"
          >
            <div className="w-full pl-8 pr-10 xl:pl-16 xl:pr-14">
              <p className="font-mono-eng text-[11px] uppercase tracking-[0.32em] text-primary">
                ● {startCard.badge}
              </p>

              <h2 className="mt-7">
                <span className="block font-light text-ink/70" style={{ fontSize: "clamp(1.3rem, 1.6vw, 1.8rem)", letterSpacing: "-0.01em" }}>
                  {startCard.titleLine1}
                </span>
                <span
                  className="font-display mt-1 block italic text-ink"
                  style={{
                    fontSize: "clamp(3.6rem, 6vw, 7.2rem)",
                    lineHeight: 0.94,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {startCard.titleLine2}
                </span>
                <span className="mt-1 block font-normal text-ink/85" style={{ fontSize: "clamp(1.4rem, 1.8vw, 2rem)", letterSpacing: "-0.015em" }}>
                  {startCard.titleLine3}
                </span>
              </h2>

              <p className="mt-7 max-w-[42ch] text-[15px] leading-[1.7] text-ink/78">
                {startCard.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* END CARD — right, sand on ink, editorial */}
        {endCard && (
          <div
            ref={endCardRef}
            className="pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pt-[130px]"
            style={{ opacity: 0 }}
          >
            <div className="pointer-events-auto mr-6 w-[min(480px,36vw)] xl:mr-14">
              <div className="relative border border-white/15 bg-sand-100 p-9 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)] corner-mark text-ink">
                <div className="absolute inset-0 blueprint-grid-light opacity-60 pointer-events-none" />

                <div className="relative">
                  <p className="font-mono-eng text-[10px] uppercase tracking-[0.24em] text-primary">
                    ◆ {endCard.series}
                  </p>

                  <h3
                    className="font-display mt-6 italic text-ink"
                    style={{ fontSize: "clamp(2.4rem, 3.2vw, 3.6rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
                  >
                    {endCard.title}
                  </h3>

                  <p className="mt-5 max-w-[40ch] text-[13.5px] leading-[1.7] text-ink/72">
                    {endCard.desc}
                  </p>

                  <div className="mt-7 grid grid-cols-3 border-y border-ink/12 divide-x divide-ink/10">
                    {[
                      { v: endCard.spec1Value, l: endCard.spec1Label },
                      { v: endCard.spec2Value, l: endCard.spec2Label },
                      { v: endCard.spec3Value, l: endCard.spec3Label },
                    ].map((s) => (
                      <div key={s.l} className="py-4 pl-4 first:pl-0">
                        <p className="font-display text-[1.8rem] leading-none text-ink">{s.v}</p>
                        <p className="mt-1.5 font-mono-eng text-[9px] uppercase tracking-[0.2em] text-ink/55">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  {locale && productHref && (
                    <Link
                      href={`/${locale}${productHref}`}
                      className="group mt-7 inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-sand-100 transition-all duration-300 hover:bg-primary"
                    >
                      {endCard.cta}
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
