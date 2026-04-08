"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FanAssemblyAnimation } from "@/components/fan-assembly-animation";
import { ScrollVideoSection } from "@/components/scroll-video-section";

/* ── Types ────────────────────────────────────────────── */

type HomeDict = {
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImageAlt: string;
    heroLabel: string;
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
  pillars: {
    tag: string;
    title: string;
    intro: string;
    items: { label: string; desc: string }[];
  }[];
  animation2: {
    startCard: {
      badge: string;
      titleLine1: string;
      titleLine2: string;
      titleLine3: string;
      subtitle: string;
    };
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
    };
  };
  midCta: { title: string; desc: string; button: string };
  productCategories: {
    tag: string;
    title: string;
    desc: string;
    imagePlaceholder: string;
    items: { label: string }[];
  };
  video: {
    tag: string;
    title: string;
    desc: string;
    aboutUs: string;
    references: string;
    iframeTitle: string;
  };
  faq: {
    tag: string;
    title: string;
    items: { q: string; a: string }[];
  };
  social: { tag: string; title: string };
  finalCta: {
    tag: string;
    title: string;
    desc: string;
    requestQuote: string;
  };
};

/* ── Static data (non-translatable) ──────────────────── */

const pillarImages = [
  "/images/products/dragonfly-c.jpg",
  "/images/products/marlin.jpg",
  "/images/hero/endustriyel-mutfaklar.png",
];

const productCategoryMeta = [
  { href: "/urunler/hava-hareketi", image: "/images/products/dragonfly-c.jpg" },
  { href: "/urunler/iklimlendirme", image: "/images/products/tiger-pre.jpg" },
  { href: "/urunler/sogutma-ve-isitma", image: "/images/products/dolphin-pre.jpg" },
  { href: "/urunler/hava-yonetimi", image: "/images/products/hound-al.jpg" },
  { href: "/urunler/hava-dagitimi", image: "" },
  { href: "/urunler/hava-filtrasyonu", image: "" },
  { href: "/urunler/aksesuarlar", image: "/images/products/ae-fjf.jpg" },
  { href: "/urunler/otomasyon-malzemeleri", image: "/images/products/basinclandirma-kontrol-panosu.jpg" },
  { href: "/urunler/titresim-ve-ses-izolasyon", image: "/images/products/yayli-titresim-izolatoru.jpg" },
];

/* ── Component ────────────────────────────────────────── */

export default function HomeClient({ dict, locale }: { dict: HomeDict; locale: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      {/* ═══ HERO — Fan Assembly Animation ═══ */}
      <FanAssemblyAnimation dict={dict.hero} locale={locale} />
      {/* Animasyonun tamamlanması için scroll mesafesi */}
      <div className="h-screen bg-black" />

      {/* Sticky hero'nun üzerine çıkması için */}
      <div className="relative z-10">
        <div className="h-24 bg-gradient-to-b from-black to-white" />

      {/* ═══ PILLAR 1 — Mühendislik & Tasarım ═══ */}
      {(() => {
        const pillar = dict.pillars[0];
        return (
          <section key={pillar.tag} className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-16 lg:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{pillar.tag}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark sm:text-4xl">{pillar.title}</h2>
                  <p className="mt-5 text-[15px] leading-7 text-secondary/60">{pillar.intro}</p>
                  <div className="mt-8 space-y-4">
                    {pillar.items.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-bold text-dark">{item.label}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-secondary/55">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="relative mx-auto aspect-square w-full max-w-md">
                    <div className="absolute inset-6 rounded-full border border-dashed border-gray-200" />
                    <div className="absolute inset-16 rounded-full border border-gray-100" />
                    <Image src={pillarImages[0]} alt={pillar.title} fill className="object-contain p-12 drop-shadow-xl" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ═══ SCROLL VIDEO ANIMATION 2 ═══ */}
      <ScrollVideoSection
        framesPath="/animation/frames-2"
        totalFrames={241}
        id="animation-2"
        startCard={dict.animation2.startCard}
        endCard={dict.animation2.endCard}
        locale={locale}
        productHref="/urunler/kovan-tipi-aksiyal-fanlar"
      />

      {/* ═══ PILLARS 2 & 3 — Üretim & Kurulum ═══ */}
      {dict.pillars.slice(1).map((pillar, i) => {
        const idx = i + 1;
        const isEven = idx % 2 === 0;
        return (
          <section key={pillar.tag} className={`${isEven ? "bg-white" : "bg-gray-50"} py-24`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`grid items-center gap-16 lg:grid-cols-2 ${isEven ? "" : "lg:[direction:rtl]"}`}>
                <div className={isEven ? "" : "lg:[direction:ltr]"}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{pillar.tag}</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark sm:text-4xl">{pillar.title}</h2>
                  <p className="mt-5 text-[15px] leading-7 text-secondary/60">{pillar.intro}</p>
                  <div className="mt-8 space-y-4">
                    {pillar.items.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-sm font-bold text-dark">{item.label}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-secondary/55">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`relative ${isEven ? "" : "lg:[direction:ltr]"}`}>
                  <div className="relative mx-auto aspect-square w-full max-w-md">
                    <div className="absolute inset-6 rounded-full border border-dashed border-gray-200" />
                    <div className="absolute inset-16 rounded-full border border-gray-100" />
                    <Image src={pillarImages[idx]} alt={pillar.title} fill className="object-contain p-12 drop-shadow-xl" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ MID CTA ═══ */}
      <section className="bg-dark py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <h3 className="text-lg font-bold text-white">{dict.midCta.title}</h3>
            <p className="mt-1 text-sm text-white/40">{dict.midCta.desc}</p>
          </div>
          <Link href={`/${locale}/iletisim`} className="group shrink-0 inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
            {dict.midCta.button}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* ═══ PRODUCT CATEGORIES ═══ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{dict.productCategories.tag}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.productCategories.title}</h2>
              <p className="mt-3 max-w-lg text-sm text-secondary/50">{dict.productCategories.desc}</p>
            </div>
            <div className="hidden h-px flex-1 bg-gray-100 sm:block" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dict.productCategories.items.map((cat, i) => {
              const meta = productCategoryMeta[i];
              return (
                <Link
                  key={cat.label}
                  href={`/${locale}${meta.href}`}
                  className="group relative overflow-hidden rounded-xl bg-white ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:ring-gray-200"
                >
                  {/* Product image */}
                  <div className="relative h-40 w-full overflow-hidden bg-gray-50">
                    {meta.image ? (
                      <Image
                        src={meta.image}
                        alt={cat.label}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-xs text-secondary/20">{dict.productCategories.imagePlaceholder}</span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-secondary/[0.06]">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-sm font-bold text-dark">{cat.label}</h3>
                    </div>
                    <svg className="h-4 w-4 text-secondary/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO / INTRO ═══ */}
      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{dict.video.tag}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{dict.video.title}</h2>
              <p className="mt-4 text-[15px] leading-7 text-white/50">
                {dict.video.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/kurumsal/biz-kimiz`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white">
                  {dict.video.aboutUs}
                </Link>
                <Link href={`/${locale}/kurumsal/referanslar`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white">
                  {dict.video.references}
                </Link>
              </div>
            </div>

            {/* YouTube Video */}
            <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                src="https://www.youtube.com/embed/jhiens-xiOw"
                title={dict.video.iframeTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{dict.faq.tag}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.faq.title}</h2>
          </div>

          <div className="space-y-3">
            {dict.faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`overflow-hidden rounded-xl ring-1 transition-all duration-200 ${isOpen ? "ring-gray-200 shadow-sm" : "ring-gray-100"}`}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-[15px] font-semibold text-dark">{item.q}</span>
                    <svg className={`h-4 w-4 shrink-0 text-secondary/30 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-100 px-6 pb-5 pt-4">
                      <p className="text-[13px] leading-relaxed text-secondary/60">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL MEDIA ═══ */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{dict.social.tag}</p>
          <h3 className="mt-2 text-xl font-bold text-dark">{dict.social.title}</h3>
          <div className="mt-8 flex items-center justify-center gap-3">
            {[
              { label: "LinkedIn", href: "https://tr.linkedin.com/company/novvesturkiye", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
              { label: "YouTube", href: "https://www.youtube.com/channel/UCan0PUXw7Pr0GI0HTegN1yQ", icon: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
              { label: "Instagram", href: "https://www.instagram.com/novves.turkiye/", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
              { label: "Facebook", href: "https://www.facebook.com/novves.turkiye/", icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-secondary/30 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:ring-primary hover:shadow-lg hover:shadow-primary/20">
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{dict.finalCta.tag}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{dict.finalCta.title}</h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {dict.finalCta.desc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+902164674752" className="group inline-flex items-center gap-3 rounded-xl bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </span>
              +90 216 467 47 52
            </a>
            <Link href={`/${locale}/iletisim`} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
              {dict.finalCta.requestQuote}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
      </div>{/* relative z-10 wrapper end */}
    </main>
  );
}
