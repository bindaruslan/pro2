import { NextResponse } from "next/server";
import type { AdminLawUpdate } from "@/types/admin";
import { getAllLawArticles } from "@/utils/laws";

function pickCategory(index: number): AdminLawUpdate["metrics"]["mostViewedCategory"] {
  const categories: AdminLawUpdate["metrics"]["mostViewedCategory"][] = [
    "Import Duty",
    "Excise Tax",
    "Diia Integration",
    "VAT",
  ];
  return categories[index % categories.length];
}

export async function GET() {
  const items = getAllLawArticles();

  const data: AdminLawUpdate[] = items.map((item, index) => {
    const clickCount = 120 + index * 23;
    const viewCount = 900 + index * 80;

    return {
      ...item,
      id: item.slug,
      metrics: {
        clickCount,
        viewCount,
        interestRate: Number((clickCount / viewCount).toFixed(3)),
        mostViewedCategory: pickCategory(index),
      },
    };
  });

  return NextResponse.json(data);
}

