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
const dbLogger_1 = require("../../utils/dbLogger");
const response_1 = require("../../utils/response");
const statusCode_1 = require("../../constant/statusCode");
const responseMessage_1 = require("../../constant/responseMessage");
const user_1 = __importDefault(require("../../services/user"));
const chat_1 = __importDefault(require("../../services/chat"));
class ChatClassController {
    CreateASingleChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
                const { email } = req.user;
                const { userId } = req.body;
                const loggedInUser = yield user_1.default.findByEmail(email);
                if (!loggedInUser) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.NOT_FOUND);
                }
                const isChatAvailable = yield chat_1.default.isChatAvailable(loggedInUser._id, userId);
                if (isChatAvailable.success) {
                    const getAvailableChat = yield chat_1.default.getAvailableChat(loggedInUser._id, userId);
                    if (getAvailableChat.success) {
                        return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.CHAT_AVAILABLE, getAvailableChat.data);
                    }
                }
                const newChat = yield chat_1.default.newSingleChat([
                    loggedInUser._id,
                    userId,
                ]);
                if (!newChat.success) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.CHAT_CREATE_FAILED);
                }
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.CHAT_CREATE_SUCCESS, newChat.data);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getAllChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
                const { email } = req.user;
                const user = yield user_1.default.findByEmail(email);
                if (!user) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.NOT_FOUND);
                }
                const allChat = yield chat_1.default.getAllChatOfAUser(user._id);
                if (!allChat.success) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA);
                }
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA, allChat);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    CreateAGroupChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
                const { email } = req.user;
                const { groupName, users } = req.body;
                const user = yield user_1.default.findByEmail(email);
                if (!user) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.NOT_FOUND);
                }
                const newGroupChat = yield chat_1.default.newGroupChat(users, groupName, user._id);
                if (!newGroupChat.success) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.CHAT_CREATE_FAILED);
                }
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.CHAT_CREATE_SUCCESS);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    renameGroupChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
                const { groutChatId } = req.params;
                const { groupName } = req.body;
                const updatedGroupName = yield chat_1.default.renameGroupChat(groutChatId, groupName);
                if (!updatedGroupName.success) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.CHAT_RENAME_FAILED);
                }
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.CHAT_RENAME_SUCCESS);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    addUserToGroupChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
                const { userId } = req.body;
                const { groutChatId } = req.params;
                const addUserToGroupChat = yield chat_1.default.addUserToGroupChat(groutChatId, userId);
                if (!addUserToGroupChat.success) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.ADD_USER_FAILED);
                }
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.ADD_USER_SUCCESS);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteUserFromGroupChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
                const { userId } = req.body;
                const { groutChatId } = req.params;
                const removeUserFromGroupChat = yield chat_1.default.removeUserFromGroupChat(groutChatId, userId);
                if (!removeUserFromGroupChat.success) {
                    return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.BAD_REQUEST, responseMessage_1.RESPONSE_MESSAGE.REMOVE_USER_FAILED);
                }
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.OK, responseMessage_1.RESPONSE_MESSAGE.REMOVE_USER_SUCCESS);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteGroupChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, dbLogger_1.databaseLogger)(req.originalUrl);
            }
            catch (error) {
                console.log(error);
                (0, dbLogger_1.databaseLogger)(error.message);
                return (0, response_1.sendResponse)(res, statusCode_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, responseMessage_1.RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
const ChatController = new ChatClassController();
exports.default = ChatController;
