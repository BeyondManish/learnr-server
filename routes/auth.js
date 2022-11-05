import { Router } from 'express';
import { login, signup, resetPassword } from '../controllers/auth.js';
import userSignUpValidator from '../validators/userSignUp.js';
import userLogInValidator from '../validators/userLogIn.js';
import resetPasswordValidator from '../validators/resetPasswordValidator.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.post('/signup', userSignUpValidator, isValid, signup);
router.post('/login', userLogInValidator, isValid, login);
router.post('/reset-password', resetPasswordValidator, isValid, resetPassword);

export default router;
