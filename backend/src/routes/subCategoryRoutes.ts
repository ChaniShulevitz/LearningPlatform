import { Router } from 'express';
import { createSubCategory, getSubCategories } from '../controllers/subCategoryController';
import { protect, restrictToAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', protect, restrictToAdmin, createSubCategory);
router.get('/:categoryId', protect, getSubCategories);

export default router;