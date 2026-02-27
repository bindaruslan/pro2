import { LAW_UPDATES } from "@/content/laws";
import { LawUpdate } from "@/types/law-update";

export interface LawArticle extends LawUpdate {
  slug: string;
}

export const ARTICLES_PER_PAGE = 10;

function slugify(value: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "",
    ю: "yu",
    я: "ya",
  };

  return value
    .toLowerCase()
    .split("")
    .map((char) => map[char] ?? char)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getAllLawArticles(): LawArticle[] {
  return LAW_UPDATES.map((item) => ({
    ...item,
    slug: slugify(item.title),
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPublicLawArticles(): LawArticle[] {
  return getAllLawArticles().filter((item) => item.status !== "Законопроєкт");
}

export function getLawArticleBySlug(slug: string): LawArticle | undefined {
  return getAllLawArticles().find((item) => item.slug === slug);
}

export function getPublicLawArticleBySlug(slug: string): LawArticle | undefined {
  return getPublicLawArticles().find((item) => item.slug === slug);
}

export function getArticlePageCount(): number {
  return Math.max(1, Math.ceil(getPublicLawArticles().length / ARTICLES_PER_PAGE));
}

export function getArticlesByPage(page: number): LawArticle[] {
  const all = getPublicLawArticles();
  const offset = (page - 1) * ARTICLES_PER_PAGE;
  return all.slice(offset, offset + ARTICLES_PER_PAGE);
}

export function getPaginationPages(): number[] {
  const pageCount = getArticlePageCount();
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}
