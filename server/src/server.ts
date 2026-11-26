import http from 'http';
import dotenv from 'dotenv';
import { createApp } from './app';
import { initializeSocket } from './config/socket';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = createApp();
const httpServer = http.createServer(app);

// Initialize Socket.io
const io = initializeSocket(httpServer);

// Make io accessible to routes if needed
app.set('io', io);

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🍵 AFAMIA CAFÉ BACKEND SERVER 🍵    ║
║                                        ║
║  Server running on: http://localhost:${PORT}
║  Environment: ${process.env.NODE_ENV || 'development'}
║  Socket.io: Enabled                   ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n❌ Server shutting down gracefully...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
