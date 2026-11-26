import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAdminOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { validateOrder, handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post('/', authMiddleware, validateOrder, handleValidationErrors, createOrder);
router.get('/user', authMiddleware, getUserOrders);
router.get('/admin/all', authMiddleware, adminMiddleware, getAdminOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);
router.patch('/:id/cancel', authMiddleware, cancelOrder);

export default router;
