const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    image: {
      type: String,
      default: "to be added",
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("image", imageSchema);
module.exports = Image;
