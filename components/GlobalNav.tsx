import Link from "next/link";

const NAV_ITEMS = [
  { label: "Головна", href: "/" },
  { label: "Калькулятор", href: "/kalkulyator" },
  { label: "Новини", href: "/novyny" },
  { label: "Статті", href: "/statti" },
];

export default function GlobalNav() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-base font-bold tracking-tight text-slate-900">
          Customs Calculator UA
        </Link>
        <nav aria-label="Global navigation">
          <ul className="flex flex-wrap items-center gap-2 text-sm font-medium sm:gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

