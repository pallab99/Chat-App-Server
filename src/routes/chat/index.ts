import express from "express";
import { tokenAuthorization } from "../../middlewares/tokenValidator";
import ChatController from "../../controllers/chat";
const router = express.Router();

router
  .get("/chats/all", [tokenAuthorization], ChatController.getAllChat)
  .post(
    "/single-chat/new",
    [tokenAuthorization],
    ChatController.CreateASingleChat
  )
  .post(
    "/group-chat/new",
    [tokenAuthorization],
    ChatController.CreateAGroupChat
  )
  .patch(
    "/group-chat/rename/:groutChatId",
    [tokenAuthorization],
    ChatController.renameGroupChat
  )
  .patch(
    "/group-chat/add/:groutChatId",
    [tokenAuthorization],
    ChatController.addUserToGroupChat
  )
  .patch(
    "/group-chat/remove/:groutChatId",
    [tokenAuthorization],
    ChatController.deleteUserFromGroupChat
  )
  .delete(
    "/group-chat/delete",
    [tokenAuthorization],
    ChatController.deleteGroupChat
  );

export default router;
