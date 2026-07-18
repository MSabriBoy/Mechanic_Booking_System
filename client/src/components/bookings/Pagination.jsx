import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  pagination,
  onPageChange,
  disabled = false,
}) => {
  const {
    page = 1,
    total = 0,
    totalPages = 1,
    hasNextPage = false,
    hasPreviousPage = false,
  } = pagination;

  const currentPage = Number(page);

  if (total === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      aria-label="Booking pagination"
    >
      <p className="text-center text-sm text-neutral-500 sm:text-left">
        Page{" "}
        <span className="font-medium text-neutral-900">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-medium text-neutral-900">
          {totalPages}
        </span>
        {" · "}
        {total} total bookings
      </p>

      <div className="grid grid-cols-2 gap-3 sm:flex">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage || disabled}
          aria-label="Go to previous bookings page"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft
            size={17}
            aria-hidden="true"
          />

          Previous
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || disabled}
          aria-label="Go to next bookings page"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next

          <ChevronRight
            size={17}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;