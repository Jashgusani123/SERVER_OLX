import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './Routes/UserRoute.js';
import CardRoute from './Routes/CardRoute.js';
import FavoritesRoute from './Routes/FavoritesRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import NotificationRoute from './Routes/NotificationRoute.js';
import { Connect } from './ConnectDB.js';
import {saveMessageToChat} from './Controller/MessageController.js'
import bodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import http from 'http'; // Import the HTTP module
import { Server } from 'socket.io'; // Import Socket.IO

dotenv.config();

const app = express();
const server = http.createServer(app); // Create a server with HTTP
const io = new Server(server, { // Initialize Socket.IO
  cors: {
    origin: 'http://localhost:5173', // Allow your frontend to connect
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(CookieParser());
app.use(bodyParser.json({ limit: '300mb' })); // Adjust '300mb' as needed
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true })); 
Connect(process.env.MONGO_URI);

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Public Route (Home Page)
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Simple Express Server!</h1>
  `);
});

// Route definitions
app.use("/api/v1/user", userRoute);
app.use("/api/v1/card", CardRoute);
app.use("/api/v1/favorite", FavoritesRoute);
app.use("/api/v1/chat", ChatRoute);
app.use("/api/v1/messages", MessageRoute);
app.use("/api/v1/notifications", NotificationRoute);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle message sending
  socket.on('sendMessage', async ({ chatId, senderId, content }) => {
    try {
      // Save the message to your database
      const chat = await saveMessageToChat(chatId, senderId, content);
      // Ensure chat and message saving was successful
      if (chat) {
        // Emit the new message to the chat room
        io.to(chatId).emit('newMessage', {
          senderId,
          content,
          chatId, // Optionally include chatId for reference
          timestamp: new Date().toISOString(), // Include timestamp for message order
        });
      } else {
        console.error('Chat not found or message saving failed.');
      }
    } catch (error) {
      console.error('Error saving message:', error);
      // Optionally emit an error event back to the client
      socket.emit('messageError', { error: 'Failed to send message. Please try again.' });
    }
  });
  

  
  

  // Handle joining a chat room
  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`Client ${socket.id} joined chat ${chatId}`);
  });

  

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // Change to server.listen
  console.log(`Server is running on port ${PORT}`);
});
