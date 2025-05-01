"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function DoctorsPagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent className="max-w-md w-full flex flex-wrap justify-center gap-2">
        {/* Prev Button */}
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationLink href={createPageLink(currentPage - 1)}>
              Prev
            </PaginationLink>
          ) : (
            <span className="px-3 py-1 text-muted-foreground cursor-not-allowed">
              Prev
            </span>
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                href={createPageLink(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationLink href={createPageLink(currentPage + 1)}>
              Next
            </PaginationLink>
          ) : (
            <span className="px-3 py-1 text-muted-foreground cursor-not-allowed">
              Next
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
