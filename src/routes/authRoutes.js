import { Router } from 'express';
import { login, register, profile } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validateRegister, validateLogin } from '../middlewares/validators.js';

const router = Router();
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', requireAuth, profile);


export default router;
