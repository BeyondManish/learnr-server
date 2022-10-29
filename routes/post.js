import { Router } from 'express';
import postValidator from '../validators/postValidator.js';
import { requireLogin, isAdmin } from "../controllers/auth.js";
import { create, getAllPosts } from '../controllers/post.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.get("/", getAllPosts);
router.post("/create-post", requireLogin, isAdmin, postValidator, isValid, create);

export default router;