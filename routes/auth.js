import { Router } from 'express';
import { login, signup } from '../controllers/auth.js';
import userSignUpValidator from '../validators/userSignUp.js';
import userLogInValidator from '../validators/userLogIn.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.post('/signup', userSignUpValidator, isValid, signup);
router.post('/login', userLogInValidator, isValid, login);

export default router;
