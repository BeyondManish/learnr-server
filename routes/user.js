import { Router } from 'express';
import { isAdmin, requireLogin } from '../controllers/auth.js';
import { getAllUsers } from "../controllers/user.js";

const router = Router();

router.get('/users', requireLogin, isAdmin, getAllUsers);

export default router;