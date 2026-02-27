import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdsBlock from "@/components/AdsBlock";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedArticles from "@/components/RelatedArticles";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/content/seo-pages";
import { getPublicLawArticleBySlug, getPublicLawArticles } from "@/utils/laws";

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

const STATUS_STYLES: Record<string, string> = {
  "Набрав чинності": "bg-emerald-100 text-emerald-800",
  "Прийнятий": "bg-blue-100 text-blue-800",
  "Законопроєкт": "bg-amber-100 text-amber-800",
};

const LONG_FORM_PARAGRAPHS: string[] = [
  "Ринок імпорту автомобілів в Україну у 2026 році демонструє стабільний попит, але фінальна вигода від покупки напряму залежить від того, наскільки точно власник прогнозує митні платежі. Саме тому юридична та фінансова підготовка перед купівлею авто стала критичною частиною процесу. Якщо на етапі вибору автомобіля не врахувати всі компоненти розмитнення, підсумкова сума може перевищити очікування на тисячі євро. Для практичного планування радимо одразу робити попередній розрахунок через калькулятор та закладати резерв на супутні витрати.",
  "Законодавчі зміни останніх років підвищили вимоги до документального підтвердження ціни, технічних характеристик та походження транспортного засобу. Це означає, що навіть при очевидній ринковій вартості авто митний орган може запитати додаткові пояснення або уточнення. Чим якісніше підготовлений пакет документів, тим нижча ймовірність затримки оформлення. На практиці найкраще працює стратегія, коли покупець ще до оплати авто перевіряє коректність інвойсу, договору, сервісної історії та відповідність VIN-даних у всіх супровідних файлах.",
  "Окремий блок ризиків пов'язаний з недооцінкою строків. Імпорт авто складається з декількох етапів: купівля, логістика, первинна перевірка, митне оформлення, сертифікація та подальша реєстрація. Кожен етап має власні часові рамки та залежить від якості документів. Тому статті про законодавчі оновлення мають не лише інформувати, а й допомагати користувачу складати реалістичний покроковий план дій. Саме така структура контенту позитивно впливає на поведінкові фактори, глибину перегляду та повернення користувачів на сайт.",
  "Для інформаційного проєкту, орієнтованого на монетизацію через Google Ads, критично важливо поєднати експертність і читабельність. Користувач має швидко знайти відповідь, але водночас отримати достатньо контексту для прийняття рішення. Це досягається за рахунок логічних заголовків, чіткої навігації, зрозумілих формул і регулярних внутрішніх переходів до калькулятора. Коли матеріал відповідає пошуковому наміру та закриває типові заперечення, сторінка має вищий потенціал і для органічного трафіку, і для стабільної рекламної дохідності.",
  "Фінансова модель розмитнення у 2026 році залишається прозорою, якщо її розкласти на чотири компоненти: вартість авто, мито, акциз і ПДВ. Найбільше запитань у користувачів виникає щодо акцизу, оскільки він залежить від технічних параметрів і віку автомобіля. Саме тому аналітичні матеріали повинні пояснювати не лише саму формулу, але й типові помилки вводу даних. Наприклад, некоректний рік випуску або невірно вказаний об'єм двигуна здатні суттєво змінити результат. Перед будь-якими фінальними рішеннями варто перевіряти розрахунок повторно.",
  "Окремо варто враховувати, що юридично правильний розрахунок і фактичні витрати на імпорт не завжди тотожні. Крім обов'язкових митних платежів, користувач стикається з банківськими комісіями, витратами на доставку, страховку, брокерський супровід, сертифікацію та реєстраційні дії в Україні. Якісний контент повинен прямо про це говорити, оскільки саме додаткові платежі найчастіше стають джерелом незапланованого перевищення бюджету. Добра практика для читача - формувати бюджет у двох сценаріях: базовому та консервативному.",
  "Під час аналізу законодавчих змін важливо оцінювати не лише ставку податку, а і процедурну частину. Норми можуть залишатися незмінними, але змінюється підхід до перевірок, перелік супровідних документів або порядок взаємодії з митницею. Для користувача це означає, що інформація має бути не разовою, а системно оновлюваною. Саме модель контент-платформи з уніфікованими шаблонами дозволяє оперативно публікувати нові статті та підтримувати релевантність старих матеріалів без втрати SEO-позицій.",
  "З точки зору органічного просування, статті про розмитнення авто ефективно ранжуються, коли вони побудовані на кластері запитів: інформаційних, транзакційних і навігаційних. У межах однієї сторінки корисно поєднувати огляд правил, приклади розрахунків, FAQ і переходи до калькулятора. Такий формат закриває кілька рівнів наміру користувача: від первинного ознайомлення до готовності виконати конкретну дію. Для пасивної рекламної моделі це важливо, бо збільшує глибину скролу, видимість рекламних слотів і середній час на сторінці.",
  "Ще один практичний аспект - регіональна специфіка та відмінності у вихідних даних по авто з різних країн. У статтях доцільно фокусуватися на документах та типовому стані ринку для Польщі, Німеччини та інших популярних напрямків. Це підвищує релевантність контенту для довгих пошукових запитів і дає можливість створювати спеціалізовані сторінки, що працюють як окремі SEO-точки входу. Для масштабування до 100+ матеріалів така деталізація є перевагою, оскільки кожна сторінка покриває власний підкластер теми.",
  "Для стабільних Core Web Vitals важливо, щоб довгі матеріали мали передбачувану структуру та не викликали різких зсувів макета. Резервування місця під рекламні блоки, оптимізація шрифтів і контроль за розміром медіа допомагають уникати проблем із CLS та LCP. У контентних проєктах це безпосередньо впливає на RPM: сторінки, які читаються комфортно на мобільних пристроях, зазвичай мають кращу поведінкову статистику і довший сеанс. Тому технічна якість сторінки має бути частиною SEO-стратегії, а не окремою задачею після запуску.",
  "Важливо також правильно вибудувати внутрішню перелінковку. Кожна новинна стаття повинна містити природні посилання на основні конверсійні сторінки: головний калькулятор, тематичні лендинги та інші релевантні новини. Це допомагає пошуковому роботу краще розуміти структуру сайту, а користувачу - переходити до наступного корисного кроку без зайвого пошуку. На практиці внутрішні посилання бажано додавати у різні частини тексту: вступ, аналітичні блоки та підсумковий розділ із рекомендаціями.",
  "Щоб контент працював довгостроково, у кожній публікації потрібно вказувати дату оновлення та періодично переглядати матеріал після змін у нормативній базі. Такий підхід формує довіру аудиторії і позитивно впливає на повторні переходи з пошуку. Коли читач бачить, що сторінка підтримується в актуальному стані, він охочіше використовує її як базове джерело і повертається до калькулятора для нових сценаріїв розрахунку. Це особливо важливо для ніш із динамічним регулюванням, де застаріла інформація швидко втрачає цінність.",
];

const FAQ_ITEMS = [
  {
    question: "Як часто оновлювати розрахунок вартості розмитнення?",
    answer:
      "Рекомендуємо оновлювати розрахунок перед купівлею авто, перед перетином кордону та перед подачею документів на митницю. Так ви мінімізуєте ризик розбіжностей у бюджеті.",
  },
  {
    question: "Чи достатньо лише онлайн-калькулятора для фінального рішення?",
    answer:
      "Калькулятор є базою для фінансового планування, але фінальне рішення варто приймати з урахуванням документів, логістики, сертифікації та можливих адміністративних витрат.",
  },
  {
    question: "Що робити, якщо митниця просить додаткові документи?",
    answer:
      "Підготуйте підтвердження вартості та технічних характеристик, перевірте відповідність усіх документів між собою і орієнтуйтеся на офіційні роз'яснення митних органів.",
  },
  {
    question: "Які сторінки на сайті варто відвідати після цієї статті?",
    answer:
      "Перейдіть до калькулятора розмитнення на головній сторінці та до тематичних сторінок по країнах імпорту, щоб уточнити свій сценарій і підготувати точний план дій.",
  },
];

export function generateStaticParams() {
  return getPublicLawArticles().map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: NewsArticlePageProps): Metadata {
  const article = getPublicLawArticleBySlug(params.slug);
  if (!article) {
    return {};
  }

  const title = `${article.title} | Новини розмитнення авто 2026`;
  const description = `${article.summary} Ключові зміни: ${article.keyChanges[0] ?? ""}`;

  return {
    title,
    description,
    keywords: article.seoKeywords,
    alternates: {
      canonical: `/novyny/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/novyny/${article.slug}`,
      publishedTime: article.date,
      locale: "uk_UA",
    },
  };
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = getPublicLawArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "uk-UA",
    description: article.summary,
    mainEntityOfPage: `${SITE_URL}/novyny/${article.slug}`,
    keywords: article.seoKeywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Customs Calculator UA",
    },
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd data={jsonLd} />

      <article className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
          <Breadcrumbs
            items={[
              { label: "Головна", href: "/" },
              { label: "Новини", href: "/novyny" },
              { label: article.title },
            ]}
          />
          <p className="text-sm text-slate-500">{article.date}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium text-slate-700">Статус:</span>
            <span
              className={`rounded-full px-3 py-1 font-semibold ${
                STATUS_STYLES[article.status] ?? "bg-slate-100 text-slate-700"
              }`}
            >
              {article.status}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">{article.summary}</p>
          <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <span className="font-semibold">Правова основа:</span> {article.legalBasis}
          </p>
          {article.verificationStatus === "unverified_media" ? (
            <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              Unverified/Media Report: інформація потребує підтвердження в офіційних джерелах.
            </p>
          ) : null}
          <p className="mt-4 text-slate-700">
            Для швидкого практичного розрахунку перейдіть у{" "}
            <Link href="/kalkulyator" className="font-semibold text-brand-600 underline underline-offset-4">
              калькулятор розмитнення авто
            </Link>
            .
          </p>

          <AdsBlock slot="article-top-728x280" />

          <h2 className="mt-10 text-2xl font-semibold text-slate-900">Ключові зміни та їх практичний вплив</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            {article.keyChanges.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-slate-900">Що це означає для власника авто</h3>
          {LONG_FORM_PARAGRAPHS.slice(0, 4).map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}

          <AdsBlock slot="article-mid-1-728x280" />

          <h2 className="mt-10 text-2xl font-semibold text-slate-900">Фінансова модель розмитнення у 2026 році</h2>
          <h3 className="mt-6 text-xl font-semibold text-slate-900">Мито, акциз і ПДВ у єдиній логіці розрахунку</h3>
          {LONG_FORM_PARAGRAPHS.slice(4, 8).map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 leading-8 text-slate-700">
            Перед подачею документів радимо повторно перевіряти цифри у{" "}
            <Link href="/kalkulyator" className="font-semibold text-brand-600 underline underline-offset-4">
              калькуляторі розмитнення
            </Link>{" "}
            та зберігати проміжний кошторис для порівняння з фінальними платежами.
          </p>

          <AdsBlock slot="article-mid-2-728x280" />

          <h2 className="mt-10 text-2xl font-semibold text-slate-900">Стратегія підготовки документів і ризик-менеджмент</h2>
          <h3 className="mt-6 text-xl font-semibold text-slate-900">Як мінімізувати затримки та донарахування</h3>
          {LONG_FORM_PARAGRAPHS.slice(8, 12).map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}

          <AdsBlock slot="article-mid-3-728x280" />

          <h2 className="mt-10 text-2xl font-semibold text-slate-900">FAQ по темі оновлення</h2>
          <div className="mt-4 space-y-4">
            {FAQ_ITEMS.map((faq) => (
              <section key={faq.question} className="rounded-xl border border-slate-200 p-4">
                <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
              </section>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-slate-900">Офіційні джерела</h2>
          <div className="mt-4 space-y-3">
            {article.sources.map((source) => (
              <p key={source.url} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
                Source:{" "}
                <a href={source.url} className="font-semibold text-brand-700 underline underline-offset-4">
                  {source.name}
                </a>
                .
              </p>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-slate-900">Висновок</h2>
          <p className="mt-4 leading-8 text-slate-700">
            Оновлення у сфері розмитнення авто варто сприймати як підставу для більш точного фінансового планування, а не
            як формальність. Якщо працювати з актуальними даними, перевіреними документами та прозорою формулою
            розрахунку, ризик переплати суттєво знижується. Для практичного старту використайте{" "}
            <Link href="/kalkulyator" className="font-semibold text-brand-600 underline underline-offset-4">
              онлайн-калькулятор розмитнення
            </Link>{" "}
            і сформуйте персональний сценарій під ваше авто.
          </p>

          <RelatedArticles currentSlug={article.slug} articles={getPublicLawArticles()} />
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-5">
            <div className="rounded-2xl bg-white p-5 shadow-soft">
              <h2 className="text-base font-semibold text-slate-900">Зміст статті</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Ключові зміни та вплив</li>
                <li>Фінансова модель 2026</li>
                <li>Документи та ризики</li>
                <li>FAQ</li>
                <li>Висновок</li>
              </ul>
            </div>
            <AdsBlock slot="sidebar-300x600" />
          </div>
        </aside>
      </article>
    </main>
  );
}
