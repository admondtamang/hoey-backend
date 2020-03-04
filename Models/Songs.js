const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String
    }
  },
  { timestamps: true }
);

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    duration: {
      type: Number
    },
    year: {
      type: Number
    },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    played: { type: Number, default: 0 },
    comments: [commentSchema]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Song", songSchema);
