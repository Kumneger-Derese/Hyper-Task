const asyncHandler = (controller) => (req, res, next) => {
  Promise.resolve(controller(req, res, next)).catch((error) => next(error));
};

export default asyncHandler;
