import { Router } from 'express';
import { fetchAllCategories, executeCategoryCreation } from '../controllers/categoryController';
import { protect, restrictToAdmin } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/categories:
 * get:
 * summary: Get all available categories
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: List of categories retrieved successfully
 */
router.get('/', protect, fetchAllCategories);

/**
 * @swagger
 * /api/categories:
 * post:
 * summary: Create a new category (Admin Only)
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [name]
 * properties:
 * name:
 * type: string
 * responses:
 * 201:
 * description: Category created successfully
 */
router.post('/', protect, restrictToAdmin, executeCategoryCreation);

export default router;