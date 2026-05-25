import React from "react";
import { buildPagination } from "../../utils/buildPagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const scheme = buildPagination(currentPage, totalPages);

  return (
    <div className="flex gap-2 mt-8">
      {scheme.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="px-3 py-1 text-gray-400 select-none"
            >
              ...
            </span>
          );
        }

        const page = Number(item);

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded cursor-pointer ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-neutral-800 text-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
