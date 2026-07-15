import env from "../config/env.js";

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error.";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier.";
  }

  if (err.code === 11000) {
    statusCode = 409;

    const duplicateField = Object.keys(err.keyValue || {})[0];

    message = duplicateField
      ? `${duplicateField} already exists.`
      : "Duplicate resource detected.";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(" ");
  }

  const response = {
    success: false,
    message,
  };

  if (err.errors?.length) {
    response.errors = err.errors;
  }

  if (env.nodeEnv === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;