import { Schema, model } from "mongoose";

interface IChat {
  chatName?: string;
  isGroupChat?: boolean;
  users: Schema.Types.ObjectId[];
  latestMessage: Schema.Types.ObjectId;
  groupAdmin?: string;
  dp?: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema<IChat> = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
    dp: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ChatModel = model<IChat>("Chat", chatSchema);

export { ChatModel };
