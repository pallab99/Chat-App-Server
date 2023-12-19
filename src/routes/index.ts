import express from "express";
import authRouter from "./auth/index";
import userRouter from "./user";
import chatRouter from "./chat/";
import messageRouter from "./message";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/message", messageRouter);
export default router;
