// models/chat.js
import mongoose, { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
    user1: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    user2: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    unreadCount: {
        user1: { type: Number, default: 0 },
        user2: { type: Number, default: 0 },
      },
}, {
    timestamps: true
});

export const Chat = mongoose.models.Chat || model("Chat", chatSchema);
