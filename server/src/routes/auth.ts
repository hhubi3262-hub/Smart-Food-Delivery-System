import express from 'express';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../middleware/validation';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
