export type LawUpdateStatus = "Набрав чинності" | "Прийнятий" | "Законопроєкт";

export type VerificationStatus = "official" | "unverified_media";

export interface LawSource {
  name: string;
  url: string;
}

export interface LawUpdate {
  title: string;
  summary: string;
  date: string;
  legalBasis: string;
  status: LawUpdateStatus;
  keyChanges: string[];
  seoKeywords: string[];
  sources: LawSource[];
  verificationStatus: VerificationStatus;
}

