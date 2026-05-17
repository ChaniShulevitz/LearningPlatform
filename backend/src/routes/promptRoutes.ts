import { Router } from 'express';
import { createPrompt, getHistory } from '../controllers/promptController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', protect, createPrompt);
router.get('/history', protect, getHistory);

export default router;