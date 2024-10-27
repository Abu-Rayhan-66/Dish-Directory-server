import { Schema, model } from "mongoose";
import config from "../../config";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    premiumMembership: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
    followers: {
      type: [String],
      default: [],
      ref:"User"
    },
    following: {
      type: [String],
      default: [],
      ref:"User"
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    
    transactionId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

 const UserModel = model<TUser>("User", userSchema);
export default UserModel

