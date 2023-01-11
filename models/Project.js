import mongoose from "mongoose";
import { nanoid } from "nanoid";

const ProjectSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(10),
    },
    projDetails: {
      title: {
        type: String,
        default: "untitled",
      },
      description: String,
      roles: [],
      duration: String,
      theme: {
        type: String,
        default: "green",
      },
      graphic: [],
      graphicLink: String,
    },
    emailList: {
      email: [],
      emailLink: [],
    },
    sections: {
      type: [],
      required: true,
    },
    data: [],
    isActive: {
      type: Boolean,
      default: false,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },

    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Please provide user"],
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Projects", ProjectSchema);
