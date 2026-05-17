import { Router } from 'express';
import { executeRegistration, executeLogin, getAdminUserList } from '../controllers/userController';
import { protect, restrictToAdmin } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/users/register:
 * post:
 * summary: Create a new user account
 * tags: [Users Authentications]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - id
 * - name
 * - phone
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 * phone:
 * type: string
 * role:
 * type: string
 * responses:
 * 201:
 * description: Account successfully registered
 * 400:
 * description: Missing fields or user already exists
 */
router.post('/register', executeRegistration);

/**
 * @swagger
 * /api/users/login:
 * post:
 * summary: Authenticate an existing user
 * tags: [Users Authentications]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - id
 * - name
 * - phone
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 * phone:
 * type: string
 * responses:
 * 200:
 * description: Authentication successful, token granted
 * 401:
 * description: Verification failed (wrong details)
 * 404:
 * description: Account not found
 */
router.post('/login', executeLogin);

/**
 * @swagger
 * /api/users/admin/users:
 * get:
 * summary: Fetch all registered accounts with pagination (Management Only)
 * tags: [Management Actions]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * description: Page index number
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * description: Items count per response page
 * responses:
 * 200:
 * description: Data matrix retrieved successfully
 * 401:
 * description: Unverified token or missing session
 * 403:
 * description: Access restricted to administrative accounts only
 */
router.get('/admin/users', protect, restrictToAdmin, getAdminUserList);

export default router;