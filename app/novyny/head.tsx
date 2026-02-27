import { getArticlePageCount } from "@/utils/laws";

export default function Head() {
  const pageCount = getArticlePageCount();

  return (
    <>
      {pageCount > 1 ? <link rel="next" href="/novyny/page/2" /> : null}
    </>
  );
}

