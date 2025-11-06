import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { createStore, updateStore, deleteStore, toggleFeatured } from '../controllers/directoryAdminController.js';

const router = Router();
router.use(requireAuth, requireRole(['ADMIN']));

router.post('/', createStore);
router.put('/:id', updateStore);
router.delete('/:id', deleteStore);
router.patch('/:id/feature', toggleFeatured);

export default router;