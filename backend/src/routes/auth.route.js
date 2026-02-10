import express from "express";
import {
  loginController,
  logoutController,
  signupController,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePicture"),
  updateProfile,
);
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json({ user: req.user }),
);

export default router;
