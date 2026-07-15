import {
  CalendarDays,
  LayoutDashboard,
  Users,
} from "lucide-react";

import ROLES from "./roles";

const NAVIGATION_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF],
  },
  {
    id: "bookings",
    label: "Bookings",
    path: "/bookings",
    icon: CalendarDays,
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF],
  },
  {
    id: "users",
    label: "Users",
    path: "/users",
    icon: Users,
    roles: [ROLES.ADMIN, ROLES.MANAGER],
  },
];

export default NAVIGATION_ITEMS;