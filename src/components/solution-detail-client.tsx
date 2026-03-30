"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type AppArea = {
  title: string;
  description: string;
  products: { name: string; type: string; image: string }[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function SolutionDetailClient({
  dict,
  locale,
  commonDict,
  slug,
  heroImage,
}: {
  dict: any;
  locale: string;
  commonDict: any;
  slug: string;
  heroImage?: string;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const areas: AppArea[] = dict.areas;
  const systemComponents: { title: string; desc: string }[] = dict.systemComponents;
  const advantages: { title: string; desc: string }[] = dict.advantages;
  const faqItems: { q: string; a: string }[] = dict.faqItems;

  return (
    <main>
      {/* 1. HERO */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src={heroImage ?? "/images/page-hero/cozumler-main.jpg"} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/75 to-dark/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-0 pt-36 sm:px-6 lg:px-8">
          <nav className="mb-10 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{commonDict?.navbar?.links?.home ?? "Ana Sayfa"}</Link>
            <span>/</span>
            <Link href={`/${locale}/cozumler/${slug}`} className="transition-colors hover:text-white/70">{commonDict?.navbar?.solutions ?? "Cozumler"}</Link>
            <span>/</span>
            <span className="text-white/60">{dict.breadcrumbCurrent}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{dict.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {dict.titleLine1} <span className="text-primary">{dict.titleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              {dict.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/iletisim`} className="group inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
                {dict.ctaPrimary}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href={`/${locale}${dict.ctaSecondaryHref}`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:text-white">
                {dict.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-dark/40 backdrop-blur-sm sm:grid-cols-4">
            {dict.trustStrip.map((s: any) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-base font-bold text-primary sm:text-lg">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. COZUM ACIKLAMASI */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.whyImportantLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {dict.whyImportantTitle}
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-secondary/65">
                <p>{dict.whyImportantP1}</p>
                <p>{dict.whyImportantP2}</p>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-2">
              {dict.steps.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4 rounded-xl bg-gray-50 p-5 ring-1 ring-gray-100">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark text-[11px] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-dark">{item.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-secondary/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SISTEM BILESENLERI */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.systemLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.systemTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {systemComponents.map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl bg-white p-6 ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:ring-gray-200">
                <div className="absolute left-0 top-0 h-full w-1 bg-gray-200 transition-colors duration-300 group-hover:bg-primary" />
                <span className="mb-3 block text-2xl font-black text-secondary/[0.05]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[15px] font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mid-page CTA */}
      <section className="bg-dark py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div>
            <h3 className="text-lg font-bold text-white">{dict.midCtaTitle}</h3>
            <p className="mt-1 text-sm text-white/40">{dict.midCtaDesc}</p>
          </div>
          <Link href={`/${locale}/iletisim`} className="group shrink-0 inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
            {dict.midCtaButton}
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* 5. AVANTAJLAR */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.advantagesLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.advantagesTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-100 sm:block" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv, i) => (
              <div key={i} className="rounded-xl border-t-2 border-primary bg-gray-50 p-6">
                <h3 className="text-[15px] font-bold text-dark">{adv.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-secondary/55">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UYGULAMA ALANLARI */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.areasLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.areasTitle}</h2>
              <p className="mt-3 max-w-lg text-sm text-secondary/50">{dict.areasDesc}</p>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>

          <div className="space-y-6">
            {areas.map((area, i) => (
              <div key={area.title} className="overflow-hidden rounded-xl bg-white ring-1 ring-gray-100">
                <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-5 sm:px-8">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-[11px] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-dark">{area.title}</h3>
                    <p className="text-xs text-primary">{area.description}</p>
                  </div>
                </div>

                <div className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-gray-100">
                  {area.products.map((p, j) => (
                    <div
                      key={`${area.title}-${p.name}-${j}`}
                      className="flex items-center gap-5 px-6 py-5 sm:px-8"
                    >
                      <div className="relative h-32 w-32 shrink-0 rounded-lg bg-gray-50 sm:h-44 sm:w-44">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-contain p-2"
                          sizes="144px"
                        />
                      </div>
                      <div>
                        <p className="text-base font-bold text-dark sm:text-lg">{p.name}</p>
                        <p className="mt-0.5 text-xs text-secondary/45 sm:text-sm">{p.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.faqLabel}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">{dict.faqTitle}</h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`overflow-hidden rounded-xl ring-1 transition-all duration-200 ${isOpen ? "ring-gray-200 shadow-sm" : "ring-gray-100"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
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

      {/* 8. FINAL CTA */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{dict.finalCtaLabel}</p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {dict.finalCtaTitle}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {dict.finalCtaDesc}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="tel:+902164674752" className="group inline-flex items-center gap-3 rounded-xl bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/[0.06] ring-1 ring-white/[0.1] transition-colors duration-300 group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </span>
              {dict.finalCtaPhone}
            </a>
            <Link href={`/${locale}/iletisim`} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30">
              {dict.finalCtaButton}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
