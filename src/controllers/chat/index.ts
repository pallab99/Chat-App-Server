import { Request, Response } from "express";
import { databaseLogger } from "../../utils/dbLogger";
import { sendResponse } from "../../utils/response";
import { HTTP_STATUS } from "../../constant/statusCode";
import { RESPONSE_MESSAGE } from "../../constant/responseMessage";
import UserService from "../../services/user";
import ChatService from "../../services/chat";
import mongoose, { Schema } from "mongoose";
class ChatClassController {
  async CreateASingleChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { email } = req.user;
      const { userId } = req.body;
      const loggedInUser = await UserService.findByEmail(email);
      if (!loggedInUser) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.NOT_FOUND
        );
      }
      const isChatAvailable = await ChatService.isChatAvailable(
        loggedInUser._id,
        userId
      );

      if (isChatAvailable.success) {
        const getAvailableChat = await ChatService.getAvailableChat(
          loggedInUser._id,
          userId
        );

        if (getAvailableChat.success) {
          return sendResponse(
            res,
            HTTP_STATUS.OK,
            RESPONSE_MESSAGE.CHAT_AVAILABLE,
            getAvailableChat.data
          );
        }
      }

      const newChat = await ChatService.newSingleChat([
        loggedInUser._id,
        userId,
      ]);

      if (!newChat.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.CHAT_CREATE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.CHAT_CREATE_SUCCESS,
        newChat.data
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { email } = req.user;
      const user = await UserService.findByEmail(email);
      if (!user) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.NOT_FOUND
        );
      }

      const allChat = await ChatService.getAllChatOfAUser(user._id);
      if (!allChat.success) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA,
        allChat
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async CreateAGroupChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { email } = req.user;
      const { groupName, users } = req.body;
      const user = await UserService.findByEmail(email);
      if (!user) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.NOT_FOUND
        );
      }

      const newGroupChat = await ChatService.newGroupChat(
        users,
        groupName,
        user._id
      );

      if (!newGroupChat.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.CHAT_CREATE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.CHAT_CREATE_SUCCESS
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async renameGroupChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { groutChatId } = req.params;
      const { groupName } = req.body;

      const updatedGroupName = await ChatService.renameGroupChat(
        groutChatId,
        groupName
      );
      if (!updatedGroupName.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.CHAT_RENAME_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        RESPONSE_MESSAGE.CHAT_RENAME_SUCCESS
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
  async addUserToGroupChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { userId } = req.body;
      const { groutChatId } = req.params;

      const addUserToGroupChat = await ChatService.addUserToGroupChat(
        groutChatId,
        userId
      );

      if (!addUserToGroupChat.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.ADD_USER_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.ADD_USER_SUCCESS
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
  async deleteUserFromGroupChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { userId } = req.body;
      const { groutChatId } = req.params;

      const removeUserFromGroupChat = await ChatService.removeUserFromGroupChat(
        groutChatId,
        userId
      );

      if (!removeUserFromGroupChat.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.REMOVE_USER_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.REMOVE_USER_SUCCESS
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
  async deleteGroupChat(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const ChatController = new ChatClassController();
export default ChatController;
