import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  generateChatCompletion,
  sendUserChats,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  verifyToken,
  validate(chatCompletionValidator),
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendUserChats);

export default chatRoutes;
