import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const RoleProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;