interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inlined for search engine parsing.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

