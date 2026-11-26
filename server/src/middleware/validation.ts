import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').notEmpty().withMessage('Phone is required'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateMenuItem = [
  body('name').trim().notEmpty().withMessage('Menu item name is required'),
  body('category').isIn(['Coffee', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Drinks']),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('image').isURL().withMessage('Valid image URL is required'),
];

export const validateOrder = [
  body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('orderType').isIn(['Delivery', 'Pickup']).withMessage('Invalid order type'),
];

export const validateReservation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('guests').isInt({ min: 1, max: 20 }).withMessage('Guests must be between 1 and 20'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time is required (HH:MM)'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorArray.map((e: any) => ({ 
        field: e.path || e.param || 'unknown', 
        message: e.msg 
      })),
    });
  }
  next();
};
