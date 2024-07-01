import bcryptjs from "bcryptjs";
import { UserSchemaTS } from "@/types";
import { Model, Schema, model, models } from "mongoose";

const UserSchema = new Schema<UserSchemaTS>(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      select: false,
    },
    image: {
      type: String,
    },
    authProviderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// //note => encrypt password:
// UserSchema.pre("save", async function (next): Promise<void> {
//   if (!this.isModified("password")) return next();
//   const salt = await bcryptjs.genSalt(10);
//   this.password = await bcryptjs.hash(this.password, salt);
//   next();
// });

// //note => compare password:
// UserSchema.methods.isPasswordCorrect = async function (
//   password: string
// ): Promise<boolean> {
//   return await bcryptjs.compare(password, this.password);
// };

const User =
  (models?.["User"] as Model<UserSchemaTS>) ||
  model<UserSchemaTS>("User", UserSchema);

export default User;
