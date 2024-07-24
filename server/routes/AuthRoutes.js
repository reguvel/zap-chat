import { Router } from "express";
import {
  addProfileImage,
  getUserInfo,
  login,
  removeProfileImage,
  signup,
  updateProfile,
  logOut,
} from "../controllers/AutoController.js";
import { verifyToken } from "../middleswares/AuthMiddlesware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });
authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/log-out", logOut);
export default authRoutes;
