"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   Scroll Video Section — Reusable scroll-driven frame animation

   Heroya benzer mantık: sticky canvas, scroll ile frame ilerler.
   Siyah arka plan, tam ekran sinematik.
   ═══════════════════════════════════════════════════════════ */

export function ScrollVideoSection({
  framesPath,
  totalFrames,
  id,
}: {
  framesPath: string;  // e.g. "/animation/frames-2"
  totalFrames: number; // e.g. 241
  id: string;          // unique id for scroll calc
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

        /* Container'ın viewport'taki scroll progress'i:
           - Container üstü viewport üstüne geldiğinde 0
           - Container altı viewport üstüne geldiğinde 1 */
        const scrolled = -rect.top;
        const scrollRange = container.offsetHeight - viewH;
        const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

        const frameIndex = Math.round(progress * (totalFrames - 1));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
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
    <div ref={containerRef} id={id} className="relative h-[200vh] bg-black">
      {/* Sticky canvas — container scroll edilirken sabit kalır */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>
    </div>
  );
}
