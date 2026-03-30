import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "CFD Analizi | Novves",
  description:
    "NOVVES CFD (Hesaplamalı Akışkanlar Dinamiği) analizleri — gerçek senaryolar, gerçek veriler, güvenli çözümler.",
};

const accentMap = [
  { accent: "border-l-blue-500", badge: "bg-blue-500/10 text-blue-600" },
  { accent: "border-l-red-500", badge: "bg-red-500/10 text-red-600" },
  { accent: "border-l-amber-500", badge: "bg-amber-500/10 text-amber-600" },
  { accent: "border-l-emerald-500", badge: "bg-emerald-500/10 text-emerald-600" },
  { accent: "border-l-gray-400", badge: "bg-gray-400/10 text-gray-500" },
];

export default async function CfdAnalizi({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.services.cfdAnalizi;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[460px] items-end overflow-hidden">
        <Image src="/images/page-hero/cfd.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-0 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumb.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/hizmetler/cfd-analizi`} className="transition-colors hover:text-white/70">{t.breadcrumb.services}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumb.current}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t.hero.titlePart1} <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-dark/40 backdrop-blur-sm">
            {t.hero.stats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-lg font-bold text-primary sm:text-xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-5">
            <div className="mt-1 hidden h-px w-12 shrink-0 bg-primary sm:block" />
            <p className="text-[15px] leading-7 text-secondary/75">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ── Why CFD ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-10 flex items-end gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.whyCfd.sectionLabel}</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                    {t.whyCfd.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {t.whyCfd.items.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 rounded-xl bg-white p-5 ring-1 ring-gray-100"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                      {i + 1}
                    </span>
                    <p className="text-[13px] leading-relaxed text-secondary/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Result highlight */}
            <div className="relative overflow-hidden rounded-2xl bg-dark p-10">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{t.whyCfd.resultLabel}</span>
                </span>
                <p className="text-lg font-bold leading-relaxed text-white sm:text-xl">
                  {t.whyCfd.resultText}
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-px w-8 bg-primary/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="h-px w-8 bg-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Analysis Types ───────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.analysisTypes.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {t.analysisTypes.title}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-100 sm:block" />
          </div>

          <div className="space-y-4">
            {t.analysisTypes.items.map((a: { title: string; subtitle: string; text: string }, i: number) => (
              <div
                key={a.title}
                className={`group overflow-hidden rounded-xl border-l-4 ${accentMap[i]?.accent ?? "border-l-gray-400"} bg-gray-50 ring-1 ring-gray-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:ring-gray-200`}
              >
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-8">
                  <div className="shrink-0 sm:w-64">
                    <span className={`mb-2 inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${accentMap[i]?.badge ?? "bg-gray-400/10 text-gray-500"}`}>
                      {a.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-dark">{a.title}</h3>
                  </div>
                  <div className="hidden h-12 w-px bg-gray-200 sm:block" />
                  <p className="flex-1 text-[13px] leading-relaxed text-secondary/65">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark py-24">
        <div
          className="pointer-events-none absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.benefits.sectionLabel}</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {t.benefits.title}
              </h2>
              <div className="mt-8 space-y-3">
                {t.benefits.items.map((b: string, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-white/70">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl bg-white/[0.04] p-8 ring-1 ring-white/[0.08] backdrop-blur-sm lg:p-10">
              <span
                className="mb-4 block font-serif text-5xl leading-none text-primary/20 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-base leading-7 text-white/80">
                {t.benefits.quote}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
                >
                  {t.benefits.ctaPrimary}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/hizmetler/duman-kontrol-sistemi-tasarimi`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-primary/30 hover:text-white"
                >
                  {t.benefits.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
