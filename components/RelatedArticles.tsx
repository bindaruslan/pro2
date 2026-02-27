import Link from "next/link";
import type { LawArticle } from "@/utils/laws";

interface RelatedArticlesProps {
  currentSlug: string;
  articles: LawArticle[];
}

export default function RelatedArticles({ currentSlug, articles }: RelatedArticlesProps) {
  const related = articles.filter((article) => article.slug !== currentSlug).slice(0, 4);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold text-slate-900">Схожі статті</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.map((article) => (
          <li key={article.slug} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">{article.date}</p>
            <Link href={`/novyny/${article.slug}`} className="mt-1 block font-medium text-slate-900 hover:text-brand-700">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link href="/kalkulyator" className="text-brand-700 hover:underline">
          Перейти до калькулятора
        </Link>
        <Link href="/novyny" className="text-brand-700 hover:underline">
          Всі новини
        </Link>
      </div>
    </section>
  );
}

