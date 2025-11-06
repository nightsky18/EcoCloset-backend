import { Router } from 'express';
import { listDirectory, getStore } from '../controllers/directoryController.js';

const router = Router();
router.get('/', listDirectory);
router.get('/:id', getStore);

export default router;
