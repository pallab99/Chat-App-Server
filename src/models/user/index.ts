import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  dp?: string | never[];
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: 30,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },

    dp: {
      type: String,
      required: false,
      default:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model<IUser>("User", userSchema);
export { UserModel };
