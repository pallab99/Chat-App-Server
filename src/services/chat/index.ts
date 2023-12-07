import mongoose from "mongoose";
import ChatRepository from "../../repository/chat";

class CharServiceClass {
  async isChatAvailable(sender: string, receiver: string) {
    const result = await ChatRepository.chatAvailable(sender, receiver);
    console.log(result);

    if (result && Object.keys(result).length > 0) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async newSingleChat(users: mongoose.Schema.Types.ObjectId[]) {
    const result = await ChatRepository.newSingleChat(users);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async getAllChatOfAUser(userId: string) {
    const result = await ChatRepository.getAllChatOfAUser(userId);
    if (result && result.length > 0) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async newGroupChat(
    users: string,
    groupName: string,
    groupAdmin: mongoose.Schema.Types.ObjectId
  ) {
    const groupUser: mongoose.Schema.Types.ObjectId[] = JSON.parse(users);
    groupUser.push(groupAdmin);
    const result = await ChatRepository.newGroupChat(
      groupUser,
      groupName,
      groupAdmin
    );
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async renameGroupChat(groupChatId: string, newName: string) {
    const result = await ChatRepository.renameGroupChat(groupChatId, newName);
    if (result?.isModified) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async addUserToGroupChat(groupChatId: string, userId: string) {
    const result = await ChatRepository.addUserToGroupChat(groupChatId, userId);
    if (result?.isModified) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async removeUserFromGroupChat(groupChatId: string, userId: string) {
    const result = await ChatRepository.removeUserFromGroupChat(
      groupChatId,
      userId
    );
    console.log(result);

    if (result?.isModified) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
}

const ChatService = new CharServiceClass();

export default ChatService;
