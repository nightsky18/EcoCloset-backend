
import { Router } from 'express';
import { listPosts, createPost, getPost, toggleLike, listComments, createComment } from '../controllers/forumController.js';
import { requireAuth, requireRole } from '../middlewares/authMiddleware.js';
import { closePost, deletePost, deleteComment } from '../controllers/forumAdminController.js';

const router = Router();

// públicos
router.get('/posts', listPosts);
router.get('/posts/:id', getPost);

// clientes
router.post('/posts', requireAuth, createPost);
router.post('/posts/:id/like', requireAuth, toggleLike);
router.get('/posts/:postId/comments', listComments);
router.post('/posts/:postId/comments', requireAuth, createComment);

// admin
router.patch('/posts/:id/close', requireAuth, requireRole(['ADMIN']), closePost);
router.delete('/posts/:id', requireAuth, requireRole(['ADMIN']), deletePost);
router.delete('/comments/:id', requireAuth, requireRole(['ADMIN']), deleteComment);

export default router;
