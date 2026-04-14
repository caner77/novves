"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FanAssemblyAnimation } from "@/components/fan-assembly-animation";
import { ScrollVideoSection } from "@/components/scroll-video-section";

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

const pillarImages = [
  "/images/products/dragonfly-c.png",
  "/images/products/marlin.png",
  "/images/hero/endustriyel-mutfaklar.png",
];

const productCategoryMeta = [
  { href: "/urunler/hava-hareketi", image: "/images/products/dragonfly-c.png" },
  { href: "/urunler/iklimlendirme", image: "/images/products/tiger-pre.png" },
  { href: "/urunler/sogutma-ve-isitma", image: "/images/products/dolphin-pre.png" },
  { href: "/urunler/hava-yonetimi", image: "/images/products/hound-al.png" },
  { href: "/urunler/hava-dagitimi", image: "" },
  { href: "/urunler/hava-filtrasyonu", image: "" },
  { href: "/urunler/aksesuarlar", image: "/images/products/ae-fjf.png" },
  { href: "/urunler/otomasyon-malzemeleri", image: "/images/products/basinclandirma-kontrol-panosu.png" },
  { href: "/urunler/titresim-ve-ses-izolasyon", image: "/images/products/yayli-titresim-izolatoru.png" },
];

const socialPlatforms = [
  {
    label: "LinkedIn",
    href: "https://tr.linkedin.com/company/novvesturkiye",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCan0PUXw7Pr0GI0HTegN1yQ",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/novves.turkiye/",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/novves.turkiye/",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
];

/* ── Section header primitive — used by every section for consistent framing */

function SectionHead({
  num,
  title,
  subtitle,
  meta,
  tone = "light",
}: {
  num: string;
  title: string;
  subtitle?: string;
  meta?: string;
  tone?: "light" | "dark";
}) {
  const textMeta = tone === "dark" ? "text-white/55" : "text-ink/55";
  const textPrimary = "text-primary";
  const textTitle = tone === "dark" ? "text-white" : "text-ink";
  const textSubtitle = tone === "dark" ? "text-white/70" : "text-ink/70";
  const border = tone === "dark" ? "border-white/10" : "border-ink/10";

  return (
    <div className={`border-b ${border} pb-12`}>
      <div className={`flex items-center justify-between font-mono-eng text-[10px] uppercase tracking-[0.22em] ${textMeta}`}>
        <div className="flex items-center gap-5">
          <span className={textPrimary}>[ {num} ]</span>
          <span>— {title.split(" ").slice(0, 2).join(" ")}</span>
        </div>
        {meta && <span className="hidden sm:inline">{meta}</span>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <h2 className={`font-display italic ${textTitle} lg:col-span-8`} style={{ fontSize: "clamp(2.5rem, 4.4vw, 5rem)", lineHeight: 0.98, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-[15px] leading-[1.75] ${textSubtitle} lg:col-span-4`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function HomeClient({ dict, locale }: { dict: HomeDict; locale: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-sand-200 text-ink">
      {/* 01 — HERO */}
      <FanAssemblyAnimation dict={dict.hero} locale={locale} />

      {/* 02 — PILLARS / ENGINEERING ANLAYIŞI */}
      <section className="relative bg-sand-100 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            num="02"
            title={dict.pillars[0]?.title ?? "Mühendislik Anlayışımız"}
            subtitle={dict.pillars[0]?.intro}
            meta="Şartname · Seçim · Devreye Alma"
          />

          {/* Mid-CTA — inline stripe, no card-in-card */}
          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="font-mono-eng text-[11px] uppercase tracking-[0.28em] text-primary">◆ {dict.midCta.title}</p>
              <p className="mt-5 max-w-[55ch] text-[17px] leading-[1.7] text-ink/75">
                {dict.midCta.desc}
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Link
                href={`/${locale}/iletisim`}
                className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-sand-100 transition-all duration-300 hover:bg-primary"
              >
                {dict.midCta.button}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Pillars — editorial triptych, asymmetric offsets */}
          <div className="mt-20 grid gap-0 lg:grid-cols-3 lg:gap-x-0">
            {dict.pillars.map((pillar, index) => (
              <article
                key={pillar.tag}
                className={`group relative flex flex-col border-t border-ink/15 ${
                  index > 0 ? "lg:border-l" : ""
                } lg:border-ink/10 ${
                  index === 1 ? "lg:-translate-y-6" : index === 2 ? "lg:translate-y-6" : ""
                }`}
              >
                {/* Image pane */}
                <div className="relative aspect-[5/4] overflow-hidden bg-sand-300">
                  <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-50" />
                  <Image
                    src={pillarImages[index]}
                    alt={pillar.title}
                    fill
                    className={`transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] ${index === 2 ? "p-14 object-cover" : "p-10 object-contain"}`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/60">
                    <span className="text-primary">[ {String(index + 1).padStart(2, "0")} ]</span>
                    <span>{pillar.tag}</span>
                  </div>
                </div>

                {/* Copy */}
                <div className="flex flex-1 flex-col border-t border-ink/12 p-7 lg:p-9">
                  <h3 className="font-display italic text-ink" style={{ fontSize: "clamp(1.7rem, 2.2vw, 2.4rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.7] text-ink/70">{pillar.intro}</p>

                  <ul className="mt-7 space-y-4 border-t border-ink/10 pt-6">
                    {pillar.items.map((item, itemIndex) => (
                      <li key={item.label} className="flex items-start gap-4">
                        <span className="font-mono-eng text-[10px] uppercase tracking-[0.2em] text-primary pt-0.5 min-w-[2.5ch]">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[13.5px] font-semibold text-ink">{item.label}</p>
                          <p className="mt-1 text-[13px] leading-[1.65] text-ink/60">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — SCROLL VIDEO: KOVAN TIPI */}
      <ScrollVideoSection
        framesPath="/animation/frames-2"
        totalFrames={240}
        id="animation-2"
        startCard={dict.animation2.startCard}
        endCard={dict.animation2.endCard}
        locale={locale}
        productHref="/urunler/kovan-tipi-aksiyal-fanlar"
        sideLabel="Otopark Havalandırma"
        sectionNumber="03"
      />

      {/* 04 — PRODUCT CATEGORIES */}
      <section className="relative bg-sand-200 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            num="04"
            title={dict.productCategories.title}
            subtitle={dict.productCategories.desc}
            meta="9 Kategori · 7.000+ Varyasyon"
          />

          {/* Editorial mosaic — first large, rest in a 3-col grid with alternating heights */}
          <div className="mt-16 grid gap-0 lg:grid-cols-12">
            {dict.productCategories.items.map((cat, index) => {
              const meta = productCategoryMeta[index];
              const hasImage = Boolean(meta?.image);
              const isFeature = index === 0;

              const col = isFeature ? "lg:col-span-12" : "lg:col-span-4";
              const isFirstInRow = index === 0 || index === 1 || index === 4 || index === 7;
              const borderStyles = [
                "border-ink/12",
                "border-t border-ink/12",
                !isFirstInRow ? "lg:border-l lg:border-ink/10" : "",
              ].join(" ");

              return (
                <Link
                  key={cat.label}
                  href={`/${locale}${meta.href}`}
                  className={`group relative flex overflow-hidden transition-colors duration-300 hover:bg-sand-100 ${col} ${borderStyles}`}
                  style={{ minHeight: isFeature ? 340 : 240 }}
                >
                  {/* Content area */}
                  <div className={`relative flex w-full ${isFeature ? "flex-row" : "flex-col"}`}>
                    {/* Copy */}
                    <div className={`relative z-10 flex flex-col justify-between p-7 lg:p-9 ${isFeature ? "lg:w-[44%]" : ""}`}>
                      <div className="flex items-center gap-3 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/55">
                        <span className="text-primary">[ {String(index + 1).padStart(2, "0")} ]</span>
                        <span>{dict.productCategories.tag}</span>
                      </div>

                      <div className="mt-auto pt-10">
                        <h3
                          className="font-display italic text-ink"
                          style={{
                            fontSize: isFeature ? "clamp(2.4rem, 3.2vw, 3.8rem)" : "clamp(1.5rem, 1.9vw, 2.1rem)",
                            lineHeight: 0.98,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {cat.label}
                        </h3>
                        <div className="mt-5 inline-flex items-center gap-2 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-ink/70 transition-colors group-hover:text-primary">
                          <span>Keşfet</span>
                          <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={`relative ${isFeature ? "flex-1" : "h-44 lg:h-52"} bg-sand-300`}>
                      <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-40" />
                      {hasImage ? (
                        <Image
                          src={meta.image}
                          alt={cat.label}
                          fill
                          className={`object-contain transition-transform duration-[900ms] ease-out group-hover:scale-105 ${isFeature ? "p-12" : "p-3"}`}
                          sizes={isFeature ? "(max-width: 1024px) 100vw, 56vw" : "(max-width: 1024px) 100vw, 33vw"}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center font-display italic text-ink/20" style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}>
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 — VIDEO / STUDIO */}
      <section className="relative bg-ink py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-50" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHead
            num="05"
            title={dict.video.title}
            subtitle={dict.video.desc}
            meta="30+ Ülke · 500+ Proje"
            tone="dark"
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            {/* Video */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video overflow-hidden border border-white/15 bg-black corner-mark">
                <iframe
                  src="https://www.youtube.com/embed/jhiens-xiOw"
                  title={dict.video.iframeTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              {/* Metadata strip under video */}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 font-mono-eng text-[10px] uppercase tracking-[0.22em] text-white/50">
                <span>{dict.video.iframeTitle}</span>
                <span>1080p · HD</span>
              </div>
            </div>

            {/* Side column */}
            <div className="flex flex-col justify-between gap-10 lg:col-span-4">
              <div className="space-y-3">
                <Link
                  href={`/${locale}/kurumsal/biz-kimiz`}
                  className="group flex items-center justify-between border border-white/15 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 transition-all duration-300 hover:border-primary hover:text-white"
                >
                  {dict.video.aboutUs}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/kurumsal/referanslar`}
                  className="group flex items-center justify-between border border-white/15 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 transition-all duration-300 hover:border-primary hover:text-white"
                >
                  {dict.video.references}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-2 divide-x divide-white/10 border-y border-white/15">
                {dict.hero.stats.slice(0, 4).map((stat, i) => (
                  <div key={stat.label} className={`px-4 py-5 ${i >= 2 ? "border-t border-white/10" : ""}`}>
                    <p className="font-display text-[2rem] leading-none text-white">{stat.value}</p>
                    <p className="mt-2 font-mono-eng text-[9.5px] uppercase tracking-[0.2em] text-white/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ & 07 — FINAL CTA combined into a two-column block */}
      <section className="relative bg-sand-200 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-60" />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <SectionHead num="06" title={dict.faq.title} meta="Sıkça Sorulanlar" />

          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            {/* FAQ list */}
            <div className="lg:col-span-7">
              <div className="border-t border-ink/15">
                {dict.faq.items.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={item.q} className={`border-b border-ink/15 ${isOpen ? "bg-sand-100" : ""}`}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors"
                      >
                        <div className="flex items-start gap-5">
                          <span className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-primary pt-1 min-w-[2.5ch]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[16px] font-medium leading-[1.5] text-ink">{item.q}</span>
                        </div>
                        <span className={`font-mono-eng text-[20px] leading-none text-ink/50 transition-transform ${isOpen ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pb-7 pl-[3.5ch] pr-6">
                          <p className="text-[14px] leading-[1.75] text-ink/70">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact / social side */}
            <aside className="flex flex-col gap-12 lg:col-span-5">
              {/* Social */}
              <div>
                <p className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-primary">
                  ◆ {dict.social.tag}
                </p>
                <h3 className="font-display mt-4 italic text-ink" style={{ fontSize: "clamp(1.8rem, 2.3vw, 2.4rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {dict.social.title}
                </h3>
                <div className="mt-6 flex flex-wrap gap-0 border border-ink/15">
                  {socialPlatforms.map((p, i) => (
                    <a
                      key={p.label}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.label}
                      className={`flex h-14 flex-1 items-center justify-center text-ink/50 transition-colors duration-300 hover:bg-ink hover:text-primary ${i > 0 ? "border-l border-ink/15" : ""}`}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">{p.icon}</svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Final CTA — ink block with hairlines */}
              <div className="relative border border-ink/20 bg-ink p-9 text-white corner-mark">
                <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-50" />

                <div className="relative">
                  <p className="font-mono-eng text-[10px] uppercase tracking-[0.28em] text-primary">
                    ● {dict.finalCta.tag}
                  </p>
                  <h3 className="font-display mt-5 italic text-white" style={{ fontSize: "clamp(2rem, 2.8vw, 2.8rem)", lineHeight: 0.98, letterSpacing: "-0.02em" }}>
                    {dict.finalCta.title}
                  </h3>
                  <p className="mt-5 text-[14px] leading-[1.7] text-white/70">
                    {dict.finalCta.desc}
                  </p>

                  <div className="mt-8 space-y-3">
                    <a
                      href="tel:+902164674752"
                      className="group flex items-center justify-between border border-white/15 px-5 py-4 text-[13px] font-medium text-white/80 transition-all duration-300 hover:border-primary hover:text-white"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono-eng text-[10px] uppercase tracking-[0.22em] text-primary">Tel</span>
                        <span>+90 216 467 47 52</span>
                      </span>
                      <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </a>

                    <Link
                      href={`/${locale}/iletisim`}
                      className="group flex items-center justify-between bg-primary px-5 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:bg-[#e55a28]"
                    >
                      {dict.finalCta.requestQuote}
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
