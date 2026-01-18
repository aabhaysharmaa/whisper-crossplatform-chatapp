import express from "express";
import { getMessages } from "../controllers/message-controller";
import { protectRoute } from "../middleware/auth";

const router = express.Router();



router.get("/chat/:chatId", protectRoute, getMessages)



export default router