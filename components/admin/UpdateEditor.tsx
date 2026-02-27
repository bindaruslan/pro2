"use client";

import { useEffect, useState } from "react";
import type { AdminLawUpdate } from "@/types/admin";
import type { LawUpdateStatus, VerificationStatus } from "@/types/law-update";

interface UpdateEditorProps {
  initialValue?: AdminLawUpdate | null;
}

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
      {label}
      {hint ? (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-500"
          title={hint}
          aria-label={hint}
        >
          i
        </span>
      ) : null}
    </span>
  );
}

export default function UpdateEditor({ initialValue }: UpdateEditorProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [legalBasis, setLegalBasis] = useState("");
  const [status, setStatus] = useState<LawUpdateStatus>("Законопроєкт");
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("official");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [keyChangesText, setKeyChangesText] = useState("");
  const [seoKeywordsText, setSeoKeywordsText] = useState("");
  const [validationState, setValidationState] = useState<{
    loading: boolean;
    message: string;
    active: boolean | null;
  }>({ loading: false, message: "", active: null });
  const [saveSummaryAccepted, setSaveSummaryAccepted] = useState(false);

  const sourceUrlTrimmed = sourceUrl.trim();
  const isSourceUrlValid = /^https?:\/\/.+/i.test(sourceUrlTrimmed);
  const showTrustWarning = !sourceUrlTrimmed || !isSourceUrlValid;

  useEffect(() => {
    if (!initialValue) {
      return;
    }

    setTitle(initialValue.title);
    setSummary(initialValue.summary);
    setDate(initialValue.date);
    setLegalBasis(initialValue.legalBasis);
    setStatus(initialValue.status);
    setVerificationStatus(initialValue.verificationStatus);
    setSourceName(initialValue.sources[0]?.name ?? "");
    setSourceUrl(initialValue.sources[0]?.url ?? "");
    setKeyChangesText(initialValue.keyChanges.join("\n"));
    setSeoKeywordsText(initialValue.seoKeywords.join(", "));
    setValidationState({ loading: false, message: "", active: null });
    setSaveSummaryAccepted(false);
  }, [initialValue]);

  async function handleValidateSource() {
    if (!sourceUrl.trim()) {
      setValidationState({ loading: false, message: "Вкажіть URL джерела.", active: null });
      return;
    }

    setValidationState({ loading: true, message: "Перевірка джерела...", active: null });
    try {
      const response = await fetch(`/api/validate-source?url=${encodeURIComponent(sourceUrl.trim())}`);
      const payload = (await response.json()) as { active: boolean; message: string };
      setValidationState({ loading: false, message: payload.message, active: payload.active });
    } catch {
      setValidationState({ loading: false, message: "Не вдалося перевірити джерело.", active: false });
    }
  }

  function handleSaveDraft() {
    const keyChanges = keyChangesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const seoKeywords = seoKeywordsText
      .split(",")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      title,
      summary,
      date,
      legalBasis,
      status,
      verificationStatus,
      sources: [{ name: sourceName, url: sourceUrl }],
      keyChanges,
      seoKeywords,
    };

    console.log("Draft payload:", payload);
    alert("Чернетку збережено локально (демо режим).");
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-slate-900">Редактор оновлення</h2>
      <p className="mt-2 text-sm text-slate-600">
        Заповнюйте поля послідовно. Підказки біля полів допоможуть уникнути типових помилок.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="grid gap-2">
          <FieldLabel label="Заголовок" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <label className="grid gap-2">
          <FieldLabel label="Короткий опис" />
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="min-h-[90px] rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <FieldLabel label="Дата" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="grid gap-2">
            <FieldLabel
              label="Статус"
              hint="Набрав чинності: новина видима для всіх. Законопроєкт: матеріал публікується з позначкою Draft."
            />
            <select value={status} onChange={(e) => setStatus(e.target.value as LawUpdateStatus)} className="rounded-lg border border-slate-300 px-3 py-2">
              <option value="Набрав чинності">Набрав чинності</option>
              <option value="Прийнятий">Прийнятий</option>
              <option value="Законопроєкт">Законопроєкт</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <FieldLabel label="Правова основа" hint="Вкажіть формальний ідентифікатор акта, наприклад: Закон №1234." />
          <input value={legalBasis} onChange={(e) => setLegalBasis(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <FieldLabel label="Назва джерела" />
            <input value={sourceName} onChange={(e) => setSourceName(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="grid gap-2">
            <FieldLabel
              label="Direct URL"
              hint="Для максимальної SEO-довіри використовуйте прямі посилання на zakon.rada.gov.ua."
            />
            <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" />
            {showTrustWarning ? (
              <span className="text-sm text-amber-700">
                Без офіційного посилання довіра користувачів знижується на 40%.
              </span>
            ) : null}
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Тип верифікації</span>
          <select
            value={verificationStatus}
            onChange={(e) => setVerificationStatus(e.target.value as VerificationStatus)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="official">official</option>
            <option value="unverified_media">unverified_media</option>
          </select>
        </label>

        <label className="grid gap-2">
          <FieldLabel label="Ключові зміни (кожен пункт з нового рядка)" />
          <textarea
            value={keyChangesText}
            onChange={(e) => setKeyChangesText(e.target.value)}
            className="min-h-[120px] rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="grid gap-2">
          <FieldLabel
            label="SEO ключові слова (через кому)"
            hint="Ці ключові слова допомагають користувачам знайти саме це оновлення через Google."
          />
          <input
            value={seoKeywordsText}
            onChange={(e) => setSeoKeywordsText(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleValidateSource}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            {validationState.loading ? "Перевіряємо..." : "Валідувати джерело"}
          </button>
          {validationState.message ? (
            <span className={`text-sm ${validationState.active ? "text-emerald-700" : "text-amber-700"}`}>
              {validationState.message}
            </span>
          ) : null}
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Ця новина з'явиться у розділі "Останні зміни" та буде доступна 5000+ користувачам.
          <label className="mt-3 flex items-start gap-2">
            <input
              type="checkbox"
              checked={saveSummaryAccepted}
              onChange={(event) => setSaveSummaryAccepted(event.target.checked)}
              className="mt-0.5"
            />
            <span>Підтверджую, що дані перевірені перед збереженням.</span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={!saveSummaryAccepted}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Зберегти зміни
        </button>
      </div>
    </section>
  );
}
