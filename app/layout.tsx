import type { Metadata } from "next";
import Link from "next/link";
import GlobalNav from "@/components/GlobalNav";
import { SITE_URL } from "@/content/seo-pages";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Розмитнення авто калькулятор 2026 | Україна",
    template: "%s | Розмитнення авто 2026",
  },
  description: "Онлайн-калькулятор розмитнення авто в Україні у 2026 році.",
  keywords: [
    "розмитнення авто",
    "калькулятор розмитнення",
    "розмитнення авто калькулятор 2026",
    "мито авто Україна",
    "акциз авто",
    "ПДВ авто",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Розмитнення авто калькулятор 2026 | Україна",
    description: "Розрахуйте акциз, мито, ПДВ і повну вартість розмитнення авто онлайн.",
    type: "website",
    locale: "uk_UA",
    siteName: "Customs Calculator UA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <GlobalNav />
        {children}
        <footer className="mt-12 border-t border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-600 sm:px-6">
            <p>Інформаційний сайт про розмитнення авто в Україні.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kalkulyator" className="hover:text-slate-900">
                Калькулятор
              </Link>
              <Link href="/novyny" className="hover:text-slate-900">
                Новини
              </Link>
              <Link href="/statti" className="hover:text-slate-900">
                Статті
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
