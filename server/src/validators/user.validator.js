import { body, param, validationResult, query } from "express-validator";

import { ROLE_VALUES } from "../constants/roles.js";

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

const userIdValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user identifier."),

  handleValidationErrors,
];

const createUserValidator = [
  body("name")
    .customSanitizer(sanitizeString)
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be between 2 and 80 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(ROLE_VALUES)
    .withMessage("Invalid user role."),

  handleValidationErrors,
];

const updateRoleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(ROLE_VALUES)
    .withMessage("Invalid user role."),

  handleValidationErrors,
];

const updateStatusValidator = [
  body("isActive")
    .exists()
    .withMessage("Account status is required.")
    .isBoolean()
    .withMessage("Account status must be a boolean.")
    .toBoolean(),

  handleValidationErrors,
];

const userQueryValidator = [
  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search query cannot exceed 100 characters."),

  query("role")
    .optional()
    .isIn(ROLE_VALUES)
    .withMessage("Invalid user role."),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage("Account status must be a boolean.")
    .toBoolean(),

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
  userIdValidator,
  createUserValidator,
  updateRoleValidator,
  updateStatusValidator,
  userQueryValidator,
};