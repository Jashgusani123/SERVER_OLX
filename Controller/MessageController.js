import Message from "../Model/Message.js"; // Adjust the import based on your directory structure
import { Chat } from "../Model/Chat.js"; // Import your Chat model
import { Notification } from "../Model/Notification.js"; // Import your Notification model
import { User } from "../Model/User.js";

const sendMessage = async (req, res) => {
  const { chatId, senderId, content, attachments } = req.body;

  try {
    // Create a new message
    const message = new Message({
      chatId,
      senderId,
      content,
      attachments,
    });

    // Save the message
    await message.save();

    // Fetch the chat to determine the recipient
    const chat = await Chat.findById(chatId);
    if (chat) {
      const receiverId = senderId === chat.user1.toString() ? chat.user2 : chat.user1;

      // Fetch the sender's user data to get name and avatar
      const senderUser = await User.findById(senderId);
      if (!senderUser) {
        throw new Error("Sender not found");
      }

      // Create a notification for the receiver
      await Notification.create({
        userId: receiverId, // The user receiving the notification
        senderId, // The user who sent the message
        senderName: senderUser.Name, // Assuming you have a name field in your User model
        senderAvatar: senderUser.Avatar, // Assuming you have an avatar field in your User model
        message: `New message from ${senderUser.Name}`, // Customize your notification message
        chatId: chatId,
      });

      // Update the unread count in the Chat model if needed
      if (senderId === chat.user1.toString()) {
        chat.unreadCount.user2 += 1; // Increment unread count for user2
      } else {
        chat.unreadCount.user1 += 1; // Increment unread count for user1
      }
      await chat.save(); // Save updated chat
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};


const getAllMessages = async (req, res) => {
  const { chatId } = req.params; // Assuming chatId is passed as a URL parameter

  try {
    const messages = await Message.find({ chatId })
      .populate("senderId", "name avatar") // Populate sender details
      .sort({ createdAt: 1 }); // Sort messages by creation time

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving messages",
      error: error.message,
    });
  }
};

async function saveMessageToChat(chatId, senderId, content) {
  try {
    // Validate the required data
    if (!chatId || !senderId || !content) {
      throw new Error("Missing required fields (chatId, senderId, content)");
    }

    // Create and save the message
    const newMessage = new Message({
      chatId,
      senderId,
      content,
    });

    let savedMessage = await newMessage.save();

    // Populate sender details or other fields if needed
    savedMessage = await savedMessage.populate("senderId", "username avatar");

    return savedMessage; // Return the populated message with sender details
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message"); // Custom error message for client
  }
}

export { sendMessage, getAllMessages, saveMessageToChat };
