import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      minlength:3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address.",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

export default User;
