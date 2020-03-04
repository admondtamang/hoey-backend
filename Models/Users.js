const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    image: {
      type: String
    },
    admin: {
      type: Boolean,
      default: "false"
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
