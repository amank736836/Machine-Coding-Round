const Score = require("../models/score.model.js");

const getScore = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json(scores);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addScore = async (req, res) => {
  const { name, score } = req.body;

  if (name.includes("and")) {
    return res.status(400).json({ message: "Name cannot contain 'and'." });
  }

  try {
    let existingScore = await Score.findOne({ name });

    if (existingScore) {
      if (score > existingScore.score) {
        existingScore.score = score;
        await existingScore.save();
      } else {
        return res
          .status(200)
          .json({ message: "Score not high enough to update." });
      }
    } else {
      const newScore = new Score({ name, score });
      await newScore.save();
    }

    // const allScores = await Score.find().sort({ score: -1 })
    // // console.log(allScores);

    // if (allScores.length > 5) {
    //   const scoresToRemove = allScores.slice(5);
    //   for (let scoreToRemove of scoresToRemove) {
    //     await Score.findByIdAndDelete(scoreToRemove._id);
    //   }
    // }

    res.status(201).json({ message: "Score added/updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getScore,
  addScore,
};
