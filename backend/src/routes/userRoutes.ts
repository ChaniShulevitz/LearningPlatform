import { Router } from 'express';
import { register, login, getAllUsersWithHistory } from '../controllers/userController';
import { protect, restrictToAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin/users', protect, restrictToAdmin, getAllUsersWithHistory);

export default router;