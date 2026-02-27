export type FuelType = "petrol" | "diesel" | "electric";

export interface CalculatorInput {
  carPriceEur: number;
  engineVolumeCc: number;
  fuelType: FuelType;
  manufactureYear: number;
}

export interface CalculationResult {
  carPriceEur: number;
  ageCoefficient: number;
  exciseBaseRate: number;
  vatBase: number;
  exciseTax: number;
  importDuty: number;
  vat: number;
  totalCustomsCost: number;
}
