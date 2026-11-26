import express from 'express';
import { sendChatMessage, getChatHistory, getAdminMessages } from '../controllers/chatbotController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/message', authMiddleware, sendChatMessage);
router.get('/history', authMiddleware, getChatHistory);
router.get('/admin/messages', authMiddleware, adminMiddleware, getAdminMessages);

export default router;
