import { Router } from "express";
import { verifyToken } from "../middleswares/AuthMiddlesware.js";
import {getMessages} from"../controllers/MessagesController.js";


const messagesRoutes = Router();
messagesRoutes.post("/get-messages", verifyToken, getMessages);

export default messagesRoutes;
