import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projDetails:{
      title:String,
      email:[],
      roles:[],
      duration:String,
    },
    isActive: {
      type: Boolean,
    },
    isPublish: {
      type: Boolean,
    },
    proj: [
      {
        name: String,
        description: String,
        img: {
          type: String,
        },
        attributes: [{ _id: false, field: String, value: String }],
      },
    ],
    attractiveInstruc: {
      type: String,
    },
    audioInstruc: {
      type: String,
    },
    rankInstruc: {
      type: String,
    },
    audioRatingInstruc: [],
    introInstruc: {
      type: String,
    },
    writtenIntro: [],
    prewrittenInstruc: {
      type: String,
    },
    messageOptions: [],
    audio: [],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Projects", ProjectSchema);
