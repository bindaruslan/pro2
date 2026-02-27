import { CalculatorInput, CalculationResult } from "@/types/calculator";

const IMPORT_DUTY_RATE = 0.1;
const VAT_RATE = 0.2;

const EXCISE_BASE_RATES_PER_CC: Record<CalculatorInput["fuelType"], number> = {
  petrol: 50,
  diesel: 75,
  electric: 0,
};

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export interface CalculateCustomsOptions {
  currentYear: number;
  exciseBaseRatesPerCc?: Partial<Record<CalculatorInput["fuelType"], number>>;
}

/**
 * Pure Ukrainian customs calculator (2026 logic).
 *
 * Rules:
 * - Import duty = 10% of car price
 * - Excise = engine volume (cc) * base rate * age coefficient
 * - Age coefficient = current year - manufacture year (minimum 0)
 * - VAT = 20% of (price + duty + excise)
 *
 * The function is deterministic and has no hidden time/system dependencies.
 */
export function calculateCustoms(
  input: CalculatorInput,
  options: CalculateCustomsOptions
): CalculationResult {
  const baseRates = {
    ...EXCISE_BASE_RATES_PER_CC,
    ...options.exciseBaseRatesPerCc,
  };
  const ageCoefficient = Math.max(0, options.currentYear - input.manufactureYear);
  const exciseBaseRate = baseRates[input.fuelType] ?? 0;
  const importDuty = roundCurrency(input.carPriceEur * IMPORT_DUTY_RATE);
  const exciseTax = roundCurrency(input.engineVolumeCc * exciseBaseRate * ageCoefficient);
  const vatBase = roundCurrency(input.carPriceEur + importDuty + exciseTax);
  const vat = roundCurrency(vatBase * VAT_RATE);

  return {
    carPriceEur: roundCurrency(input.carPriceEur),
    ageCoefficient,
    exciseBaseRate,
    vatBase,
    exciseTax,
    importDuty,
    vat,
    totalCustomsCost: roundCurrency(importDuty + exciseTax + vat),
  };
}
