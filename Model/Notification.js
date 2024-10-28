import mongoose, { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderAvatar: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: 'Chat', // Assuming you have a Chat model
    required: true,
  },
}, {
  timestamps: true,
});

export const Notification = mongoose.models.Notification || model('Notification', notificationSchema);
