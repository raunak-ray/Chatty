import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../lib/email.js";
import cloudinary from "../lib/cloudinary.js";
import sendResponse from "../lib/sendResponse.js";
import AppError from "../lib/AppError.js";
import asyncHandler from "express-async-handler";

/* SIGNUP */
export const signupController = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters long", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  generateToken(newUser._id, res);

  await sendWelcomeEmail(
    newUser.email,
    newUser.fullName,
    process.env.CLIENT_URL,
  ).catch(() => {});

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    },
  });
});

/* LOGIN */
export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid Credentials", 400);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid Credentials", 400);
  }

  generateToken(user._id, res);

  sendResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
});

//logout

export const logoutController = (_, res) => {
  res.cookie("token", "", { maxAge: "0" });
  sendResponse(res, {
    statusCode: 200,
    message: "Logged out successfully",
  });
};

/* UPDATE PROFILE */
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const uploadResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "profiles" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(req.file.buffer);
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePicture: uploadResponse.secure_url },
    { new: true },
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Profile Updated Successfully",
    data: updatedUser,
  });
});
