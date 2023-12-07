import { Schema, model } from "mongoose";

interface IMessage {
  sender: Schema.Types.ObjectId;
  content: string;
  chat: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema: Schema<IMessage> = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

const MessageModel = model<IMessage>("Message", messageSchema);

export { MessageModel };
