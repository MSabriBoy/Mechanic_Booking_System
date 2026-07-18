import { X, LogOut, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";

import NAVIGATION_ITEMS from "../../constants/navigation";
import useAuth from "../../hooks/useAuth";

const MobileSidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();

  const navigation = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition lg:hidden ${open
          ? "visible opacity-100"
          : "invisible opacity-0"
          }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-neutral-950 text-white transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-2 text-neutral-900">
              <Wrench size={18} />
            </div>

            <div>
              <h2 className="font-semibold">
                Mechanic
              </h2>

              <p className="text-xs text-neutral-400">
                Booking System
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-neutral-800"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                    ? "bg-neutral-800"
                    : "hover:bg-neutral-800"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-neutral-800 p-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-red-600"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;