"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const PaginationComponent = ({ paginationDetails }) => {
  const router = useRouter();

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > paginationDetails.totalPages) return;

    router.push(
      `?page=${encodeURIComponent(pageNumber)}&limit=${paginationDetails.currentLimit}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const renderPageNumbers = () => {
    const maxButtons = 4;
    const startPageIndex = Math.max(1, paginationDetails.currentPage - 3);
    const endPageIndex = Math.min(
      startPageIndex + maxButtons - 1,
      paginationDetails.totalPages
    );

    let buttons = [];

    for (
      let pageIndex = startPageIndex;
      pageIndex <= endPageIndex;
      pageIndex++
    ) {
      buttons.push(
        <PaginationItem key={pageIndex}>
          <PaginationLink
            onClick={() => handlePageChange(pageIndex)}
            isActive={pageIndex === paginationDetails.currentPage}
            className={`
              ${
                pageIndex === paginationDetails.currentPage
                  ? "dark:bg-dark-dencity-600"
                  : ""
              } cursor-pointer`}
          >
            {pageIndex}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return buttons;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(paginationDetails.currentPage - 1)}
            className={`${paginationDetails.currentPage === 1 ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"}`}
          />
        </PaginationItem>
        {(renderPageNumbers() || []).map((button, index) => button)}
        {paginationDetails.totalPages > 4 &&
          paginationDetails.totalPages !== paginationDetails.currentPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(paginationDetails.currentPage + 1)}
            className={`${paginationDetails.currentPage === paginationDetails.totalPages ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
