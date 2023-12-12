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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = __importDefault(require("../../repository/chat"));
class CharServiceClass {
    isChatAvailable(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.chatAvailable(sender, receiver);
            console.log(result);
            if (result && Object.keys(result).length > 0) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    newSingleChat(users) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.newSingleChat(users);
            if (result) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    getAllChatOfAUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.getAllChatOfAUser(userId);
            if (result && result.length > 0) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    newGroupChat(users, groupName, groupAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupUser = JSON.parse(users);
            groupUser.push(groupAdmin);
            const result = yield chat_1.default.newGroupChat(groupUser, groupName, groupAdmin);
            if (result) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    renameGroupChat(groupChatId, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.renameGroupChat(groupChatId, newName);
            if (result === null || result === void 0 ? void 0 : result.isModified) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    addUserToGroupChat(groupChatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.addUserToGroupChat(groupChatId, userId);
            if (result === null || result === void 0 ? void 0 : result.isModified) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    removeUserFromGroupChat(groupChatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.removeUserFromGroupChat(groupChatId, userId);
            console.log(result);
            if (result === null || result === void 0 ? void 0 : result.isModified) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
    getAvailableChat(loggedInUser, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield chat_1.default.getAvailableChat(loggedInUser, user);
            if (result) {
                return { success: true, data: result };
            }
            return { success: false, data: null };
        });
    }
}
const ChatService = new CharServiceClass();
exports.default = ChatService;
