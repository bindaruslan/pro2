import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { HOMEPAGE_SEO, LANDING_PAGES, SITE_URL } from "@/content/seo-pages";
import { getAllLawArticles } from "@/utils/laws";

export const metadata: Metadata = {
  title: HOMEPAGE_SEO.seoTitle,
  description: HOMEPAGE_SEO.metaDescription,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const latestArticles = getAllLawArticles().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: HOMEPAGE_SEO.h1,
    description: HOMEPAGE_SEO.metaDescription,
    url: SITE_URL,
    inLanguage: "uk-UA",
    about: HOMEPAGE_SEO.keyword,
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:py-16">
      <JsonLd data={jsonLd} />

      <section className="rounded-3xl bg-white p-6 text-center shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Україна • 2026</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{HOMEPAGE_SEO.h1}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Точний онлайн-розрахунок мита, акцизу та ПДВ за актуальною формулою 2026 року.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/kalkulyator"
            className="rounded-xl bg-brand-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-brand-600"
          >
            Розрахувати вартість зараз
          </a>
          <a
            href="/novyny"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Читати оновлення законодавства
          </a>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-900">Онлайн-калькулятор</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Калькулятор розміщений на окремій сторінці для швидкого доступу та фокусованого розрахунку.
        </p>
        <a href="/kalkulyator" className="mt-5 inline-flex text-sm font-semibold text-brand-700 hover:underline">
          Перейти до калькулятора
        </a>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-900">Корисні сторінки для органічного пошуку</h2>
        <ul className="mt-4 grid gap-3 text-slate-700 sm:grid-cols-2">
          {LANDING_PAGES.map((page) => (
            <li key={page.slug}>
              <a
                className="block rounded-xl border border-slate-200 px-4 py-3 transition hover:border-brand-400 hover:bg-brand-50"
                href={`/${page.slug}`}
              >
                {page.h1}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-900">Останні законодавчі оновлення</h2>
        <p className="mt-3 text-slate-600">
          Аналітичні матеріали про зміни правил розмитнення для довгострокового планування витрат.
        </p>
        <ul className="mt-4 space-y-3">
          {latestArticles.map((article) => (
            <li key={article.slug} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">{article.date}</p>
              <a href={`/novyny/${article.slug}`} className="mt-1 block font-semibold text-slate-900 hover:text-brand-700">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/novyny"
          className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Переглянути всі новини
        </a>
      </section>

      <section className="rounded-3xl bg-slate-900 p-6 text-slate-100 shadow-soft sm:p-10">
        <h2 className="text-2xl font-semibold">Інформаційна навігація</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Добірка ключових сторінок для самостійного вивчення теми розмитнення та перевірки актуальних правил.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/kalkulyator" className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold hover:bg-slate-700">
            Калькулятор
          </a>
          <a href="/novyny" className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold hover:bg-slate-700">
            Новини
          </a>
          <a href="/statti" className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold hover:bg-slate-700">
            Статті
          </a>
        </div>
      </section>
    </main>
  );
}
