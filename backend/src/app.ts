import express, { type Request, type Response } from "express";

const app = express();

import authRoutes from "./routes/auth-route";
import chatRoutes from "./routes/chat-route";
import messageRoutes from "./routes/message-route";
import userRoutes from "./routes/user-route";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorhandler";


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(clerkMiddleware())

app.use("/api/auth", authRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)


app.get("/", (req: Request, res: Response) => {
	res.send({ message: "Server is working fine" })
})


// error handlers must come after all the routes and other middlewares so they can catch errors passed with next(err) or thrown inside async handlers

app.use(errorHandler);

export default app