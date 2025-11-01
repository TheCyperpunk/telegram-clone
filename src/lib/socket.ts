import { Server } from 'socket.io';
import { Server as NetServer } from 'http';

export function initSocket(server: NetServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_BASE_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('join-room', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('send-message', (message) => {
      io.to(message.conversationId).emit('receive-message', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
} 