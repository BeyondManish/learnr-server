import { Router } from 'express';
import { isAdmin, requireLogin } from '../controllers/auth.js';
import { editUser, getAllUsers, getUser, getUserPosts, updateUser } from "../controllers/user.js";

const router = Router();

router.get('/users', requireLogin, isAdmin, getAllUsers);
router.get('/user/:username', getUser);
router.put('/user/:username', requireLogin, updateUser);
router.get('/:username/posts', getUserPosts);
// edit user is for admin only
router.put('/admin/user/:username', requireLogin, isAdmin, editUser);


export default router;