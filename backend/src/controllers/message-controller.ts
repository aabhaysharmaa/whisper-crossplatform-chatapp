import type { NextFunction, Response } from "express"
import type { AuthRequest } from "../middleware/auth"
import Chat from "../models/Chat"

export const getMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.userId
		const { chatId } = req.params
		const chat = await Chat.findOne({
			_id: chatId,
			participants: userId
		}).populate("sender", "name email avatar").sort({ createdAt: 1 })
		if (!chat) {
			res.status(404).json({ message: "Chat not found" })
			return
		}
	} catch (error) {
		res.status(500)
		next(error)
	}
}