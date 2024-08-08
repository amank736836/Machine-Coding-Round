const Score = require("../models/score.model.js");

const getScore = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json(scores);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const foulWords = [
  "abuse",
  "bastard",
  "bitch",
  "crap",
  "damn",
  "dick",
  "douche",
  "fag",
  "fuck",
  "idiot",
  "moron",
  "piss",
  "prick",
  "shit",
  "slut",
  "whore",
  "chutiya",
  "madarchod",
  "bhosdike",
  "lund",
  "gandu",
  "lavde",
  "bhenchod",
  "bhosdi",
  "randi",
  "jhant",
  "gaand",
  "choot",
  "saala",
  "haraami",
  "haraamzada",
  "kutta",
  "kamina",
  "kamine",
  "chudail",
  "chut",
  "kutti",
  "bhen ke lode",
  "maderchod",
  "cock",
  "cum",
  "jerk",
  "pussy",
  "tits",
  "twat",
  "orgasm",
  "sex",
  "nipple",
  "asshole",
  "fisting",
  "suck",
  "bukkake",
  "blowjob",
  "rimjob",
  "pimp",
  "escort",
  "nude",
  "porn",
  "masturbate",
  "semen",
  "bastardos",
  "cunt",
  "motherfucker",
  "dildo",
  "faggy",
  "faggot",
  "gash",
  "banger",
  "clit",
  "freak",
  "kinky",
  "skank",
  "slutty",
  "tranny",
  "wanker",
  "whore",
  "smegma",
  "shag",
  "cocksucker",
  "fap",
  "titties",
  "buttplug",
  "douchebag",
  "pussyhole",
  "pissflaps",
  "dickhead",
  "pecker",
  "rimjob",
  "vagina",
  "clunge",
  "spunk",
  "minge",
  "crunt",
  "dirty",
  "jizz",
  "knob",
  "knobhead",
  "spunk",
  "asslick",
  "shagger",
  "faggotry",
  "cockwomble",
  "fucking",
  "prickhead",
  "shithead",
  "abuse",
  "bastard",
  "bitch",
  "crap",
  "damn",
  "dick",
  "douche",
  "fag",
  "fuck",
  "idiot",
  "moron",
  "piss",
  "prick",
  "shit",
  "slut",
  "whore",
  "chutiya",
  "madarchod",
  "bhosdike",
  "lund",
  "gandu",
  "lavde",
  "bhenchod",
  "bhosdi",
  "randi",
  "jhant",
  "gaand",
  "choot",
  "saala",
  "haraami",
  "haraamzada",
  "kutta",
  "kamina",
  "kamine",
  "chudail",
  "chut",
  "kutti",
  "bhen ke lode",
  "maderchod",
  "bastardos",
  "gandmasti",
  "gand",
  "chootmar",
  "bhen ke lode",
  "bhosdiwala",
  "ganduu",
  "gandusar",
  "kaminapan",
  "madar",
  "chutiyapa",
  "khoti",
  "lode",
  "lodu",
  "mader",
  "gandmar",
  "bhen ke kothi",
  "gandki",
  "bhen ka loda",
  "gandi",
  "behenchod",
  "maderchood",
  "bhosdika",
  "randi",
  "jhant",
  "bhen ka loda",
  "mader",
  "bhainchod",
  "koti",
  "bhand",
  "chutki",
  "gandichor",
  "jhand",
  "kanjar",
  "kothi",
  "gandmasti",
  "gand",
  "chut",
  "gandi",
  "gandmar",
  "chooth",
  "jhandu",
  "chutiya",
  "bhainchod",
  "khotta",
  "bhenchod",
  "kuchra",
  "bhenchod",
  "kamini",
  "kothi",
  "fuckin",
  "bhosdi",
  "bhosdike",
  "chut",
  "lodu",
  "gand",
  "kamina",
  "kamine",
  "gandmasti",
  "fuck",
  "sex",
  "pussy",
  "tits",
  "dick",
  "cock",
  "cunt",
  "jizz",
  "spunk",
  "blowjob",
  "bukkake",
  "rimjob",
  "suck",
  "orgasm",
  "masturbate",
  "semen",
  "nude",
  "porn",
  "escort",
  "pimp",
  "fisting",
  "dildo",
  "faggy",
  "faggot",
];

const addScore = async (req, res) => {
  const { name, score } = req.body;

  for (let foulWord of foulWords) {
    if (name.toLowerCase().includes(foulWord)) {
      return res
        .status(400)
        .json({ message: "Name contains inappropriate language." });
    }
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
