import { Pencil, Trash2 } from "lucide-react";

import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";

import { getServiceLabel } from "../../constants/services";

const BookingRow = ({
  booking,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-t border-neutral-200 hover:bg-neutral-50">
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-neutral-900">
            {booking.customerName}
          </p>

          <p className="text-sm text-neutral-500">
            {booking.customerPhone}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="font-medium">
            {booking.vehicleRegistration}
          </p>

          <p className="text-sm text-neutral-500">
            {booking.vehicleMake} {booking.vehicleModel}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 capitalize">
        {getServiceLabel(booking.serviceType)}
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={booking.status} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(
          booking.appointmentDate
        ).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        {(canEdit || canDelete) ? (
          <div className="flex justify-center gap-2">
            {canEdit && (
              <Button
                variant="secondary"
                className="p-2"
                onClick={() => onEdit(booking)}
                aria-label={`Edit booking for ${booking.customerName}`}
              >
                <Pencil size={16} aria-hidden="true" />
              </Button>
            )}

            {canDelete && (
              <Button
                variant="danger"
                className="p-2"
                onClick={() => onDelete(booking)}
                aria-label={`Delete booking for ${booking.customerName}`}
              >
                <Trash2 size={16} aria-hidden="true" />
              </Button>
            )}
          </div>
        ) : (
          <span className="block text-center text-sm text-neutral-400">
            No actions
          </span>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;