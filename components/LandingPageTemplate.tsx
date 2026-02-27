import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { SeoPageContent } from "@/types/seo";

interface LandingPageTemplateProps {
  page: SeoPageContent;
}

export default function LandingPageTemplate({ page }: LandingPageTemplateProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          { label: "Статті", href: "/statti" },
          { label: page.h1 },
        ]}
      />

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{page.h1}</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-600 sm:text-lg">{page.intro}</p>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-900">Що ви знайдете на цій сторінці</h2>
        <ol className="mt-5 space-y-3 text-slate-700">
          {page.outline.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-3xl bg-slate-900 p-6 text-slate-100 shadow-soft sm:p-10">
        <h2 className="text-2xl font-semibold">Пов'язані розділи</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Додаткові інформаційні сторінки для детального вивчення теми та самостійного розрахунку.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          <li>
            <Link href="/kalkulyator" className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700">
              Калькулятор розмитнення
            </Link>
          </li>
          <li>
            <Link href="/novyny" className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700">
              Новини законодавства
            </Link>
          </li>
          <li className="sm:col-span-2">
            <Link href="/statti" className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700">
              Всі тематичні статті
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
