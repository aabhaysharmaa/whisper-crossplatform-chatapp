import mongoose, { Schema, type Document } from "mongoose";

export interface IUser extends Document {
	clerkId: string
	name: string;
	email: string;
	avatar: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
	clerkId: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		trim: true,
		required: true
	}, avatar: {
		type: String,
		default: "/default-avatar.png"
	}
}, { timestamps: true })

export const User = mongoose.model("User", UserSchema);