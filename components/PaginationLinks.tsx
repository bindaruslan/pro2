import Link from "next/link";

interface PaginationLinksProps {
  currentPage: number;
  pageCount: number;
  basePath: string;
}

function pageHref(page: number, basePath: string): string {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

export default function PaginationLinks({ currentPage, pageCount, basePath }: PaginationLinksProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-8">
      <ul className="flex flex-wrap items-center gap-2">
        {currentPage > 1 ? (
          <li>
            <Link
              href={pageHref(currentPage - 1, basePath)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Попередня
            </Link>
          </li>
        ) : null}

        {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
          <li key={page}>
            <Link
              href={pageHref(page, basePath)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm ${
                page === currentPage
                  ? "bg-brand-600 font-semibold text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {currentPage < pageCount ? (
          <li>
            <Link
              href={pageHref(currentPage + 1, basePath)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Наступна
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

