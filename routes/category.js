import { Router } from 'express';
import { create, update, remove, getAllCategories } from '../controllers/category.js';
import { requireLogin, isAdmin } from '../controllers/auth.js';


const router = Router();

router.post('/category/create', requireLogin, isAdmin, create);
router.put('/category/:slug', requireLogin, isAdmin, update);
router.delete('/category/:slug', requireLogin, isAdmin, remove);

router.get('/categories', getAllCategories);

export default router;