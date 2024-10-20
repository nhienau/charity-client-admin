import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

function PaginationGroup({ pageInfo, searchParamKey = "page" }) {
  const { pageNo: currPage, totalPages } = pageInfo;
  const [searchParams, setSearchParams] = useSearchParams();

  let adjacentPages = [
    currPage - 2,
    currPage - 1,
    currPage,
    currPage + 1,
    currPage + 2,
  ];

  const showFirstPage = currPage - 1 > 3;
  const showLastPage = totalPages - currPage > 3;
  if (showFirstPage) {
    adjacentPages = adjacentPages.slice(1);
  }
  if (showLastPage) {
    adjacentPages = adjacentPages.slice(0, -1);
  }

  function handleClick(page) {
    searchParams.set(searchParamKey, page);
    setSearchParams(searchParams);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currPage - 1 === 0}
            onClick={() => handleClick(currPage - 1)}
          />
        </PaginationItem>
        {currPage - 1 >= 3 && (
          <>
            <PaginationItem>
              <PaginationLink isActive={false} onClick={() => handleClick(1)}>
                {1}
              </PaginationLink>
            </PaginationItem>
            {currPage - 1 !== 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}
        {adjacentPages.map(
          (p) =>
            p > 0 &&
            p <= totalPages && (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={currPage === p}
                  onClick={() => handleClick(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
        )}
        {totalPages - currPage >= 3 && (
          <>
            {totalPages - currPage !== 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive={false}
                onClick={() => handleClick(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            disabled={currPage + 1 > totalPages}
            onClick={() => handleClick(currPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationGroup;
