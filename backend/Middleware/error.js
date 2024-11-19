import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import { env } from '../Config/config.js';

//* Not found
const notFound = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route not found.'));
};

//* Error Converter
const errorConverter = async (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;

    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, error.stack);
  }

  next(error);
};

//* Error Handler
const errorHandler = async (err, req, res, next) => {
  let { statusCode, message, isOperational, stack } = err;

  if (env === 'production' && !isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }

  const response = {
    error: true,
    message,
    code: statusCode,
    stack: env === 'production' ? null : stack,
  };

  res.locals.errorMessage = message;

  // if (env === 'development') {
  //   console.log(err);
  // }

  res.status(statusCode).json(response);
};

export { notFound, errorConverter, errorHandler };
