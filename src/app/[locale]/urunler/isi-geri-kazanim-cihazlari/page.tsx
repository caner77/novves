import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Caracal - Isı Geri Kazanım Cihazları | Novves",
  description: "Caracal serisi ısı geri kazanım cihazları — kontrollü iklimlendirme ve enerji verimliliği.",
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.products.isiGeriKazanimCihazlari;
  const s = dict.products.shared;

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
            <Image src="/images/products/caracal.jpg" alt="Caracal" fill className="object-contain p-6" priority />
          </div>
          <div className="flex-1 space-y-5">
            <p className="text-base leading-7 text-secondary/80">
              {t.intro}
            </p>
            <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-dark">{t.caracalD.title}</h3>
              <p className="mt-0.5 text-sm font-medium text-primary">{t.caracalD.type}</p>
              <p className="mt-3 text-sm leading-6 text-secondary/70">
                {t.caracalD.description}
              </p>
            </div>
          </div>
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
