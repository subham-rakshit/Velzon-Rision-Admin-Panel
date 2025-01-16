"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const PaginationComponent = ({ paginationDetails }) => {
  const router = useRouter();

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > paginationDetails.totalPages) return;

    router.push(
      `?page=${encodeURIComponent(pageNumber)}&pageSize=${paginationDetails.currentLimit}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleSelectRowsPerPage = (value) => {
    router.push(`?page=1&pageSize=${encodeURIComponent(value)}`, undefined, {
      shallow: true,
    });
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
              } cursor-pointer text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-800`}
          >
            {pageIndex}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-400">
          Rows
        </span>
        <Select
          value={parseInt(paginationDetails.currentLimit) || 9}
          onValueChange={(value) => handleSelectRowsPerPage(value)}
        >
          <SelectTrigger className="w-fit border dark:border-[#fff]/10">
            <SelectValue
              placeholder="--"
              className="font-poppins-rg text-[13px]"
            />
          </SelectTrigger>
          <SelectContent
            className={`w-fit ${globalStyleObj.backgroundLight900Dark300} z-[99]`}
          >
            <SelectGroup className="font-poppins-rg text-[13px] text-dark-weight-400 dark:text-light-weight-800">
              <SelectLabel className="text-dark-weight-600 dark:text-light-weight-800">
                Rows
              </SelectLabel>
              <SelectItem value={1}>1</SelectItem>
              <SelectItem value={9}>9</SelectItem>
              <SelectItem value={12}>12</SelectItem>
              <SelectItem value={15}>15</SelectItem>
              <SelectItem value={18}>18</SelectItem>
              <SelectItem value={21}>21</SelectItem>
              <SelectItem value={24}>24</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handlePageChange(paginationDetails.currentPage - 1)
              }
              className={`${paginationDetails.currentPage === 1 ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} bg-[#000]/10 text-[13px] font-poppins-rg text-dark-weight-400 dark:text-light-weight-800`}
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
              onClick={() =>
                handlePageChange(paginationDetails.currentPage + 1)
              }
              className={`${paginationDetails.currentPage === paginationDetails.totalPages ? "cursor-not-allowed line-through opacity-50" : "cursor-pointer"} bg-[#000]/10 text-[13px] font-poppins-rg text-dark-weight-400 dark:text-light-weight-800`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationComponent;
