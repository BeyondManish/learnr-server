import { body } from 'express-validator';

const resetPasswordValidator = [
  body('email').isEmail().withMessage('Please enter a valid email.'),
];

export default resetPasswordValidator;
