import { Router } from 'express';
import postValidator from '../validators/postValidator.js';
import { requireLogin, isAdmin, restrictTo, isAuthor } from "../controllers/auth.js";
import { create, getAllPosts, getPost, deletePost, editPost, getTagPosts } from '../controllers/post.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.get("/posts", getAllPosts);
router.post("/posts/create", requireLogin, restrictTo("admin", "user"), postValidator, isValid, create);
router.get("/post/:slug", getPost);
router.delete("/post/:id", requireLogin, restrictTo("admin", "user"), deletePost);
router.put("/post/edit/:id", requireLogin, isAuthor, postValidator, isValid, editPost);
router.get("/tag/:slug", getTagPosts);

export default router;