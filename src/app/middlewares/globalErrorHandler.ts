import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default error values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let error = err;

  // Handle Mongoose ValidationError
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation failed';
    error = err; // Using the full error object as you requested
  }
  // Handle Mongoose Duplicate Key Error
  else if (err.code === 11000) {
    statusCode = 409; // 409 Conflict is more appropriate for duplicates
    message = 'Duplicate key error';
    error = {
        name: "DuplicateKeyError",
        message: `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`,
        keyValue: err.keyValue
    }
  }
  // Handle Mongoose CastError (e.g., invalid ObjectId)
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID';
    error = {
        name: "CastError",
        message: `Invalid value for ${err.path}: ${err.value}`,
        path: err.path,
        value: err.value
    }
  }

  // Send the final response
  res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};

export default globalErrorHandler;
