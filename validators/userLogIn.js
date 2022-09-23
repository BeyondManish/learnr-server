import { body } from 'express-validator';

const userLogInValidator = [
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
];

export default userLogInValidator;
