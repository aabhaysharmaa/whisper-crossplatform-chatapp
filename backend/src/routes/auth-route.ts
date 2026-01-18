import express from "express";
import { login } from "../controllers/auth-controller";

const router = express.Router();



router.get("/", login)



export default router