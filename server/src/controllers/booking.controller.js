import asyncHandler from "../utils/asyncHandler.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../services/booking.service.js";

const create = asyncHandler(async (req, res) => {
  const booking = await createBooking(req.body, req.user._id);

  console.log("[Analytics] User created a booking.");

  res.status(201).json({
    success: true,
    message: "Booking created successfully.",
    data: {
      booking,
    },
  });
});

const getAll = asyncHandler(async (req, res) => {
  const result = await getBookings(req.query);

  res.status(200).json({
    success: true,
    message:
      result.bookings.length > 0
        ? "Bookings retrieved successfully."
        : "No data found.",
    data: result,
  });
});

const getById = asyncHandler(async (req, res) => {
  const booking = await getBookingById(req.params.bookingId);

  res.status(200).json({
    success: true,
    message: "Booking retrieved successfully.",
    data: {
      booking,
    },
  });
});

const update = asyncHandler(async (req, res) => {
  const booking = await updateBooking(
    req.params.bookingId,
    req.body,
    req.user._id
  );

  console.log("[Analytics] User updated a booking.");

  res.status(200).json({
    success: true,
    message: "Booking updated successfully.",
    data: {
      booking,
    },
  });
});

const remove = asyncHandler(async (req, res) => {
  await deleteBooking(req.params.bookingId);

  console.log("[Analytics] User deleted a booking.");

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully.",
  });
});

export { create, getAll, getById, update, remove };