import express from "express";
import { getAllUsers } from "../controllers/user-controller";
import { protectRoute } from "../middleware/auth";

const router = express.Router();



router.get("/", protectRoute,getAllUsers)



export default router