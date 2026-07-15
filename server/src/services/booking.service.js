import Booking from "../models/Booking.js";
import { BOOKING_STATUS } from "../constants/booking.js";
import ApiError from "../utils/ApiError.js";

const ALLOWED_STATUS_TRANSITIONS = Object.freeze({
  [BOOKING_STATUS.PENDING]: [
    BOOKING_STATUS.CONFIRMED,
    BOOKING_STATUS.CANCELLED,
  ],

  [BOOKING_STATUS.CONFIRMED]: [
    BOOKING_STATUS.IN_PROGRESS,
    BOOKING_STATUS.CANCELLED,
  ],

  [BOOKING_STATUS.IN_PROGRESS]: [
    BOOKING_STATUS.COMPLETED,
    BOOKING_STATUS.CANCELLED,
  ],

  [BOOKING_STATUS.COMPLETED]: [],

  [BOOKING_STATUS.CANCELLED]: [],
});

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createBooking = async (bookingData, userId) => {
  const booking = await Booking.create({
    ...bookingData,
    createdBy: userId,
  });

  return booking.populate("createdBy", "name email role");
};

const getBookings = async ({
  status,
  serviceType,
  search,
  page = 1,
  limit = 10,
}) => {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (serviceType) {
    filter.serviceType = serviceType;
  }

  if (search) {
    const safeSearch = escapeRegex(search);

    filter.$or = [
      { customerName: { $regex: safeSearch, $options: "i" } },
      { customerPhone: { $regex: safeSearch, $options: "i" } },
      { vehicleRegistration: { $regex: safeSearch, $options: "i" } },
      { vehicleMake: { $regex: safeSearch, $options: "i" } },
      { vehicleModel: { $regex: safeSearch, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [bookings, total] = await Promise.all([
    Booking.find(filter)
      .populate("createdBy", "name email role")
      .populate("updatedBy", "name email role")
      .sort({ appointmentDate: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Booking.countDocuments(filter),
  ]);

  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
    },
  };
};

const getBookingById = async (bookingId) => {
  const booking = await Booking.findById(bookingId)
    .populate("createdBy", "name email role")
    .populate("updatedBy", "name email role");

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  return booking;
};

const validateStatusTransition = (currentStatus, newStatus) => {
  if (currentStatus === newStatus) {
    return;
  }

  const allowedTransitions = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];

  if (!allowedTransitions.includes(newStatus)) {
    throw new ApiError(
      400,
      `Booking status cannot be changed from "${currentStatus}" to "${newStatus}".`
    );
  }
};

const updateBooking = async (bookingId, updateData, userId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  if (updateData.status) {
    validateStatusTransition(booking.status, updateData.status);
  }

  const allowedFields = [
    "customerName",
    "customerPhone",
    "vehicleRegistration",
    "vehicleMake",
    "vehicleModel",
    "serviceType",
    "appointmentDate",
    "status",
    "notes",
  ];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(updateData, field)) {
      booking[field] = updateData[field];
    }
  }

  booking.updatedBy = userId;

  await booking.save();

  return booking.populate([
    {
      path: "createdBy",
      select: "name email role",
    },
    {
      path: "updatedBy",
      select: "name email role",
    },
  ]);
};

const deleteBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  await booking.deleteOne();

  return booking;
};

export {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};