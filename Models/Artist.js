const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true
    },
    
    artistImage: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Artist", artistSchema);
