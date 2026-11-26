import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';

import authRoutes from './routes/auth';
import menuRoutes from './routes/menu';
import orderRoutes from './routes/orders';
import reservationRoutes from './routes/reservations';
import deliveryRoutes from './routes/delivery';
import chatbotRoutes from './routes/chatbot';

import { errorHandler } from './middleware/errorHandler';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect to database
  connectDatabase();

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/menu', menuRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/reservations', reservationRoutes);
  app.use('/api/delivery', deliveryRoutes);
  app.use('/api/chatbot', chatbotRoutes);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  // Error handler
  app.use(errorHandler);

  return app;
};
