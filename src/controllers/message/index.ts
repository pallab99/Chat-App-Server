import { Response, Request } from "express";
import { databaseLogger } from "../../utils/dbLogger";
import { sendResponse } from "../../utils/response";
import { HTTP_STATUS } from "../../constant/statusCode";
import { RESPONSE_MESSAGE } from "../../constant/responseMessage";
import UserService from "../../services/user";
import MessageService from "../../services/message";

class MessageControllerClass {
  async sendMessage(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { content, chatId } = req.body;
      const { email } = req.user;
      const sender = await UserService.findByEmail(email);

      if (!sender) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.NO_DATA
        );
      }

      const message = {
        sender: sender?._id,
        content: content,
        chat: chatId,
      };
      const newMessage = await MessageService.newMessage(message);

      if (!newMessage.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.SEND_MESSAGE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.SEND_MESSAGE_SUCCESS
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
  async getAllMessage(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { chatId } = req.params;

      const allMessageByChatId =
        await MessageService.allMessageByChatId(chatId);

      if (!allMessageByChatId.success) {
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
        allMessageByChatId.data
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
  async updateMessage(req: Request, res: Response) {
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
  async deleteMessage(req: Request, res: Response) {
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
const MessageController = new MessageControllerClass();
export default MessageController;
