interface InputFieldProps {
  label: string;
  name: string;
  type?: "number" | "text";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function InputField({
  label,
  name,
  type = "number",
  value,
  onChange,
  error,
  placeholder,
  min,
  max,
  step,
}: InputFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        inputMode={type === "number" ? "decimal" : "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
      />
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
