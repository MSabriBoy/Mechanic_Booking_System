import UserCard from "./UserCard";
import UserRow from "./UserRow";

import EmptyState from "../common/EmptyState";

const UserTable = ({
  users,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) => {
  if (!users.length) {
    return (
      <EmptyState
        title="No users found"
        description="Create your first user."
      />
    );
  }

  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 lg:hidden">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            canEdit={canEdit}
            canDelete={canDelete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop */}

      <div className="hidden overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Created
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserTable;