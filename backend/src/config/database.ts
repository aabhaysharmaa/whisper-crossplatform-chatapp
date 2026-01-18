import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI no provided or invalid")
		}
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("Mongo DB is connected")
	} catch (error) {
		console.log("mongoDB server fails", error)
		process.exit(1)
	}
}