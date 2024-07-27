import { Router } from "express";

import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import multer from "multer";
import { verifyToken } from "../middleswares/AuthMiddlesware.js";


const messagesRoutes = Router();
const upload = multer({ dest: "uploads/files" });
messagesRoutes.post("/get-messages", verifyToken, getMessages);
messagesRoutes.post(
    "/upload-file",
    verifyToken,
    upload.single("file"),
    uploadFile
  );
export default messagesRoutes;
