import { Router } from 'express';
import { create, update, remove, getAllCategories } from '../controllers/category.js';
import { requireLogin } from '../controllers/auth.js';


const router = Router();

router.post('/category/create', requireLogin, create );
router.put('/category/:slug', update);
router.delete('/category/:slug', remove);

router.get('/categories', getAllCategories);

export default router;