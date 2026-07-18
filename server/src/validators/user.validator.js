import { body, param, validationResult, query } from "express-validator";

import { ROLE_VALUES } from "../constants/roles.js";
import ApiError from "../utils/ApiError.js";

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

const userIdValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user identifier."),

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
  updateRoleValidator,
  updateStatusValidator,
  userQueryValidator,
};