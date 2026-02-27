import { CalculationResult } from "@/types/calculator";

interface ResultBreakdownProps {
  result: CalculationResult;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ResultBreakdown({ result }: ResultBreakdownProps) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 text-slate-100 shadow-soft sm:p-8">
      <h2 className="text-xl font-semibold">Деталізація розрахунку</h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <dt className="text-slate-300">Акциз</dt>
          <dd className="font-medium">{formatCurrency(result.exciseTax)}</dd>
        </div>

        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <dt className="text-slate-300">Мито (10%)</dt>
          <dd className="font-medium">{formatCurrency(result.importDuty)}</dd>
        </div>

        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <dt className="text-slate-300">ПДВ (20%)</dt>
          <dd className="font-medium">{formatCurrency(result.vat)}</dd>
        </div>

        <div className="flex items-center justify-between pt-2">
          <dt className="text-lg font-semibold">Загальна вартість</dt>
          <dd className="text-lg font-bold text-emerald-300">{formatCurrency(result.totalCustomsCost)}</dd>
        </div>
      </dl>
    </div>
  );
}
