import { useState } from "react";
import toast from "react-hot-toast";

import { deleteUser } from "../api/user.api";

import DashboardLayout from "../layouts/DashboardLayout";

import UserToolbar from "../components/users/UserToolbar";
import UserFilters from "../components/users/UserFilters";
import UserTable from "../components/users/UserTable";
import UserFormModal from "../components/users/UserFormModal";

import ConfirmDialog from "../components/common/ConfirmDialog";
import Spinner from "../components/common/Spinner";
import Pagination from "../components/bookings/Pagination";

import useUsers from "../hooks/useUsers";
import useAuth from "../hooks/useAuth";

import ROLES from "../constants/roles";

const UsersPage = () => {
    const { user } = useAuth();

    const canCreateUser =
        user?.role === ROLES.ADMIN;

    const canEditUser =
        user?.role === ROLES.ADMIN;

    const canDeleteUser =
        user?.role === ROLES.ADMIN;

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [isFormOpen, setIsFormOpen] =
        useState(false);

    const [isDeleteOpen, setIsDeleteOpen] =
        useState(false);

    const [isDeleting, setIsDeleting] =
        useState(false);

    const {
        users,
        pagination,
        filters,
        loading,
        initialLoading,
        error,
        updateFilters,
        resetFilters,
        refetch,
    } = useUsers();

    const handleDeleteUser = async () => {
        if (!selectedUser?._id || isDeleting) {
            return;
        }

        try {
            setIsDeleting(true);

            await deleteUser(selectedUser._id);

            await refetch();

            toast.success(
                "User deleted successfully."
            );

            setIsDeleteOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error(
                "Failed to delete user:",
                error
            );

            toast.error(
                error?.response?.data?.message ??
                "Unable to delete user. Please try again."
            );
        } finally {
            setIsDeleting(false);
        }
    };

    if (initialLoading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center py-24">
                    <Spinner />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <main className="space-y-6">

                <UserToolbar
                    canCreate={canCreateUser}
                    onCreate={() => {
                        setSelectedUser(null);
                        setIsFormOpen(true);
                    }}
                />

                <UserFilters
                    filters={filters}
                    onSearchChange={(search) => {
                        updateFilters({
                            search,
                            page: 1,
                        });
                    }}
                    onRoleChange={(role) => {
                        updateFilters({
                            role,
                            page: 1,
                        });
                    }}
                    onStatusChange={(isActive) => {
                        updateFilters({
                            isActive,
                            page: 1,
                        });
                    }}
                    onReset={resetFilters}
                />

                {error && (
                    <div
                        role="alert"
                        className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {loading ? (
                    <div
                        className="flex min-h-48 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="flex items-center gap-3 text-sm text-neutral-600">
                            <Spinner />
                            <span>
                                Updating users...
                            </span>
                        </div>
                    </div>
                ) : (
                    <UserTable
                        users={users}
                        canEdit={canEditUser}
                        canDelete={canDeleteUser}
                        onEdit={(user) => {
                            setSelectedUser(user);
                            setIsFormOpen(true);
                        }}
                        onDelete={(user) => {
                            setSelectedUser(user);
                            setIsDeleteOpen(true);
                        }}
                    />
                )}

                <Pagination
                    pagination={pagination}
                    disabled={loading}
                    onPageChange={(page) => {
                        updateFilters({
                            page,
                        });
                    }}
                />

                <UserFormModal
                    open={isFormOpen}
                    user={selectedUser}
                    onClose={() => {
                        setSelectedUser(null);
                        setIsFormOpen(false);
                    }}
                    onSuccess={async () => {
                        await refetch();
                    }}
                />

                <ConfirmDialog
                    open={isDeleteOpen}
                    title="Delete User"
                    message={
                        selectedUser
                            ? `Are you sure you want to delete ${selectedUser.name}? This action cannot be undone.`
                            : "Are you sure you want to delete this user? This action cannot be undone."
                    }
                    confirmText={
                        isDeleting
                            ? "Deleting..."
                            : "Delete"
                    }
                    loading={isDeleting}
                    onCancel={() => {
                        if (isDeleting) {
                            return;
                        }

                        setSelectedUser(null);
                        setIsDeleteOpen(false);
                    }}
                    onConfirm={handleDeleteUser}
                />

            </main>
        </DashboardLayout>
    );
};

export default UsersPage;