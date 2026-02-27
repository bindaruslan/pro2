import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorForm from "@/components/CalculatorForm";

export const metadata: Metadata = {
  title: "Калькулятор розмитнення авто 2026",
  description: "Інформаційний калькулятор розмитнення авто в Україні: мито, акциз, ПДВ і підсумкова сума.",
  alternates: {
    canonical: "/kalkulyator",
  },
};

export default function CalculatorPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Breadcrumbs items={[{ label: "Головна", href: "/" }, { label: "Калькулятор" }]} />
      <section className="mb-8 rounded-3xl bg-white p-6 shadow-soft sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Калькулятор розмитнення авто</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Вкажіть параметри авто, щоб отримати орієнтовний розрахунок митних платежів за актуальною формулою.
        </p>
      </section>
      <CalculatorForm />
    </main>
  );
}

