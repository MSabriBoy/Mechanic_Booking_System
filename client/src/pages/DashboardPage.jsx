import DashboardLayout from "../layouts/DashboardLayout";

import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";

import StatCard from "../components/dashboard/StatCard";

import useBookings from "../hooks/useBookings";

const DashboardPage = () => {
  const { bookings, loading } = useBookings();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  const stats = {
    total: bookings.length,

    pending: bookings.filter(
      (booking) => booking.status === "pending"
    ).length,

    confirmed: bookings.filter(
      (booking) => booking.status === "confirmed"
    ).length,

    progress: bookings.filter(
      (booking) => booking.status === "in_progress"
    ).length,

    completed: bookings.filter(
      (booking) => booking.status === "completed"
    ).length,
  };

  return (
    <DashboardLayout>
      <main className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Dashboard
          </h1>

          <p className="mt-2 text-neutral-500">
            Overview of workshop bookings.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total"
            value={stats.total}
          />

          <StatCard
            title="Pending"
            value={stats.pending}
          />

          <StatCard
            title="Confirmed"
            value={stats.confirmed}
          />

          <StatCard
            title="In Progress"
            value={stats.progress}
          />

          <StatCard
            title="Completed"
            value={stats.completed}
          />
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            title="No bookings found"
            description="Create your first booking to get started."
          />
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-6">
              <h2 className="text-lg font-semibold">
                Recent Bookings
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Vehicle
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings
                    .slice(0, 5)
                    .map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-t border-neutral-200"
                      >
                        <td className="px-6 py-4">
                          {booking.customerName}
                        </td>

                        <td className="px-6 py-4">
                          {booking.vehicleRegistration}
                        </td>

                        <td className="px-6 py-4 capitalize">
                          {booking.status.replaceAll(
                            "_",
                            " "
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export default DashboardPage;