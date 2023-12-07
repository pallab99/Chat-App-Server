"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenValidator_1 = require("../../middlewares/tokenValidator");
const chat_1 = __importDefault(require("../../controllers/chat"));
const router = express_1.default.Router();
router
    .get("/chats/all", [tokenValidator_1.tokenAuthorization], chat_1.default.getAllChat)
    .post("/single-chat/new", [tokenValidator_1.tokenAuthorization], chat_1.default.CreateASingleChat)
    .post("/group-chat/new", [tokenValidator_1.tokenAuthorization], chat_1.default.CreateAGroupChat)
    .patch("/group-chat/rename/:groutChatId", [tokenValidator_1.tokenAuthorization], chat_1.default.renameGroupChat)
    .patch("/group-chat/add/:groutChatId", [tokenValidator_1.tokenAuthorization], chat_1.default.addUserToGroupChat)
    .patch("/group-chat/remove/:groutChatId", [tokenValidator_1.tokenAuthorization], chat_1.default.deleteUserFromGroupChat)
    .delete("/group-chat/delete", [tokenValidator_1.tokenAuthorization], chat_1.default.deleteGroupChat);
exports.default = router;
