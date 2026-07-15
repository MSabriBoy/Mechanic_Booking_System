import { Menu } from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 transition hover:bg-neutral-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-neutral-900">
            Mechanic Booking System
          </h1>

          <p className="hidden text-sm text-neutral-500 sm:block">
            Workshop Management Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-neutral-900">
            {user?.name}
          </p>

          <p className="text-xs capitalize text-neutral-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 font-semibold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;