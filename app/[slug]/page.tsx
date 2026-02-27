import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageTemplate from "@/components/LandingPageTemplate";
import JsonLd from "@/components/seo/JsonLd";
import { LANDING_PAGE_MAP, LANDING_PAGES, SITE_URL } from "@/content/seo-pages";

interface LandingPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: LandingPageProps): Metadata {
  const page = LANDING_PAGE_MAP[params.slug];
  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/${page.slug}`,
      type: "article",
      locale: "uk_UA",
    },
  };
}

export default function LandingPage({ params }: LandingPageProps) {
  const page = LANDING_PAGE_MAP[params.slug];

  if (!page) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: "uk-UA",
    mainEntityOfPage: `${SITE_URL}/${page.slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <LandingPageTemplate page={page} />
    </>
  );
}

