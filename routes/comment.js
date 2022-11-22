import { Router } from 'express';
import { create, getAllComments, remove, getPostComments } from '../controllers/comment.js';
import { isAdmin, requireLogin } from '../controllers/auth.js';
import commentValidator from '../validators/commentValidator.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.post("/comment/create", requireLogin, commentValidator, isValid, create);
router.get("/comments", requireLogin, isAdmin, getAllComments);
router.get("/comments/:postId", getPostComments);
router.delete("/comment/:id", requireLogin, remove);
// router.patch("/comment/edit", update);


export default router;
