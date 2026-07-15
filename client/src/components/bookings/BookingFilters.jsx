import { RotateCcw, Search } from "lucide-react";

import SERVICES from "../../constants/services";

const STATUS_OPTIONS = [
    { value: "", label: "All statuses" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

const BookingFilters = ({
    filters,
    onSearchChange,
    onStatusChange,
    onServiceChange,
    onReset,
}) => {
    const hasActiveFilters = Boolean(
        filters.search ||
        filters.status ||
        filters.serviceType
    );

    return (
        <section
            className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
            aria-label="Booking filters"
        >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(280px,1fr)_220px_220px_auto]">
                <div className="relative">
                    <label
                        htmlFor="bookingSearch"
                        className="sr-only"
                    >
                        Search bookings
                    </label>

                    <Search
                        size={18}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                        id="bookingSearch"
                        type="search"
                        value={filters.search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search customer, phone or vehicle..."
                        className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="bookingStatus"
                        className="sr-only"
                    >
                        Filter by booking status
                    </label>

                    <select
                        id="bookingStatus"
                        value={filters.status}
                        onChange={(event) =>
                            onStatusChange(event.target.value)
                        }
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                    >
                        {STATUS_OPTIONS.map((status) => (
                            <option
                                key={status.value || "all"}
                                value={status.value}
                            >
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="bookingService"
                        className="sr-only"
                    >
                        Filter by service type
                    </label>

                    <select
                        id="bookingService"
                        value={filters.serviceType}
                        onChange={(event) =>
                            onServiceChange(event.target.value)
                        }
                        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
                    >
                        <option value="">All services</option>

                        {SERVICES.map((service) => (
                            <option
                                key={service.value}
                                value={service.value}
                            >
                                {service.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={onReset}
                    disabled={!hasActiveFilters}
                    aria-label="Reset booking filters"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <RotateCcw
                        size={17}
                        aria-hidden="true"
                    />

                    Reset
                </button>
            </div>
        </section>
    );
};

export default BookingFilters;