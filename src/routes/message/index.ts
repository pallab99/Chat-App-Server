import express from "express";
import { tokenAuthorization } from "../../middlewares/tokenValidator";
import MessageController from "../../controllers/message";
const router = express.Router();

router
  .get("/:chatId", [tokenAuthorization], MessageController.getAllMessage)
  .post("/new", [tokenAuthorization], MessageController.sendMessage);

export default router;
