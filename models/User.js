import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otplib from "otplib";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      // select:false,
    },
    otp: {
      type: String,
    },
    completionCode: {
      type: String,
    },
    projId: {
      type: String,
    },
    role: {
      type: String,
      default: "participant",
    },
    surveyRole: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["female", "male"],
    },
    age: {
      type: Number,
      trim: true,
    },
    ethnicity: {
      type: String,
      trim: true,
    },
    ipAddress: { type: String },
    userResponse: {},
    rank: [],
    startTime: { type: Date },
    endTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.compareOTP = async function (candidateEmail) {
  const token = otplib.authenticator.generate(candidateEmail);
  const isMatch = otplib.authenticator.check(token, candidateEmail);
  return isMatch;
};

UserSchema.methods.checkOTPValid = async function (candidateEmail) {
  const token = otplib.authenticator.generate(candidateEmail);
  const isMatch = otplib.authenticator.check(token, candidateEmail);
  return isMatch;
};

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
