import Image from "next/image";
import Link from "next/link";

export type ProductModel = {
  name: string;
  type: string;
  image: string;
  description: string;
};

export type ProductDetailPageProps = {
  title: string;
  subtitle: string;
  intro: string;
  models: ProductModel[];
  locale: string;
  dict: any;
};

export function ProductDetailPage({
  title,
  subtitle,
  intro,
  models,
  locale,
  dict,
}: ProductDetailPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-secondary py-20 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          <p className="mx-auto mt-4 text-base text-white/70">{subtitle}</p>
        </div>
      </section>

      {/* Intro */}
      {intro && (
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-base leading-7 text-secondary/80">{intro}</p>
        </section>
      )}

      {/* Models Grid */}
      <section className="bg-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.name}
                className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-primary/30"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gray-50">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="border-t border-gray-50 p-5">
                  <h3 className="text-lg font-bold text-dark">{model.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-primary">
                    {model.type}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-secondary/60 line-clamp-3">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h3 className="mb-2 text-lg font-bold text-white">
            {dict.shared.lookingForProduct}
          </h3>
          <p className="text-sm text-white/70">
            {dict.shared.teamReady}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/urunler/hava-hareketi`}
              className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary"
            >
              {dict.shared.allProducts}
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]"
            >
              {dict.shared.technicalSupportRequest}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
