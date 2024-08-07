const Score = require("../models/score.model.js");

const getScore = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(5);
    res.status(200).json(scores);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addScore = async (req, res) => {
  const score = new Score({
    name: req.body.name,
    score: req.body.score,
  });

  try {
    const newScore = await score.save();

    const allScores = await Score.find().sort({ score: -1 });

    // If there are more than 5 scores, remove the lowest ones
    if (allScores.length > 5) {
      const scoresToRemove = allScores.slice(5);
      for (let scoreToRemove of scoresToRemove) {
        await Score.findByIdAndDelete(scoreToRemove._id);
      }
    }

    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getScore,
  addScore,
};
