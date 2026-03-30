import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Dolphin - Havuz Nem Alma Santrali | Novves",
  description: "NOVVES Dolphin Serisi havuz nem alma santralleri — kapalı havuzlarda nem kontrolü ve enerji verimliliği.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.havuzNemAlmaSantrali;
  const s = dict.products.shared;
  const h = t.tableHeaders;

  return (
    <main>
      <section className="bg-secondary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.title}</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          <p className="mx-auto mt-4 text-base text-white/70">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="relative h-72 w-full max-w-md flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 shadow-md">
            <Image src="/images/products/dolphin-main.jpg" alt="Dolphin" fill className="object-contain p-6" priority />
          </div>
          <div className="flex-1">
            <p className="text-base leading-7 text-secondary/80">
              {t.intro}
            </p>
          </div>
        </div>

        {/* Specs Table */}
        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-semibold text-dark">{h.model}</th>
                <th className="px-4 py-3 font-semibold text-dark">{h.airFlow}</th>
                <th className="px-4 py-3 font-semibold text-dark">{h.poolArea}</th>
                <th className="px-4 py-3 font-semibold text-dark">{h.cooling}</th>
                <th className="px-4 py-3 font-semibold text-dark">{h.condenser}</th>
                <th className="px-4 py-3 font-semibold text-dark">{h.waterHeater}</th>
              </tr>
            </thead>
            <tbody>
              {t.models.map((m: { model: string; airFlow: string; area: string; cooling: string; condenser: string; water: string }) => (
                <tr key={m.model} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-primary">{m.model}</td>
                  <td className="px-4 py-3 text-secondary/70">{m.airFlow}</td>
                  <td className="px-4 py-3 text-secondary/70">{m.area}</td>
                  <td className="px-4 py-3 text-secondary/70">{m.cooling}</td>
                  <td className="px-4 py-3 text-secondary/70">{m.condenser}</td>
                  <td className="px-4 py-3 text-secondary/70">{m.water}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-secondary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/urunler/iklimlendirme`} className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary">{s.allIklimlendirmeProducts}</Link>
            <Link href={`/${locale}/iletisim`} className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]">{s.technicalSupportRequest}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
