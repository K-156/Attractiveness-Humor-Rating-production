import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, "Please provide name"],
  // },
  // description: {
  //   type: String,
  //   required: [true, "Please provide description"],
  // },
  // attractivenessInstruc: {
  //   type: String,
  //   required: [true, "Please provide attractiveness instructions"],
  // },
  // audioInstruc: {
  //   type: String,
  //   enum: ["withdrawal", "deposit"],
  //   default: "withdrawal",
  // },
  proj: [
    {
      name: String,
      description: String,
      img: Image,
      attributes: [
        {
          field: String,
          value: String,
        },
      ],
    },
  ],
});

export default mongoose.model("Projects", ProjectSchema);
