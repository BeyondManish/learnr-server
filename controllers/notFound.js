import AppError from '../utils/AppError.js';

const notFound = (req, res, next) => {
  next(new AppError(`Couldn't found ${req.originalUrl} in the server`, 404));
};

export default notFound;
