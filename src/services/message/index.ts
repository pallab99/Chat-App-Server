import MessageRepository from "../../repository/message";

class MessageServiceClass {
  async newMessage(newMessage: any) {
    const result = await MessageRepository.newMessage(newMessage);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async allMessageByChatId(chatId: string) {
    const result = await MessageRepository.allMessageByChatId(chatId);
    if (result.length) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
}

const MessageService = new MessageServiceClass();

export default MessageService;
