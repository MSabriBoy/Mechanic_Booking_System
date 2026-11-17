import { Plus } from "lucide-react";

import Button from "../common/Button";

const UserToolbar = ({ canCreate = false, onCreate }) => {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Manage user accounts and permissions.
          </p>
        </div>

        {canCreate && (
          <Button
            onClick={onCreate}
            className="w-full sm:w-auto"
          >
            <Plus size={18} aria-hidden="true" />
            <span>New User</span>
          </Button>
        )}
      </div>
    </section>
  );
};

export default UserToolbar;