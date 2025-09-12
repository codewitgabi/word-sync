import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDocument extends Document {
  username: string;
  password: string;
  email: string;
  checkPassword(password: string): boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
      set: (value: string) => {
        // If the password is already hashed (starts with $2), return it as-is

        if (value.startsWith("$2")) return value;

        // Hash and return

        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false, toObject: { useProjection: true } }
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<IUserDocument>("User", UserSchema);
export default User;
