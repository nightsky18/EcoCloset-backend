import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { createAd, updateAd, toggleAd, deleteAd } from '../controllers/adAdminController.js';

const router = Router();
router.use(requireAuth, requireRole(['ADMIN']));

router.post('/', createAd);
router.put('/:id', updateAd);
router.patch('/:id/activate', toggleAd);
router.delete('/:id', deleteAd);

export default router;
