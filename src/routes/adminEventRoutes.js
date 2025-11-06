
import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { createEvent, updateEvent, deleteEvent, changeEventState } from '../controllers/eventAdminController.js';

const router = Router();
router.use(requireAuth, requireRole(['ADMIN']));

router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.patch('/:id/state', changeEventState);

export default router;
