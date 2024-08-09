const Score = require("../models/score.model.js");

const highestScore = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(6);
    res.status(200).json(scores);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const latestScore = async (req, res) => {
  try {
    const latestScores = await Score.find().sort({ time: -1 }).limit(6);
    res.status(200).json(latestScores);
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
  "vagina",
  "clunge",
  "spunk",
  "minge",
  "crunt",
  "dirty",
  "jizz",
  "knob",
  "knobhead",
  "asslick",
  "shagger",
  "faggotry",
  "cockwomble",
  "prickhead",
  "shithead",
  "gandmasti",
  "chootmar",
  "bhosdiwala",
  "ganduu",
  "gandusar",
  "kaminapan",
  "madar",
  "chutiyapa",
  "khoti",
  "lode",
  "lodu",
  "gandmar",
  "bhen ke kothi",
  "gandki",
  "bhen ka loda",
  "gandi",
  "behenchod",
  "maderchood",
  "bhosdika",
  "kanjar",
  "kothi",
  "khotta",
  "kuchra",
  "naughty",
  "tease",
  "flirt",
  "hottie",
  "saucy",
  "raunchy",
  "seduce",
  "tempt",
  "provocative",
  "lust",
  "steamy",
  "sensual",
  "risque",
  "playboy",
  "playgirl",
  "booty",
  "curvy",
  "voluptuous",
  "sexy",
  "erotic",
  "babe",
  "hunk",
  "sultry",
  "naughty",
  "alluring",
  "kinky",
  "siren",
  "vixen",
  "tease",
  "tantalize",
  "arousing",
  "desire",
  "moan",
  "whisper",
  "dirty talk",
  "X",
  "XXX",
  "tatta",
  "aarushi",
  "aisha",
  "aliya",
  "anjali",
  "anita",
  "ankita",
  "anju",
  "anushka",
  "aparna",
  "asha",
  "asmi",
  "avni",
  "bhavna",
  "bina",
  "chandni",
  "deepa",
  "deepika",
  "divya",
  "esha",
  "gayatri",
  "geeta",
  "gita",
  "hema",
  "ishita",
  "jaya",
  "jyoti",
  "kanika",
  "kavita",
  "kirti",
  "komal",
  "lavanya",
  "leela",
  "laxmi",
  "meena",
  "megha",
  "mira",
  "naina",
  "nalini",
  "neha",
  "nidhi",
  "nina",
  "nisha",
  "nita",
  "parvati",
  "pooja",
  "priya",
  "rani",
  "rekha",
  "ritu",
  "rupal",
  "sanjana",
  "seema",
  "shreya",
  "sonal",
  "suman",
  "sushma",
  "tanya",
  "usha",
  "vaishali",
  "varsha",
  "vidya",
  "yashika",
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
      existingScore.time = new Date().toLocaleString();
      if (score > existingScore.score) {
        existingScore.score = score;
        await existingScore.save();
      } else {
        return res
          .status(200)
          .json({ message: "Score not high enough to update." });
      }
    } else {
      const newScore = new Score({ name, score , time: new Date().toLocaleString() });
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
  highestScore,
  addScore,
  latestScore,
};
