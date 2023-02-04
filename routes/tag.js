import { Router } from 'express';
import { requireLogin, restrictTo } from '../controllers/auth.js';
import categoryValidator from '../validators/categoryValidator.js';
import isValid from '../validators/validationResult.js';
import { create, getAllTags } from '../controllers/tag.js';

const router = Router();

router.get('/tags', getAllTags);
router.post('/tag/create', requireLogin, restrictTo("admin", "user"), categoryValidator, isValid, create);
// router.get('/tag/:slug', getCategory);


export default router;