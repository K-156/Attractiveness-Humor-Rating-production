import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projDetails:{
      title:String,
      email:[],
      roles:[],
      duration:String,
    },
    sections: {
      type: [],
      required:true,
    },
    data:[],
    isActive: {
      type: Boolean,
    },
    isPublish: {
      type: Boolean,
    },
    
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
