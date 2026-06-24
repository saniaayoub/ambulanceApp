import { io } from 'socket.io-client';
import { BaseURL } from '../api/axiosInstance';

export const socket = io(BaseURL, {
  autoConnect: false,
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

let currentUser: any = null;

export const initializeSocket = (user: any) => {
  currentUser = user;
  console.log(user, 'currentUser on initialize');
  if (!socket.connected) {
    socket.connect();
  }
};

socket.on('connect', () => {
  console.log('Socket Connected:', socket.id);

  console.log(currentUser, 'currentUser on connect');
  if (!currentUser) return;
  socket.emit('join', {
    userId: currentUser.userId,
    role: currentUser.role.toLowerCase(),
  });
});

socket.on('disconnect', reason => {
  console.log('Socket Disconnected:', reason);
});

socket.on('connect_error', error => {
  console.log(error, 'so error');
  console.log('Socket Error:', error.message);
});
