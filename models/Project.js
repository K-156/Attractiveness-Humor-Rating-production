import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  proj: [
    {
      name: String,
      description: String,
      img: {
        // need include image and audio uploads
        type:String
      },
      attributes: [{ _id: false, field: String, value: String }],
    },
  ],
  attractivenessInstruc: {
    type: String,
    // required: [true, "Please provide attractiveness instructions"],
  },
  audioInstruc: {
    type: String,
    // required: [true, "Please provide attractiveness instructions"],
  },
  audioRatingInstruc: [],
  writtenInstruc: {
    type: String,
    // required: [true, "Please provide written instructions"],
  },
  writtenIntro: [],
  messageInstruc: {
    type: String,
    // required: [true, "Please provide message instructions"],
  },
  messageOptions: [],
});

export default mongoose.model("Projects", ProjectSchema);
