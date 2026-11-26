import express from 'express';
import {
  createReservation,
  getUserReservations,
  getAdminReservations,
  updateReservationStatus,
  cancelReservation,
} from '../controllers/reservationController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { validateReservation, handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post('/', authMiddleware, validateReservation, handleValidationErrors, createReservation);
router.get('/user', authMiddleware, getUserReservations);
router.get('/admin/all', authMiddleware, adminMiddleware, getAdminReservations);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateReservationStatus);
router.patch('/:id/cancel', authMiddleware, cancelReservation);

export default router;
