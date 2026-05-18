import { Router } from 'express';
import { createPrompt, getHistory } from '../controllers/promptController';

const router = Router();


router.post('/', createPrompt);
router.get('/history', getHistory);

export default router;