import { Router } from 'express';
import { listEvents, getEventById } from '../controllers/eventController.js';

const router = Router();
router.get('/', listEvents);
router.get('/:id', getEventById);

export default router;
