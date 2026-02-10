import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import AppError from "../lib/AppError.js";
import sendResponse from "../lib/sendResponse.js";

/* GET ALL CONTACTS */
export const getAllContacts = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const contacts = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  // res.status(200).json(contacts);

  sendResponse(res, {
    statusCode: 200,
    message: "All contacts fetched successfully",
    data: contacts,
  });
});

/* GET MESSAGES BY USER ID */
export const getMessagesByUserId = asyncHandler(async (req, res) => {
  const myId = req.user._id;
  const { id: userToChatId } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  sendResponse(res, {
    statusCode: 200,
    message: "Messages fetched successfully",
    data: messages,
  });
});

/* SEND MESSAGE */
export const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!text && !req.file) {
    throw new AppError("Text or image is required.", 400);
  }

  let imageUrl = null;

  if (req.file) {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "message" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    imageUrl = response.secure_url;
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  const recieverSocketId = getRecieverSocketId(receiverId);
  if (recieverSocketId) {
    io.to(recieverSocketId).emit("newMessage", newMessage);
  }

  sendResponse(res, {
    statusCode: 201,
    message: "Message send successfully",
    data: newMessage,
  });
});

/* GET CHAT PARTNERS */
export const getChatPartners = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const messages = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  const chatPartnerIds = [
    ...new Set(
      messages.map((msg) =>
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString(),
      ),
    ),
  ];

  const chatPartners = await User.find({
    _id: { $in: chatPartnerIds },
  }).select("-password");

  sendResponse(res, {
    statusCode: 200,
    message: "Chat partners fetched successfully",
    data: chatPartners,
  });
});
