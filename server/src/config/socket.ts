import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

export const initializeSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Store active connections
  const activeUsers = new Map<string, string>();

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // User joins with their ID
    socket.on('user-connected', (userId: string) => {
      activeUsers.set(userId, socket.id);
      socket.join(`user-${userId}`);
      console.log(`📱 User ${userId} joined their room`);
    });

    // Admin dashboard listeners
    socket.on('admin-connected', () => {
      socket.join('admin');
      console.log('👨‍💼 Admin connected');
    });

    // Send real-time order updates
    socket.on('order-update', (data) => {
      io.to(`user-${data.userId}`).emit('order-status-changed', data);
      io.to('admin').emit('admin-order-update', data);
    });

    // Delivery tracking
    socket.on('delivery-location-update', (data) => {
      io.to(`user-${data.userId}`).emit('delivery-location', data);
    });

    // Chat messaging
    socket.on('send-message', (message) => {
      io.to(`user-${message.userId}`).emit('receive-message', message);
      io.to('admin').emit('receive-admin-message', message);
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      for (const [userId, socketId] of activeUsers.entries()) {
        if (socketId === socket.id) {
          activeUsers.delete(userId);
          console.log(`❌ User disconnected: ${userId}`);
        }
      }
    });
  });

  return io;
};
