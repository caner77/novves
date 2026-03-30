import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

const sdgImages = ["/images/sdg11.jpg", "/images/sdg12.jpg", "/images/sdg13.jpg"];

export default async function Surdurulebilirlik({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.sustainability.main;

  return (
    <main>
      <section className="bg-secondary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.title}</h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="relative w-full max-w-md flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
            <Image src="/images/surdurulebilirlik-1-novves.jpg" alt={t.title} width={600} height={400} className="w-full object-cover" priority />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-dark sm:text-3xl">
              {t.tagline} <span className="text-primary">{t.taglineHighlight}</span> {t.taglineEnd}
            </h2>
            <p className="text-base leading-7 text-secondary/80">{t.introText}</p>
          </div>
        </div>
      </section>

      <section className="bg-light py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {t.sdgGoals.map((goal: { title: string; text: string }, i: number) => (
              <div key={goal.title} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <div className="relative h-48 w-full">
                  <Image src={sdgImages[i]} alt={goal.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-dark">{goal.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary/70">{goal.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/images/neden-novves.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-lg leading-8 text-white/90">
            {t.perfStat}{" "}
            <span className="font-bold text-primary">{t.perfStatHighlight1}</span>{" "}
            {t.perfStatMid}{" "}
            <span className="font-bold text-primary">{t.perfStatHighlight2}</span>{" "}
            {t.perfStatEnd}
          </p>
        </div>
      </section>

      <section className="bg-secondary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-2 text-lg font-bold text-white">{t.ctaTitle}</h3>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/urunler/hava-hareketi`} className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary">{t.ctaProducts}</Link>
            <Link href={`/${locale}/iletisim`} className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]">{t.ctaContact}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
