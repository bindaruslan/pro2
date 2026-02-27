import { getArticlePageCount } from "@/utils/laws";

interface HeadProps {
  params: {
    page: string;
  };
}

export default function Head({ params }: HeadProps) {
  const currentPage = Number(params.page);
  const pageCount = getArticlePageCount();

  if (!Number.isInteger(currentPage) || currentPage < 2 || currentPage > pageCount) {
    return null;
  }

  const prevHref = currentPage === 2 ? "/novyny" : `/novyny/page/${currentPage - 1}`;
  const nextHref = currentPage < pageCount ? `/novyny/page/${currentPage + 1}` : null;

  return (
    <>
      <link rel="prev" href={prevHref} />
      {nextHref ? <link rel="next" href={nextHref} /> : null}
    </>
  );
}

