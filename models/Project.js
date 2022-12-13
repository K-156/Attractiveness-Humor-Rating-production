import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
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
});

export default mongoose.model("Projects", ProjectSchema);
