import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Otomasyon Malzemeleri | Novves",
  description: "NOVVES otomasyon malzemeleri — pano, PLC, sensör ve kontrol kartları.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.otomasyonMalzemeleri;
  const s = dict.products.shared;

  return (
    <main>
      <section className="relative flex min-h-[460px] items-end overflow-hidden">
        <Image src="/images/page-hero/urunler.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{s.home}</Link>
            <span>/</span>
            <Link href={`/${locale}/urunler/hava-hareketi`} className="transition-colors hover:text-white/70">{s.products}</Link>
            <span>/</span>
            <span className="text-white/60">{t.title}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{s.productsLabel}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t.titleFirst} <span className="text-primary">{t.titleHighlight}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="relative bg-white">
        <span className="pointer-events-none absolute right-0 top-0 select-none text-[20rem] font-black leading-none text-gray-50" aria-hidden="true">04</span>
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{s.panoPLCSensor}</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">{s.productGroups}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-100 sm:block" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.products.map((product: { name: string; subModels: string[] }, i: number) => (
              <div key={product.name} className="group relative overflow-hidden rounded-xl bg-gray-50 p-6 ring-1 ring-gray-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:ring-primary/15">
                <div className="absolute left-0 top-0 h-full w-1 bg-gray-200 transition-colors duration-300 group-hover:bg-primary" />
                <span className="mb-3 block text-3xl font-black text-secondary/[0.06]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-bold text-dark">{product.name}</h3>
                {product.subModels.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.subModels.map((m: string) => (
                      <span key={m} className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-secondary/55 ring-1 ring-gray-100">{m}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href={`/${locale}/iletisim`} className="group inline-flex items-center gap-3 rounded-xl bg-dark px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-primary hover:shadow-xl hover:shadow-primary/25">
              {s.technicalSupportRequest}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{s.explore}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{s.otherCategories}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.otherCategories.map((cat: { label: string; slug: string }, i: number) => (
              <Link key={cat.label} href={`/${locale}/urunler/${cat.slug}`} className="group relative overflow-hidden rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08] hover:ring-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <span className="mb-4 block text-2xl font-black text-white/[0.06]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-bold text-white">{cat.label}</h3>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-px w-6 bg-primary/40 transition-all duration-300 group-hover:w-10 group-hover:bg-primary" />
                  <svg className="h-3.5 w-3.5 text-primary/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
