const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", reviewSchema);
