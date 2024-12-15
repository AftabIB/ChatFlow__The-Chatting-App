// Fetch all the users into sidebar except self
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

// fetch the users in sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //used to store the user which is currently logged-in (current logged in user)
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get the messages between 2 users
export const getMessages = async (req, res) => {
  try {
    //chatting between users with their ID

    //message receiver ID
    const { id: userToChatId } = req.params;

    //message sender ID
    const myId = req.user._id;

    //Finding the messages by applying the filter: either i am the sender or receiver is the sender
    const messages = await Message.find({
      $or: [
        // i am the sender
        { senderId: myId, receiverId: userToChatId },

        // receiver is the sender
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    //get all messages
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    //message could be text or image
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    let imageUrl;
    // if image is to be sent, upload it on the cloudinary
    if (image) {
      //Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload({ image });
      imageUrl = uploadResponse.secure_url;
    }

    // creating the message (may inlcude the image)
    const newMessage = new Message({
      myId,
      receiverId,
      text,
      image: imageUrl,
    });

    //save the message
    await newMessage.save();

    // todo: realtime functionality by using => socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
