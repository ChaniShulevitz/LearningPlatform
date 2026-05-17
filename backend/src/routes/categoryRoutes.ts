import { Router } from 'express';
import { fetchAllCategories, fetchSubCategories, executeCategoryCreation, executeSubCategoryCreation } from '../controllers/categoryController';
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

/**
 * @swagger
 * /api/categories/subcategories:
 * post:
 * summary: Create a new sub-category (Admin Only)
 * tags: [Categories]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [category_id, name]
 * properties:
 * category_id:
 * type: string
 * name:
 * type: string
 * responses:
 * 201:
 * description: Sub-category created successfully
 */
router.post('/subcategories', protect, restrictToAdmin, executeSubCategoryCreation);

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
 * responses:
 * 200:
 * description: List of sub-categories retrieved successfully
 */
router.get('/:categoryId/subcategories', protect, fetchSubCategories);

export default router;