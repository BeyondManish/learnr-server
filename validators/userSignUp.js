import { body } from 'express-validator';

const userSignUpValidator = [
  body('firstname')
    .not()
    .isEmpty()
    .withMessage('Firstname is required.')
    .isAlpha()
    .withMessage('Firstname must contain only alphabets.'),
  body('lastname')
    .optional()
    .isAlpha()
    .withMessage('Lastname must contain only alphabets.'),
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),
];

export default userSignUpValidator;
