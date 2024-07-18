import { Router } from "express";
import {
  addProfileImage,
  getUserInfo,
  login,
  removeProfileImage,
  signup,
  updateProfile,
} from "../controllers/AutoController.js";
import { verifyToken } from "../middleswares/AuthMiddlesware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/profiles/" });
const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
export default authRoutes;
