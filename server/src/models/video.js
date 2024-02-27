const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    VideoID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("video", videoSchema);
module.exports = Video;
