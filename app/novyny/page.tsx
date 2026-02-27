import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaginationLinks from "@/components/PaginationLinks";
import { SITE_URL } from "@/content/seo-pages";
import { getArticlePageCount, getArticlesByPage } from "@/utils/laws";

export const metadata: Metadata = {
  title: "Новини розмитнення авто в Україні | Законодавчі оновлення 2026",
  description:
    "Законодавчі оновлення, роз'яснення та аналітика про розмитнення авто в Україні. Актуальні матеріали для водіїв, імпортерів і брокерів.",
  alternates: {
    canonical: "/novyny",
  },
  openGraph: {
    title: "Новини розмитнення авто в Україні",
    description: "Збірка SEO-матеріалів про нові правила розмитнення та практичні кейси 2026 року.",
    url: `${SITE_URL}/novyny`,
    type: "website",
    locale: "uk_UA",
  },
};

export default function NewsIndexPage() {
  const articles = getArticlesByPage(1);
  const pageCount = getArticlePageCount();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ label: "Головна", href: "/" }, { label: "Новини" }]} />

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Новини та законодавчі оновлення
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          База аналітичних статей для тих, хто планує імпорт авто та хоче орієнтуватися у чинних правилах
          розмитнення в Україні.
        </p>
      </section>

      <section className="mt-8 grid gap-4">
        {articles.map((article) => (
          <article key={article.slug} className="rounded-2xl bg-white p-6 shadow-soft">
            <p className="text-sm text-slate-500">{article.date}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{article.title}</h2>
            <p className="mt-3 text-slate-600">{article.summary}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={`/novyny/${article.slug}`} className="font-semibold text-brand-700 hover:underline">
                Читати матеріал
              </a>
              <a href="/kalkulyator" className="font-semibold text-brand-700 hover:underline">
                Перевірити в калькуляторі
              </a>
            </div>
          </article>
        ))}
      </section>

      <PaginationLinks currentPage={1} pageCount={pageCount} basePath="/novyny" />
    </main>
  );
}
