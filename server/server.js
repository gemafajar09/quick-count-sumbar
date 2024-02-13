// server/server.js
const http = require('http');
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const { Server } = require('socket.io')
const io = new Server(server, (3001, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  }))

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle chat messages
  socket.on('data-masuk', (message) => {
    io.emit('data-masuk', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});