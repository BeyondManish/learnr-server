import { Router } from 'express';
import { isAdmin, requireLogin, isAuthor } from '../controllers/auth.js';
import { deleteUser, editUser, getAllUsers, getUser, getUserPosts, updateUser } from "../controllers/user.js";
import { editPost, deletePost } from "../controllers/post.js";
import postValidator from "../validators/postValidator.js";
import isValid from "../validators/validationResult.js";

const router = Router();

router.get('/users', requireLogin, isAdmin, getAllUsers);
router.get('/user/:username', getUser);
router.put('/user/:username', requireLogin, updateUser);
router.delete('/user/:username', requireLogin, isAdmin, deleteUser);

// edit user is for admin only
router.put('/admin/user/:username', requireLogin, isAdmin, editUser);

// get user post
router.get('/:username/posts', getUserPosts);
router.delete("/user/post/:id", requireLogin, isAuthor, deletePost);
router.put("/user/post/edit/:id", requireLogin, isAuthor, postValidator, isValid, editPost);
router.get("/user/comments", requireLogin, isAuthor, editPost);


export default router;