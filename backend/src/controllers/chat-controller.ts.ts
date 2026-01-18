import type { NextFunction, Request, Response } from "express"
import type { AuthRequest } from "../middleware/auth"
import Chat from "../models/Chat";
import { Types } from "mongoose";
export const getChats = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.userId;
		const chats = await Chat.find({ participants: userId }).populate("participants", "name email avatar").populate("lastMessage").sort({ lastMessage: -1 })

		const formattedChat = chats.map((chat) => {
			const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);
			return {
				_id: chat._id,
				participants: otherParticipant ?? null,
				lastMessage: chat.lastMessage,
				lastMessageAt: chat.lastMessageAt,
				createdAt: chat.createdAt
			}
		})
		return res.json(formattedChat).status(200)
	} catch (error) {
		console.log("Error in GetChats Routes");
		res.status(500)
		next(error)
	}
}

export const getOrCreateChat = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const userId = req.userId;
		const { participantId } = req.params
		if (!participantId) {
			return res.status(400).json({ message: "Participant Id is required" })
		}

		if (!Types.ObjectId.isValid(participantId as string)) {
			return res.status(400).json({ message: "Participant Id is required" })
		}

		if (participantId === userId) {
			return res.status(400).json({ message: "Cannot create chats with yourself" })
		}
		// chat if chat already exists
		let chat = await Chat.findOne({
			participants: { $all: [userId, participantId] }
		}).populate("participants", "name email avatar").populate("lastMessage");

		if (!chat) {
			const newChat = new Chat({ participants: [userId, participantId] })
			await newChat.save();
			chat = await newChat.populate("participants", "name email avatar")
		}

		const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId);
		res.json({
			_id: chat._id,
			participantId: otherParticipant ?? null,
			lastMessage: chat.lastMessage,
			lastMessageAt: chat.lastMessageAt,
			createdAt: chat.createdAt
		}).status(200)
	} catch (error) {
		console.log("Error in getOrCreateChat Routes");
		res.status(500)
		next(error)
	}
}