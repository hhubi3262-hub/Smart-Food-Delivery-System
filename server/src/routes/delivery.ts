import express from 'express';
import {
  createDelivery,
  getDelivery,
  updateDeliveryStatus,
  rateDelivery,
} from '../controllers/deliveryController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, createDelivery);
router.get('/:orderId', authMiddleware, getDelivery);
router.patch('/:id/status', authMiddleware, updateDeliveryStatus);
router.patch('/:id/rate', authMiddleware, rateDelivery);

export default router;
