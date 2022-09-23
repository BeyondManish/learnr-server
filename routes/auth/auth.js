import { Router } from 'express';
import { login, signup } from '../../controllers/auth/auth.js';
import userSignUpValidator from '../../validators/userSignUp.js';
import userLogInValidator from '../../validators/userLogIn.js';
import validationResult from '../../validators/validationResult.js';

const router = Router();

router.post('/signup', userSignUpValidator, validationResult, signup);
router.post('/login', userLogInValidator, validationResult, login);

export default router;
