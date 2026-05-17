import { Router } from 'express';
import { createAIPrompt, fetchUserHistory } from '../controllers/promptController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /api/prompts:
 * post:
 * summary: Send a prompt to the AI and save the response
 * tags: [Prompts]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [category_id, prompt]
 * properties:
 * category_id:
 * type: string
 * sub_category_id:
 * type: string
 * prompt:
 * type: string
 * responses:
 * 201:
 * description: AI response generated and saved successfully
 * 400:
 * description: Missing required fields
 * 401:
 * description: Unauthorized
 */
router.post('/', protect, createAIPrompt);

/**
 * @swagger
 * /api/prompts/history:
 * get:
 * summary: Get the logged-in user's prompt history
 * tags: [Prompts]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: History retrieved successfully
 * 401:
 * description: Unauthorized
 */
router.get('/history', protect, fetchUserHistory);

export default router;