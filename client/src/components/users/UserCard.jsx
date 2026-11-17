import { CalendarDays, Mail } from "lucide-react";

import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";

const UserCard = ({
  user,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-neutral-900">
            {user.name}
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
            <Mail size={14} />

            {user.email}
          </div>
        </div>

        <StatusBadge
          status={
            user.isActive
              ? "active"
              : "inactive"
          }
        />
      </div>

      <div className="mt-5 space-y-3">
        <div className="text-sm capitalize text-neutral-600">
          {user.role}
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <CalendarDays size={16} />

          {new Date(
            user.createdAt
          ).toLocaleDateString()}
        </div>
      </div>

      {(canEdit || canDelete) && (
        <div className="mt-6 flex gap-3">
          {canEdit && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => onEdit(user)}
              aria-label={`Edit user ${user.name}`}
            >
              Edit
            </Button>
          )}

          {canDelete && (
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => onDelete(user)}
              aria-label={`Delete user ${user.name}`}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;