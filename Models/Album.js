const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema({
  albumTitle: {
    type: String,
    required: true
  },
  albumCover: {
    type: String
  },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" }
});

module.exports = mongoose.model("Album", albumSchema);
