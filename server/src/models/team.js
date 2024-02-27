const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "to be added",
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("team", teamSchema);
module.exports = Team;
