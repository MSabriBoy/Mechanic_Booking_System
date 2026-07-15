import { body, param, query, validationResult } from "express-validator";

import {
  BOOKING_STATUS_VALUES,
  SERVICE_TYPE_VALUES,
} from "../constants/booking.js";
import ApiError from "../utils/ApiError.js";
import sanitizeText from "../utils/sanitizeInput.js";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return next(new ApiError(400, "Validation failed.", formattedErrors));
  }

  next();
};

const sanitizeString = (value) => sanitizeText(value);

const createBookingValidator = [
  body("customerName")
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Customer name is required.")
    .isLength({ min: 2, max: 80 })
    .withMessage("Customer name must be between 2 and 80 characters."),

  body("customerPhone")
    .trim()
    .notEmpty()
    .withMessage("Customer phone number is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please provide a valid 10-digit Indian mobile number."),

  body("vehicleRegistration")
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Vehicle registration number is required.")
    .isLength({ max: 20 })
    .withMessage("Vehicle registration number cannot exceed 20 characters."),

  body("vehicleMake")
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Vehicle make is required.")
    .isLength({ max: 50 })
    .withMessage("Vehicle make cannot exceed 50 characters."),

  body("vehicleModel")
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Vehicle model is required.")
    .isLength({ max: 50 })
    .withMessage("Vehicle model cannot exceed 50 characters."),

  body("serviceType")
    .notEmpty()
    .withMessage("Service type is required.")
    .isIn(SERVICE_TYPE_VALUES)
    .withMessage("Invalid service type."),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required.")
    .isISO8601()
    .withMessage("Please provide a valid appointment date.")
    .toDate(),

  body("notes")
    .optional({ checkFalsy: true })
    .customSanitizer(sanitizeString)
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),

  handleValidationErrors,
];

const updateBookingValidator = [
  body("customerName")
    .optional()
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Customer name cannot be empty.")
    .isLength({ min: 2, max: 80 })
    .withMessage("Customer name must be between 2 and 80 characters."),

  body("customerPhone")
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please provide a valid 10-digit Indian mobile number."),

  body("vehicleRegistration")
    .optional()
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Vehicle registration number cannot be empty.")
    .isLength({ max: 20 })
    .withMessage("Vehicle registration number cannot exceed 20 characters."),

  body("vehicleMake")
    .optional()
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Vehicle make cannot be empty.")
    .isLength({ max: 50 })
    .withMessage("Vehicle make cannot exceed 50 characters."),

  body("vehicleModel")
    .optional()
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Vehicle model cannot be empty.")
    .isLength({ max: 50 })
    .withMessage("Vehicle model cannot exceed 50 characters."),

  body("serviceType")
    .optional()
    .isIn(SERVICE_TYPE_VALUES)
    .withMessage("Invalid service type."),

  body("appointmentDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid appointment date.")
    .toDate(),

  body("status")
    .optional()
    .isIn(BOOKING_STATUS_VALUES)
    .withMessage("Invalid booking status."),

  body("notes")
    .optional()
    .customSanitizer(sanitizeString)
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),

  handleValidationErrors,
];

const bookingIdValidator = [
  param("bookingId")
    .isMongoId()
    .withMessage("Invalid booking identifier."),

  handleValidationErrors,
];

const bookingQueryValidator = [
  query("status")
    .optional()
    .isIn(BOOKING_STATUS_VALUES)
    .withMessage("Invalid booking status."),

  query("serviceType")
    .optional()
    .isIn(SERVICE_TYPE_VALUES)
    .withMessage("Invalid service type."),

  query("search")
    .optional()
    .customSanitizer(sanitizeString)
    .isLength({ max: 100 })
    .withMessage("Search query cannot exceed 100 characters."),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer.")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100.")
    .toInt(),

  handleValidationErrors,
];

export {
  createBookingValidator,
  updateBookingValidator,
  bookingIdValidator,
  bookingQueryValidator,
};