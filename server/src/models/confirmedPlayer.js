const mongoose = require("mongoose");

// Define the schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "to be added",
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  position: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  filled: {
    type: Boolean,
    default: true,
  },
});

// Compile the schema into a model
const Player = mongoose.model("confirmplayer", contactSchema);

module.exports = Player;
