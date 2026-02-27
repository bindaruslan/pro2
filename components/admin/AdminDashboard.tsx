"use client";

import { useEffect, useMemo, useState } from "react";
import UpdateEditor from "@/components/admin/UpdateEditor";
import type { AdminLawUpdate } from "@/types/admin";
import type { LawUpdateStatus } from "@/types/law-update";

export default function AdminDashboard() {
  const [data, setData] = useState<AdminLawUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<LawUpdateStatus | "all">("all");
  const [selected, setSelected] = useState<AdminLawUpdate | null>(null);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await fetch("/api/laws");
        if (!response.ok) {
          throw new Error("Failed to fetch laws.");
        }
        const payload = (await response.json()) as AdminLawUpdate[];
        if (isMounted) {
          setData(payload);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleItems = useMemo(() => {
    const list = data.filter((item) => !removedIds.includes(item.id));
    if (statusFilter === "all") {
      return list;
    }
    return list.filter((item) => item.status === statusFilter);
  }, [data, statusFilter, removedIds]);

  const quickStats = useMemo(() => {
    const list = data.filter((item) => !removedIds.includes(item.id));
    const drafts = list.filter((item) => item.status === "Законопроєкт").length;
    const active = list.length - drafts;
    const official = list.filter((item) => item.verificationStatus === "official").length;
    const reliability = list.length === 0 ? 0 : Math.round((official / list.length) * 100);
    return { total: list.length, drafts, active, reliability };
  }, [data, removedIds]);

  function handleDelete(id: string) {
    setRemovedIds((prev) => [...prev, id]);
    if (selected?.id === id) {
      setSelected(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Адмін-панель контенту</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Керування законодавчими оновленнями, перевірка джерел та базова аналітика інтересу аудиторії.
      </p>

      <section className="mt-6 grid gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Всього оновлень</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{quickStats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Активні норми</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{quickStats.active}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Законопроєкти</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{quickStats.drafts}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Надійність джерел</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">{quickStats.reliability}%</p>
        </div>
      </section>

      <section className="mt-3 rounded-xl bg-white p-4 shadow-soft">
        <p className="mb-2 text-sm text-slate-500">Індикатор Source Reliability</p>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-blue-600" style={{ width: `${quickStats.reliability}%` }} />
        </div>
      </section>

      <section className="mt-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">Як читати аналітику</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>
            <span className="font-semibold">Interest Rate:</span> це співвідношення кліків до переглядів (CTR). Якщо
            показник низький, варто зробити заголовок більш привабливим і конкретним.
          </li>
          <li>
            <span className="font-semibold">Source Reliability:</span> 100% досягається лише тоді, коли всі активні
            новини мають посилання на офіційні державні домени.
          </li>
        </ul>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Список оновлень</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LawUpdateStatus | "all")}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">Усі статуси</option>
              <option value="Набрав чинності">Набрав чинності</option>
              <option value="Прийнятий">Прийнятий</option>
              <option value="Законопроєкт">Законопроєкт</option>
            </select>
          </div>

          {isLoading ? <p className="text-slate-600">Завантаження...</p> : null}
          {hasError ? <p className="text-red-600">Помилка завантаження даних.</p> : null}

          <div className="space-y-3">
            {visibleItems.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                <div className="mt-3 grid gap-1 text-xs text-slate-500 sm:grid-cols-3">
                  <span>Clicks: {item.metrics.clickCount}</span>
                  <span>Interest: {(item.metrics.interestRate * 100).toFixed(1)}%</span>
                  <span>Top: {item.metrics.mostViewedCategory}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Редагувати
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    Видалити
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <UpdateEditor initialValue={selected} />
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">Admin Handbook</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a href="#" className="text-brand-700 hover:underline">
              Як правильно додавати нові закони
            </a>
          </li>
          <li>
            <a href="#" className="text-brand-700 hover:underline">
              Офіційні джерела для моніторингу (Rada, Customs, CMU)
            </a>
          </li>
          <li>
            <a href="#" className="text-brand-700 hover:underline">
              Контакти технічної підтримки
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
