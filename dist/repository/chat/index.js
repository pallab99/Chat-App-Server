"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../../models/chat");
class ChatRepositoryClass {
    getAllChatOfAUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.find({ users: { $in: [userId] } })
                .populate("users", "-__v -createdAt -updatedAt")
                .populate("latestMessage");
        });
    }
    chatAvailable(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.findOne({
                isGroupChat: false,
                users: { $in: [sender, receiver] },
            });
        });
    }
    newSingleChat(users) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.create({
                chatName: "single chat",
                isGroupChat: false,
                users: users,
            });
        });
    }
    newGroupChat(users, groupName, groupAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.create({
                chatName: groupName,
                isGroupChat: true,
                users: users,
                groupAdmin: groupAdmin,
            });
        });
    }
    renameGroupChat(groupChatId, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.findOneAndUpdate({ _id: groupChatId }, { chatName: newName }, {
                new: true,
            });
        });
    }
    addUserToGroupChat(groupChatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.findOneAndUpdate({ _id: groupChatId }, { $push: { users: userId } }, {
                new: true,
            });
        });
    }
    removeUserFromGroupChat(groupChatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.findOneAndUpdate({ _id: groupChatId }, { $pull: { users: userId } }, {
                new: true,
            });
        });
    }
    getAvailableChat(loggedInUser, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_1.ChatModel.findOne({
                users: { $all: [loggedInUser, user] },
                isGroupChat: { $ne: true },
            });
        });
    }
}
const ChatRepository = new ChatRepositoryClass();
exports.default = ChatRepository;
