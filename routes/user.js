import { Router } from 'express';
import { isAdmin, requireLogin } from '../controllers/auth.js';
import { getAllUsers, getUser } from "../controllers/user.js";

const router = Router();

router.get('/users', requireLogin, isAdmin, getAllUsers);
router.get('/user/:username', getUser);

export default router;