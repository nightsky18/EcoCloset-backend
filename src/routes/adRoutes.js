// src/routes/adRoutes.js
import { Router } from 'express';
import { listActiveAds } from '../controllers/adController.js';
const router = Router();
router.get('/', listActiveAds);
export default router;
