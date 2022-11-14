import { Router } from 'express';
import { create, getAllComments } from '../controllers/comment.js';
import { requireLogin } from '../controllers/auth.js';
import commentValidator from '../validators/commentValidator.js';
import isValid from '../validators/validationResult.js';

const router = Router();

router.post("/comment/create", requireLogin, commentValidator, isValid, create);
router.get("/comments", getAllComments);
// router.patch("/comment/edit", update);


export default router;
