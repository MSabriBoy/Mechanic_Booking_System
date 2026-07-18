import { ChevronLeft, LogOut, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import NAVIGATION_ITEMS from "../../constants/navigation";

const Sidebar = ({ collapsed, onCollapse }) => {
  const { user, logout } = useAuth();

  const navigation = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside
      className={`flex h-screen flex-col border-r border-neutral-800 bg-neutral-950 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-72"
        }`}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 p-5">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-2 text-neutral-950">
              <Wrench size={18} />
            </div>

            <div>
              <h1 className="font-semibold">Mechanic</h1>
              <p className="text-xs text-neutral-400">
                Booking System
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onCollapse}
          className="rounded-lg p-2 hover:bg-neutral-800"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            size={18}
            className={`transition ${collapsed ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                  ? "bg-neutral-800"
                  : "hover:bg-neutral-800"
                }`
              }
            >
              <Icon size={20} />

              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-600 transition"
        >
          <LogOut size={20} />

          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;