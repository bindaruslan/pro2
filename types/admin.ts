import type { LawUpdate } from "@/types/law-update";

export interface EngagementMetrics {
  clickCount: number;
  viewCount: number;
  interestRate: number;
  mostViewedCategory: "Import Duty" | "Excise Tax" | "Diia Integration" | "VAT";
}

export interface AdminLawUpdate extends LawUpdate {
  id: string;
  metrics: EngagementMetrics;
}

