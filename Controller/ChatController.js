import { User } from "../Model/User.js";
import { Chat } from "../Model/Chat.js";
import mongoose from "mongoose";

const StartChatting = async (req, res) => {
  const {  selectedUserId } = req.body;

  try {
    let chat = await Chat.findOne({
      $or: [
        { user1: req.id, user2: selectedUserId },
        { user1: selectedUserId, user2: req.id },
      ],
    }).populate("user1 user2");

    if (!chat) {
      chat = new Chat({
        user1: req.id,
        user2: selectedUserId,
      });
      await chat.save();
    }

    const SelectedUserObject = await User.findById({_id:selectedUserId})
    const SelectedUserName = SelectedUserObject.Name

    res.status(200).json({
      success:true,
      message:`Connect to ${SelectedUserName}`,
      chat
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error starting chat", error: error.message });
  }
};



const GetAllChats = async (req, res) => {
  try {
    const userId = req.id; // Assuming req.id holds the logged-in user ID

    // Convert userId to mongoose ObjectId without using 'new'
    const userObjectId =new mongoose.Types.ObjectId(userId);

    const chats = await Chat.find({
      $or: [{ "user1": userObjectId }, { "user2": userObjectId }]
    }).populate('user1 user2'); // Populate if you want to get user details


    res.status(200).json({
      success: true,
      chats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve chats",
      error: error.message
    });
  }
};




export {StartChatting  , GetAllChats }
