import { CalendarDays, CarFront, Phone } from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";

import { getServiceLabel } from "../../constants/services";

const BookingCard = ({
  booking,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-neutral-900">
            {booking.customerName}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
            <Phone size={14} />

            {booking.customerPhone}
          </div>
        </div>

        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <CarFront size={16} />

          <span>
            {booking.vehicleRegistration}
          </span>
        </div>

        <div className="text-sm text-neutral-600">
          {booking.vehicleMake} {booking.vehicleModel}
        </div>

        <div className="text-sm capitalize text-neutral-600">
          {getServiceLabel(booking.serviceType)}
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <CalendarDays size={16} />

          {new Date(
            booking.appointmentDate
          ).toLocaleDateString()}
        </div>
      </div>

      {(canEdit || canDelete) && (
        <div className="mt-6 flex gap-3">
          {canEdit && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => onEdit(booking)}
              aria-label={`Edit booking for ${booking.customerName}`}
            >
              Edit
            </Button>
          )}

          {canDelete && (
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => onDelete(booking)}
              aria-label={`Delete booking for ${booking.customerName}`}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingCard;