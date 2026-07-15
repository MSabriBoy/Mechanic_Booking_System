import { Plus } from "lucide-react";

import Button from "../common/Button";

const BookingToolbar = ({ canCreate = false, onCreate }) => {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Bookings
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Manage workshop bookings and appointments.
          </p>
        </div>

        {canCreate && (
          <Button
            onClick={onCreate}
            className="w-full sm:w-auto"
          >
            <Plus size={18} aria-hidden="true" />
            <span>New Booking</span>
          </Button>
        )}
      </div>
    </section>
  );
};

export default BookingToolbar;