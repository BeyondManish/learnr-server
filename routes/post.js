import { Router } from 'express';
import postValidator from '../validators/postValidator.js';
import { requireLogin, isAdmin } from "../controllers/auth.js";
import { create, getAllPosts, getPost, deletePost, editPost, getCategoryPosts } from '../controllers/post.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.get("/posts", getAllPosts);
router.post("/posts/create-post", requireLogin, isAdmin, postValidator, isValid, create);
router.get("/post/:slug", getPost);
router.delete("/post/:id", requireLogin, isAdmin, deletePost);
router.put("/post/edit/:id", requireLogin, isAdmin, postValidator, isValid, editPost);
router.get("/category/:slug", getCategoryPosts);

export default router;