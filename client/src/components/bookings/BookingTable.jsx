import BookingCard from "./BookingCard";
import BookingRow from "./BookingRow";

import EmptyState from "../common/EmptyState";

const BookingTable = ({
    bookings,
    canEdit,
    canDelete,
    onEdit,
    onDelete,
}) => {
    if (!bookings.length) {
        return (
            <EmptyState
                title="No bookings found"
                description="Create your first booking."
            />
        );
    }

    return (
        <>
            {/* Mobile */}

            <div className="space-y-4 lg:hidden">
                {bookings.map((booking) => (
                    <BookingCard
                        key={booking._id}
                        booking={booking}
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
                                    Customer
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Vehicle
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Service
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>

                        </thead>

                        <tbody>
                            {bookings.map((booking) => (
                                <BookingRow
                                    key={booking._id}
                                    booking={booking}
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

export default BookingTable;