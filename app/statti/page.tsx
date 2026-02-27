import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LANDING_PAGES, SITE_URL } from "@/content/seo-pages";

export const metadata: Metadata = {
  title: "Статті про розмитнення авто",
  description: "Тематичні SEO-статті про розмитнення авто: країни імпорту, вартість, електромобілі та правила 2026.",
  alternates: {
    canonical: "/statti",
  },
  openGraph: {
    title: "Статті про розмитнення авто",
    description: "Збірка інформаційних матеріалів для самостійного аналізу витрат на розмитнення авто.",
    url: `${SITE_URL}/statti`,
    type: "website",
    locale: "uk_UA",
  },
};

export default function ArticlesIndexPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ label: "Головна", href: "/" }, { label: "Статті" }]} />
      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Статті</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Практичні матеріали з розмитнення авто, оновлень 2026 року, підрахунку витрат та особливостей імпорту.
        </p>
      </section>

      <section className="mt-8 grid gap-4">
        {LANDING_PAGES.map((page) => (
          <article key={page.slug} className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">{page.h1}</h2>
            <p className="mt-3 text-slate-600">{page.intro}</p>
            <a href={`/${page.slug}`} className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline">
              Читати статтю
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}

