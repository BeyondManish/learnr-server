import { validationResult } from 'express-validator';

const isValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array().map((error) => error.msg) });
  }
  next();
};

export default isValid;
