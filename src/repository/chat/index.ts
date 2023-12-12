import mongoose from "mongoose";
import { ChatModel } from "../../models/chat";

class ChatRepositoryClass {
  async getAllChatOfAUser(userId: string) {
    return await ChatModel.find({ users: { $in: [userId] } })
      .populate("users", "-__v -createdAt -updatedAt")
      .populate("latestMessage");
  }
  async chatAvailable(sender: string, receiver: string) {
    return await ChatModel.findOne({
      isGroupChat: false,
      users: { $in: [sender, receiver] },
    });
  }
  async newSingleChat(users: mongoose.Schema.Types.ObjectId[]) {
    return await ChatModel.create({
      chatName: "single chat",
      isGroupChat: false,
      users: users,
    });
  }

  async newGroupChat(
    users: mongoose.Schema.Types.ObjectId[],
    groupName: string,
    groupAdmin: mongoose.Schema.Types.ObjectId
  ) {
    return await ChatModel.create({
      chatName: groupName,
      isGroupChat: true,
      users: users,
      groupAdmin: groupAdmin,
    });
  }

  async renameGroupChat(groupChatId: string, newName: string) {
    return await ChatModel.findOneAndUpdate(
      { _id: groupChatId },
      { chatName: newName },
      {
        new: true,
      }
    );
  }

  async addUserToGroupChat(groupChatId: string, userId: string) {
    return await ChatModel.findOneAndUpdate(
      { _id: groupChatId },
      { $push: { users: userId } },
      {
        new: true,
      }
    );
  }

  async removeUserFromGroupChat(groupChatId: string, userId: string) {
    return await ChatModel.findOneAndUpdate(
      { _id: groupChatId },
      { $pull: { users: userId } },
      {
        new: true,
      }
    );
  }

  async getAvailableChat(loggedInUser: string, user: string) {
    return await ChatModel.findOne({
      users: { $all: [loggedInUser, user] },
      isGroupChat: { $ne: true },
    });
  }
}

const ChatRepository = new ChatRepositoryClass();
export default ChatRepository;
