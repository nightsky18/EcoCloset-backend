// src/routes/authRoutes.js
import { Router } from 'express';
import { login, register, profile } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);

const methodNotAllowed = (req, res) => res.status(405).json({ message: 'Método no permitido' });
router.all('/login', methodNotAllowed);
router.all('/register', methodNotAllowed);

router.get('/profile', requireAuth, profile);
export default router;
