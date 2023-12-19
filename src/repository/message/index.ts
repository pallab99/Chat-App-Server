import mongoose from "mongoose";
import { MessageModel } from "../../models/message";

class MessageRepositoryClass {
  async newMessage(newMessage: any) {
    return await MessageModel.create(newMessage);
  }

  async allMessageByChatId(chatId: string) {
    return await MessageModel.find({
      chat: new mongoose.Types.ObjectId(chatId),
    })
      .populate("sender", "-createdAt -updatedAt")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          model: "User",
        },
      });
  }
}

const MessageRepository = new MessageRepositoryClass();

export default MessageRepository;
