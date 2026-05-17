import { Router } from 'express';
import { fetchAllCategories, executeCategoryCreation } from '../controllers/categoryController';
import { protect, restrictToAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, fetchAllCategories);
router.post('/', protect, restrictToAdmin, executeCategoryCreation);

export default router;