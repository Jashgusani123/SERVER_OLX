import express from 'express';
import {  deleteNotification, getNotifications } from '../Controller/NotificationController.js';

const app = express();

// Fetch notifications based on unread messages
app.get('/:userId', getNotifications);
app.delete("/delete" , deleteNotification)

export default app;
