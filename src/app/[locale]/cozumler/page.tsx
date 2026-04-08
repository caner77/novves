import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

export const metadata: Metadata = {
  title: "Çözümler | Novves",
  description:
    "NOVVES mühendislik çözümleri — duman tahliye, konfor iklimlendirme, endüstriyel hava yönetimi ve daha fazlası.",
};

const solutionItems: { key: string; slug: string }[] = [
  { key: "dumanIsiTahliye", slug: "duman-isi-tahliye-sistemleri" },
  { key: "konforIklimlendirme", slug: "konfor-iklimlendirme-sistemleri" },
  { key: "hijyenikFiltrasyon", slug: "hijyenik-filtrasyonlu-havalandirma" },
  { key: "endustriyelHavaYonetimi", slug: "endustriyel-hava-yonetimi" },
  { key: "hayvancilikTesisleri", slug: "hayvancilik-tesisleri-icin-havalandirma-sistemleri" },
  { key: "trafoEnerjiOdalari", slug: "trafo-enerji-odalari-fanlari" },
  { key: "seraTarimsal", slug: "sera-tarimsal-havalandirma-sistemleri" },
  { key: "atexPatlamaKoruma", slug: "atex-patlama-koruma-cozumleri" },
  { key: "akilliOtomasyon", slug: "akilli-otomasyon-ve-kontrol-sistemleri" },
  { key: "konutHavalandirma", slug: "konut-tipi-havalandirma-sistemleri" },
  { key: "marinOffshore", slug: "marin-offshore-havalandirma-sistemleri" },
  { key: "projeBazliOzelImalat", slug: "proje-bazli-ozel-imalatlar" },
  { key: "cfdDanismanlik", slug: "cfd-muhendislik-danismanligi" },
];

export default async function CozumlerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const solutions = dict.solutions;
  const nav = dict.common.navbar;

  const getSolutionName = (key: string) => {
    const sol = solutions[key as keyof typeof solutions] as Record<string, unknown>;
    if (!sol) return key;
    if (typeof sol.breadcrumbCurrent === "string") return sol.breadcrumbCurrent;
    return key;
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-24 pt-40">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
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
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {dict.products.shared.home}
            </Link>
            <span>/</span>
            <span className="text-white/60">{nav.solutions}</span>
          </nav>
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {nav.solutions}
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {nav.solutions}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              {nav.solutionsDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex items-end gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {nav.solutions}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-dark sm:text-3xl">
                {nav.solutionsDesc}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutionItems.map((item, i) => (
              <Link
                key={item.key}
                href={`/${locale}/cozumler/${item.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white p-8 ring-1 ring-gray-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/20"
              >
                <span className="absolute right-6 top-6 text-3xl font-black text-gray-100/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-dark">{getSolutionName(item.key)}</h3>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-px w-6 bg-primary/40 transition-all duration-300 group-hover:w-10 group-hover:bg-primary" />
                  <svg
                    className="h-3.5 w-3.5 text-primary/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark py-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {dict.products.shared.technicalSupport}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {dict.products.shared.lookingForProduct}
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/45">
            {dict.products.shared.teamReady}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-[#e55a28] hover:shadow-xl hover:shadow-primary/30"
            >
              {dict.products.shared.technicalSupportRequest}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
