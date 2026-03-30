import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { references } from "@/data/references";
import { ReferanslarClient } from "./client";

function uniqueOptions(items: { key: string; label: string }[]): { value: string; label: string }[] {
  const map = new Map<string, string>();
  for (const item of items) { if (!map.has(item.key)) map.set(item.key, item.label); }
  return Array.from(map.entries()).map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label, "tr"));
}

const countryOptions = uniqueOptions(references.map((r) => ({ key: r.country, label: r.countryName })));
const classOptions = uniqueOptions(references.map((r) => ({ key: r.classKey, label: r.className })));
const countryCount = new Set(references.map((r) => r.country)).size;

export default async function Referanslar({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.referanslar;

  return (
    <main>
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image src="/images/page-hero/referanslar.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-0 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">{t.heroDesc}</p>
          </div>
          <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 bg-dark/40 backdrop-blur-sm">
            {[
              { value: `${references.length}+`, label: t.completedProjects },
              { value: `${countryCount}`, label: t.country },
              { value: "2021–2025", label: t.projectPeriod },
            ].map((s) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-xl font-bold text-primary sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReferanslarClient references={references} countryOptions={countryOptions} classOptions={classOptions} dict={t} />
    </main>
  );
}
