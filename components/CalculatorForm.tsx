"use client";

import { useMemo, useState } from "react";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import ResultBreakdown from "@/components/ui/ResultBreakdown";
import { CalculatorInput, FuelType } from "@/types/calculator";
import { calculateCustoms } from "@/utils/calculate";

type FormState = {
  carPriceEur: string;
  engineVolumeCc: string;
  fuelType: FuelType;
  manufactureYear: string;
};

const currentYear = new Date().getFullYear();

function toNumber(value: string): number {
  return Number(value.replace(",", "."));
}

function validate(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  const carPrice = toNumber(state.carPriceEur);
  if (!state.carPriceEur || Number.isNaN(carPrice) || carPrice <= 0) {
    errors.carPriceEur = "Вкажіть коректну вартість авто.";
  }

  if (state.fuelType !== "electric") {
    const engineVolume = toNumber(state.engineVolumeCc);
    if (!state.engineVolumeCc || Number.isNaN(engineVolume) || engineVolume < 600 || engineVolume > 10000) {
      errors.engineVolumeCc = "Об'єм двигуна має бути в межах 600-10000 cc.";
    }
  }

  const year = toNumber(state.manufactureYear);
  if (!state.manufactureYear || Number.isNaN(year) || year < 1990 || year > currentYear) {
    errors.manufactureYear = `Рік має бути в межах 1990-${currentYear}.`;
  }

  return errors;
}

export default function CalculatorForm() {
  const [form, setForm] = useState<FormState>({
    carPriceEur: "",
    engineVolumeCc: "",
    fuelType: "petrol",
    manufactureYear: String(currentYear - 5),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) {
      return null;
    }

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      return null;
    }

    const payload: CalculatorInput = {
      carPriceEur: toNumber(form.carPriceEur),
      engineVolumeCc: form.fuelType === "electric" ? 0 : toNumber(form.engineVolumeCc),
      fuelType: form.fuelType,
      manufactureYear: toNumber(form.manufactureYear),
    };

    return calculateCustoms(payload, { currentYear });
  }, [form, submitted]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setSubmitted(true);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-2xl font-semibold">Введіть параметри авто</h2>
        <form className="mt-6 grid gap-5" onSubmit={handleSubmit} noValidate>
          <InputField
            label="Вартість авто (EUR)"
            name="carPriceEur"
            value={form.carPriceEur}
            onChange={handleInputChange}
            placeholder="Наприклад, 8500"
            min={1}
            error={errors.carPriceEur}
          />

          <SelectField
            label="Тип пального"
            name="fuelType"
            value={form.fuelType}
            onChange={handleInputChange}
            options={[
              { value: "petrol", label: "Бензин" },
              { value: "diesel", label: "Дизель" },
              { value: "electric", label: "Електро" },
            ]}
          />

          <InputField
            label="Об'єм двигуна (cc)"
            name="engineVolumeCc"
            value={form.engineVolumeCc}
            onChange={handleInputChange}
            placeholder={form.fuelType === "electric" ? "Для електро не потрібно" : "Наприклад, 1998"}
            min={0}
            step={1}
            error={errors.engineVolumeCc}
          />

          <InputField
            label="Рік випуску"
            name="manufactureYear"
            value={form.manufactureYear}
            onChange={handleInputChange}
            min={1990}
            max={currentYear}
            step={1}
            error={errors.manufactureYear}
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-brand-500 px-5 py-3 text-base font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-100"
          >
            Розрахувати
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-5">
        {result ? (
          <ResultBreakdown result={result} />
        ) : (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow-soft sm:p-8">
            Введіть дані та натисніть "Розрахувати", щоб отримати деталізацію платежів.
          </div>
        )}

        <div className="rounded-2xl bg-white p-6 shadow-soft sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900">Корисні матеріали</h3>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li>
              <a href="/novyny" className="font-medium text-brand-700 hover:underline">
                Новини та законодавчі оновлення
              </a>
            </li>
            <li>
              <a href="/statti" className="font-medium text-brand-700 hover:underline">
                Тематичні статті по розмитненню
              </a>
            </li>
            <li>
              <a href="/" className="font-medium text-brand-700 hover:underline">
                Повернутися на головну сторінку
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

