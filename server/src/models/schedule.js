const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    matchName: {
      type: String,
      required: true,
    },
    team1: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "team",
    },
    team2: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "team",
    },
    time: {
      type: String,
    
    },
    date: {
      type: String,
      
    },
    venue: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("schedule", scheduleSchema);
module.exports = Schedule;
