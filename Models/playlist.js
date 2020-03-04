const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    playlistName: {
      type: String,
      required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Playlist", playlistSchema);
