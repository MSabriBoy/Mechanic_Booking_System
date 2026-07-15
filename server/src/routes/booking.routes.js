import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/booking.controller.js";

import { protect, authorize } from "../middleware/auth.middleware.js";

import {
  createBookingValidator,
  updateBookingValidator,
  bookingIdValidator,
  bookingQueryValidator,
} from "../validators/booking.validator.js";

import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(bookingQueryValidator, getAll)
  .post(
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF),
    createBookingValidator,
    create
  );

router
  .route("/:bookingId")
  .get(bookingIdValidator, getById)
  .patch(
    authorize(ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF),
    bookingIdValidator,
    updateBookingValidator,
    update
  )
  .delete(
    authorize(ROLES.ADMIN, ROLES.MANAGER),
    bookingIdValidator,
    remove
  );

export default router;