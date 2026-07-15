import { useState } from "react";
import toast from "react-hot-toast";

import { deleteBooking } from "../api/booking.api";

import DashboardLayout from "../layouts/DashboardLayout";

import BookingToolbar from "../components/bookings/BookingToolbar";
import BookingTable from "../components/bookings/BookingTable";
import BookingFormModal from "../components/bookings/BookingFormModal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Spinner from "../components/common/Spinner";
import BookingFilters from "../components/bookings/BookingFilters";
import Pagination from "../components/bookings/Pagination";

import useBookings from "../hooks/useBookings";
import useAuth from "../hooks/useAuth";

const BookingsPage = () => {

    const { user } = useAuth();

    const canCreateBooking = ["admin", "staff"].includes(user?.role);
    const canEditBooking = ["admin", "staff"].includes(user?.role);
    const canDeleteBooking = user?.role === "admin";

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    const {
        bookings,
        pagination,
        filters,
        loading,
        initialLoading,
        error,
        updateFilters,
        resetFilters,
        refetch,
    } = useBookings();

    const handleDeleteBooking = async () => {
        if (!selectedBooking?._id || isDeleting) {
            return;
        }

        try {
            setIsDeleting(true);

            await deleteBooking(selectedBooking._id);

            console.log(
                "[Analytics] User completed booking deletion."
            );

            toast.success("Booking deleted successfully.");

            setIsDeleteOpen(false);
            setSelectedBooking(null);

            await refetch();
        } catch (error) {
            console.error(
                "Failed to delete booking:",
                error
            );

            toast.error(
                error?.response?.data?.message ??
                "Unable to delete booking. Please try again."
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
            <div className="space-y-6">
                <BookingToolbar
                canCreate={canCreateBooking}
                    onCreate={() => {
                        setSelectedBooking(null);
                        setIsFormOpen(true);
                    }} />

                <BookingFilters
                    filters={filters}
                    onSearchChange={(search) => {
                        updateFilters({
                            search,
                            page: 1,
                        });
                    }}
                    onStatusChange={(status) => {
                        updateFilters({
                            status,
                            page: 1,
                        });
                    }}
                    onServiceChange={(serviceType) => {
                        updateFilters({
                            serviceType,
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
                            <span>Updating bookings...</span>
                        </div>
                    </div>
                ) : (
                    <BookingTable
                        bookings={bookings}
                         canEdit={canEditBooking}
                        canDelete={canDeleteBooking}
                        onEdit={(booking) => {
                            setSelectedBooking(booking);
                            setIsFormOpen(true);
                        }}
                        onDelete={(booking) => {
                            setSelectedBooking(booking);
                            setIsDeleteOpen(true);
                        }}
                    />
                )}

                <Pagination
                    pagination={pagination}
                    disabled={loading}
                    onPageChange={(page) => {
                        updateFilters({ page });
                    }}
                />

                <BookingFormModal
                    open={isFormOpen}
                    booking={selectedBooking}
                    onClose={() => {
                        setSelectedBooking(null);
                        setIsFormOpen(false);
                    }}
                    onSuccess={async () => {
                        await refetch();
                    }}
                />

                <ConfirmDialog
                    open={isDeleteOpen}
                    title="Delete Booking"
                    message={
                        selectedBooking
                            ? `Are you sure you want to delete the booking for ${selectedBooking.customerName}? This action cannot be undone.`
                            : "Are you sure you want to delete this booking? This action cannot be undone."
                    }
                    confirmText={
                        isDeleting ? "Deleting..." : "Delete"
                    }
                    loading={isDeleting}
                    onCancel={() => {
                        if (isDeleting) {
                            return;
                        }

                        setSelectedBooking(null);
                        setIsDeleteOpen(false);
                    }}
                    onConfirm={handleDeleteBooking}
                />
            </div>
        </DashboardLayout>
    );
};

export default BookingsPage;