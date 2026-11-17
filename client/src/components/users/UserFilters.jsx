import { RotateCcw, Search } from "lucide-react";

const ROLE_OPTIONS = [
  { value: "", label: "All roles" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

const UserFilters = ({
  filters,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onReset,
}) => {
  const hasActiveFilters = Boolean(
    filters.search ||
    filters.role ||
    filters.isActive
  );

  return (
    <section
      className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="User filters"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(280px,1fr)_220px_220px_auto]">
        <div className="relative">
          <label
            htmlFor="userSearch"
            className="sr-only"
          >
            Search users
          </label>

          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            id="userSearch"
            type="search"
            value={filters.search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
          />
        </div>

        <div>
          <label
            htmlFor="userRole"
            className="sr-only"
          >
            Filter by role
          </label>

          <select
            id="userRole"
            value={filters.role}
            onChange={(event) =>
              onRoleChange(event.target.value)
            }
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
          >
            {ROLE_OPTIONS.map((role) => (
              <option
                key={role.value || "all"}
                value={role.value}
              >
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="userStatus"
            className="sr-only"
          >
            Filter by account status
          </label>

          <select
            id="userStatus"
            value={filters.isActive}
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

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          aria-label="Reset user filters"
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

export default UserFilters;