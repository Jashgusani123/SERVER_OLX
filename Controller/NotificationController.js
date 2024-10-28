// In your NotificationController.js
import { Notification } from '../Model/Notification.js';

export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).populate('senderId', 'name avatar'); // Populate sender details
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: 'Failed to fetch notifications.' });
  }
};

export const deleteNotification = async(req , res)=>{
  const {Id} = req.body;
  await Notification.findByIdAndDelete({_id:Id})
  res.status(200).json({
    success:true,
    message:"Notification Showed!!"
  })
}
