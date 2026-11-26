import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { validateMenuItem, handleValidationErrors } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, validateMenuItem, handleValidationErrors, createMenuItem);
router.put('/:id', authMiddleware, adminMiddleware, validateMenuItem, handleValidationErrors, updateMenuItem);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMenuItem);

export default router;
