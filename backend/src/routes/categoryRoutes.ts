import { Router } from 'express';
import { fetchAllCategories, fetchSubCategories, executeCategoryCreation } from '../controllers/categoryController';
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
 * 401:
 * description: Unauthorized session
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
 * required:
 * - name
 * properties:
 * name:
 * type: string
 * responses:
 * 201:
 * description: Category created successfully
 * 400:
 * description: Missing category name
 * 403:
 * description: Restricted to admins
 */
router.post('/', protect, restrictToAdmin, executeCategoryCreation);

/**
 * @swagger
 * /api/categories/{categoryId}/subcategories:
 * get:
 * summary: Get sub-categories for a specific category
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: categoryId
 * required: true
 * schema:
 * type: string
 * description: The parent category ID
 * responses:
 * 200:
 * description: List of sub-categories retrieved successfully
 * 400:
 * description: Missing category ID
 * 401:
 * description: Unauthorized session
 */
router.get('/:categoryId/subcategories', protect, fetchSubCategories);

export default router;