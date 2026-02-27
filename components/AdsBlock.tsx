interface AdsBlockProps {
  slot: string;
  label?: string;
}

export default function AdsBlock({ slot, label = "Рекламний блок" }: AdsBlockProps) {
  return (
    <aside
      aria-label={label}
      className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ad Slot</div>
      <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-center text-sm text-slate-500">
        Google Ads Placeholder: {slot}
      </div>
    </aside>
  );
}

