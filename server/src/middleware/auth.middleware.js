import jwt from "jsonwebtoken";

import env from "../config/env.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith("Bearer ")
  ) {
    throw new ApiError(401, "Authentication required.");
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "User associated with this token no longer exists.");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been deactivated.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Authentication token has expired.");
    }

    throw new ApiError(401, "Invalid authentication token.");
  }
});

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(
      new ApiError(403, "You are not authorized to perform this action.")
    );
  }

  next();
};

export { protect, authorize };