const mongoose = require("mongoose");
const { highestScore } = require("../controllers/snakeGame.controller");
const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    highestScore: {
      type: Number,
      default: 0,
    },
    latestScore: {
      type: Number,
      default: 0,
    },
    visits: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
