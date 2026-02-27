import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaginationLinks from "@/components/PaginationLinks";
import { SITE_URL } from "@/content/seo-pages";
import { getArticlePageCount, getArticlesByPage } from "@/utils/laws";

interface NewsPaginationPageProps {
  params: {
    page: string;
  };
}

function parsePage(value: string): number {
  const page = Number(value);
  if (!Number.isInteger(page)) {
    return NaN;
  }
  return page;
}

export function generateStaticParams() {
  const pageCount = getArticlePageCount();
  if (pageCount <= 1) {
    return [];
  }

  return Array.from({ length: pageCount - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export function generateMetadata({ params }: NewsPaginationPageProps): Metadata {
  const page = parsePage(params.page);
  const pageCount = getArticlePageCount();

  if (!Number.isFinite(page) || page < 2 || page > pageCount) {
    return {};
  }

  return {
    title: `Новини розмитнення авто - сторінка ${page}`,
    description: `Сторінка ${page} зі стрічки новин про розмитнення авто та законодавчі оновлення.`,
    alternates: {
      canonical: `/novyny/page/${page}`,
    },
    openGraph: {
      title: `Новини розмитнення авто - сторінка ${page}`,
      description: "Архів інформаційних матеріалів про законодавчі зміни та розрахунок митних платежів.",
      url: `${SITE_URL}/novyny/page/${page}`,
      type: "website",
      locale: "uk_UA",
    },
  };
}

export default function NewsPaginationPage({ params }: NewsPaginationPageProps) {
  const currentPage = parsePage(params.page);
  const pageCount = getArticlePageCount();

  if (!Number.isFinite(currentPage) || currentPage < 2 || currentPage > pageCount) {
    notFound();
  }

  const articles = getArticlesByPage(currentPage);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          { label: "Новини", href: "/novyny" },
          { label: `Сторінка ${currentPage}` },
        ]}
      />

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Новини - сторінка {currentPage}
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Архів матеріалів про зміни у сфері розмитнення авто, податків та практичні розрахунки витрат.
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

      <PaginationLinks currentPage={currentPage} pageCount={pageCount} basePath="/novyny" />
    </main>
  );
}

