import { Router } from 'express';
import { login, signup, resetPassword, requireLogin, currentUser } from '../controllers/auth.js';
import userSignUpValidator from '../validators/userSignUp.js';
import userLogInValidator from '../validators/userLogIn.js';
import resetPasswordValidator from '../validators/resetPasswordValidator.js';
import isValid from '../validators/validationResult.js';

const router = Router();

/** 
 * @openapi
 * /signup:
 *  post:
 *    tags:
 *      - Auth
 *    description: Creates a new user from the given credentials
 *    responses: 
 *      200:
 *        description: User created successfully
 */

router.post('/signup', userSignUpValidator, isValid, signup);
router.post('/login', userLogInValidator, isValid, login);
router.post('/reset-password', resetPasswordValidator, isValid, resetPassword);
router.get("/current-user", requireLogin, currentUser);

export default router;
