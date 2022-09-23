import { validationResult } from 'express-validator';

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res
      .status(422)
      .json({ errors: errors.array().map((error) => error.msg) });
  }
  next();
};

export default validator;
