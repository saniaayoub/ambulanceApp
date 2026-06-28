// import { io } from 'socket.io-client';
// import { BaseURL } from '../api/axiosInstance';

// export const socket = io(BaseURL, {
//   autoConnect: false,
//   transports: ['websocket'],
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
// });

// let currentUser: any = null;

// export const initializeSocket = (user: any) => {
//   currentUser = user;
//   if (!socket.connected) {
//     socket.connect();
//   }
// };

// socket.on('connect', () => {
//   console.log('Socket Connected:', currentUser, socket.id);
//   if (!currentUser) return;
//   socket.emit('join', {
//     userId: currentUser.userId,
//     role: currentUser.role.toLowerCase(),
//   });
// });

// socket.on('disconnect', reason => {
//   console.log('Socket Disconnected:', reason);
// });

// socket.on('connect_error', error => {
//   console.log('Socket Error:', error.message);
// });

// user
// socket.on("trip_status_updated", data => {
//     if (data.status === "ARRIVED") {
//         // Update trip status
//         // Show "Driver has arrived"
//     }
// });
