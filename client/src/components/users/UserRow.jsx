import { Pencil, Trash2 } from "lucide-react";

import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";

const UserRow = ({
  user,
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
            {user.name}
          </p>

          <p className="text-sm text-neutral-500">
            {user.email}
          </p>
        </div>
      </td>

      <td className="px-6 py-4 capitalize">
        {user.role}
      </td>

      <td className="px-6 py-4">
        <StatusBadge
          status={
            user.isActive
              ? "active"
              : "inactive"
          }
        />
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(
          user.createdAt
        ).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        {canEdit || canDelete ? (
          <div className="flex justify-center gap-2">
            {canEdit && (
              <Button
                variant="secondary"
                className="p-2"
                onClick={() => onEdit(user)}
                aria-label={`Edit user ${user.name}`}
              >
                <Pencil
                  size={16}
                  aria-hidden="true"
                />
              </Button>
            )}

            {canDelete && (
              <Button
                variant="danger"
                className="p-2"
                onClick={() => onDelete(user)}
                aria-label={`Delete user ${user.name}`}
              >
                <Trash2
                  size={16}
                  aria-hidden="true"
                />
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

export default UserRow;