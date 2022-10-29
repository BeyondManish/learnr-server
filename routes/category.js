import { Router } from 'express';
import { create, update, remove, getAllCategories } from '../controllers/category.js';
import { requireLogin, isAdmin } from '../controllers/auth.js';
import categoryValidator from '../validators/categoryValidator.js';
import isValid from '../validators/validationResult.js';


const router = Router();

router.get('/categories', getAllCategories);
router.post('/category/create', requireLogin, isAdmin, categoryValidator, isValid, create);
// router.get('/category/:slug', getCategory);
router.put('/category/:slug', requireLogin, isAdmin, update);
router.delete('/category/:slug', requireLogin, isAdmin, remove);

router.get('/categories', getAllCategories);

export default router;