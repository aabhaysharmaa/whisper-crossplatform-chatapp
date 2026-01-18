import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import type { AuthRequest } from "../middleware/auth";


export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
	// Logic to get all users from the database
	const user = await User.find({ _id: { $ne: req.userId } })
	if (!user) {
		return res.status(400).json({ message: "user not found" })
	}
	return user
}