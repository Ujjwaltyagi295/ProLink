import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies,  REFRESH_PATH } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => {
   
    let errorMessage = "";

    switch (err.code) {
      case "too_small":
        errorMessage = `${err.path.join(".")} must contain at least ${err.minimum} character(s)`;
        break;
      case "invalid_enum_value":
        errorMessage = `${err.path.join(".")} must be one of the following values: ${err.options.join(", ")}`;
        break;
      case "invalid_string":
        errorMessage = `${err.path.join(".")} is not a valid string`;
        break;
      default:
        errorMessage = err.message || "Invalid input";
        break;
    }

    return {
      path: err.path.join("."),
      message: errorMessage,
    };
  });

  return res.status(BAD_REQUEST).json({
    errors,
    message: "Validation failed",
  });
};

// Helper function to handle custom app errors
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  // Clear auth cookies on refresh path
  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  // Handle specific error types
  if (error instanceof z.ZodError) {
    handleZodError(res, error);
    return;
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  // Default internal server error for unknown issues
  res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;
