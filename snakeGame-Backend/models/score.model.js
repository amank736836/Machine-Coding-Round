const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time : {
    type: String,
    required: true,
  }
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;