const Score = require("../models/score.model.js");

const highestScore = async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1 })
      .sort({ highestScore: -1 })
      .limit(5);
    res.status(200).json(scores);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const latestScore = async (req, res) => {
  try {
    const latestScores = await Score.find().sort({ updatedAt: -1 }).limit(5);
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
  "nigger",
  "negro",
  "coon",
  "spic",
  "chink",
  "gook",
  "kike",
  "hebe",
  "wetback",
  "cracker",
  "honky",
  "gyp",
  "wog",
  "jewboy",
  "dyke",
  "tranny",
  "fairy",
  "pansy",
  "queer",
  "homo",
  "redskin",
  "injun",
  "savage",
  "sambo",
  "mulatto",
  "half-breed",
  "towelhead",
  "raghead",
  "terrorist",
  "camel jockey",
  "sand nigger",
  "jungle bunny",
  "banana bender",
  "chinaman",
  "slant-eye",
  "jap",
  "kraut",
  "frenchie",
  "polack",
  "beaner",
  "wop",
  "mick",
  "kraut",
  "taco bender",
  "paki",
  "dothead",
  "bindi",
  "abo",
  "boong",
  "coonass",
  "guido",
  "greaser",
  "wetback",
  "hillbilly",
  "yank",
  "redneck",
  "white trash",
  "bushman",
  "bushie",
  "ape",
  "gorilla",
  "monkey",
  "zebra",
  "coon",
  "jungle",
  "coonhound",
  "pickaninny",
  "darkie",
  "faggot",
  "poof",
  "lesbo",
  "dyke",
  "butch",
  "flamer",
  "fruit",
  "pansy",
  "fairy",
  "twink",
  "shemale",
  "transvestite",
  "tranny",
  "sissy",
  "nancy",
  "limp wrist",
  "bender",
  "slope",
  "zipperhead",
  "beaner",
  "taco",
  "wetback",
  "mojito",
  "migra",
  "spic",
  "anchor baby",
  "cholo",
  "spic",
  "beaner",
  "gringo",
  "guero",
  "peckerwood",
  "clay-eater",
  "wood",
  "pale face",
  "redleg",
  "hoosier",
  "hillbilly",
  "bumpkin",
  "white bread",
  "good ol' boy",
  "whitie",
  "angry white male",
  "wigger",
  "wifebeater",
  "cracker",
  "hick",
  "jersey barrier",
  "polack",
  "sassenach",
  "sheep shagger",
  "sheep",
  "backwoods",
  "red",
  "redneck",
  "bushwhacker",
  "mountain man",
  "mule skinner",
  "poor white trash",
  "granny",
  "mammy",
  "old lady",
  "hymie",
  "kike",
  "sheeny",
  "shylock",
  "yid",
  "heeb",
  "yenta",
  "shaygetz",
  "shiksa",
  "nazi",
  "skinhead",
  "baldfaced",
  "hardnose",
  "tightwad",
  "chiseler",
  "money-grubber",
  "cheapskate",
  "penny-pincher",
  "hoarder",
  "grinch",
  "scrimper",
  "tightfisted",
  "cheat",
  "swindler",
  "crook",
  "robber",
  "bandit",
  "burglar",
  "thief",
  "swindler",
  "fence",
  "cull",
  "swindler",
  "charlatan",
  "fraud",
  "trickster",
  "mountebank",
  "cheat",
  "villain",
  "outlaw",
  "shyster",
  "sneak",
  "pickpocket",
  "mugger",
  "grifter",
  "rat",
  "snake",
  "scammer",
  "cheater",
  "swindler",
  "conman",
  "crook",
  "criminal",
  "robber",
  "liar",
  "deceiver",
  "impostor",
  "fraud",
  "charlatan",
  "phony",
  "phony baloney",
  "fake",
  "sham",
  "pretender",
  "deceiver",
  "liar",
  "hypocrite",
  "charlatan",
  "faker",
  "impersonator",
  "poser",
  "pretender",
  "two-face",
  "false",
  "betrayer",
  "turncoat",
  "traitor",
  "betrayer",
  "informer",
  "rat",
  "sellout",
  "Judas",
  "Benedict Arnold",
  "snake",
  "weasel",
  "chamar",
  "bhangi",
  "chamar",
  "muslim",
  "christian",
  "hindu",
  "baniya",
  "dalit",
  "brahmin",
  "kshatriya",
  "shudra",
  "vaishya",
  "mlechchha",
  "ashraf",
  "ajlaf",
  "arzal",
  "mughal",
  "rajput",
  "thakur",
  "thambi",
  "bhaiya",
  "madrasi",
  "sardar",
  "patel",
  "paki",
  "bangal",
  "marwari",
  "bania",
  "bihari",
  "kanjar",
  "ghati",
  "marathi",
  "gorkha",
  "bong",
  "chinki",
  "mallu",
  "londa",
  "kallu",
  "kaalia",
  "dhobi",
  "kshatriya",
  "brahmin",
  "shudra",
  "vaishya",
  "bhaiya",
  "madraasi",
  "gulti",
  "chinki",
  "bong",
  "mallu",
  "chutya",
  "londa",
  "gujju",
  "bania",
  "baniya",
  "punjabi",
  "madrasi",
  "ghati",
  "kanjar",
  "marwadi",
  "gorkha",
  "naga",
  "kabli",
  "pathan",
  "upaya",
  "bakri",
  "beef-eater",
  "beef",
  "chamaar",
  "kutta",
  "kutri",
  "garhi",
  "bihar",
  "bihari",
  "assami",
  "assamese",
  "bihari",
  "jharkhandi",
  "marathi",
  "laturkar",
  "solapuri",
  "berad",
  "bedar",
  "bedara",
  "bedari",
  "dalit",
  "muslim",
  "christian",
  "sikh",
  "parsis",
  "parsee",
  "parsi",
  "hindutva",
  "hindu",
  "moslem",
  "khalsa",
  "jaat",
  "jat",
  "jatav",
  "meena",
  "gurjar",
  "gawaria",
  "pahari",
  "bhopa",
  "rathi",
  "rauta",
  "bhains",
  "bhangi",
  "dalit",
  "garhwali",
  "gujjar",
  "gujjara",
  "gaddi",
  "gaddiyan",
  "gaddis",
  "sati",
  "saudagar",
  "teli",
  "chowkidar",
  "dhobi",
  "dravidian",
  "kaalu",
  "kanjar",
  "khatik",
  "khokhar",
  "labana",
  "laiya",
  "lathar",
  "lawania",
  "lodhi",
  "lohar",
  "mahajan",
  "mahanta",
  "mahisya",
  "mehtar",
  "mohani",
  "mohini",
  "moirangthem",
  "pasi",
  "patwa",
  "poddar",
  "raigar",
  "rajak",
  "rajput",
  "ramgarhia",
  "ravana",
  "rohera",
  "roy",
  "sahu",
  "samant",
  "sandeep",
  "sanjay",
  "sarkar",
  "sastry",
  "shahu",
  "shakya",
  "shambhu",
  "sharma",
  "shekhawat",
  "shetty",
  "shibu",
  "sikligar",
  "singh",
  "singha",
  "sodhi",
  "sohini",
  "solanki",
  "soni",
  "sthapati",
  "tamuli",
  "tanwar",
  "teli",
  "terai",
  "thapa",
  "tharakan",
  "thathera",
  "thevar",
  "thimmappa",
  "thiyyan",
  "todi",
  "totaram",
  "udupi",
  "upadhyaya",
  "upadhyay",
  "uppara",
  "valmiki",
  "varma",
  "vishwakarma",
  "yadav",
  "yadava",
  "yash",
  "yojana",
  "zari",
  "zaveri",
  "zar",
  "zariwala",
  "mia khalifa",
  "sasha grey",
  "james deen",
  "riley reid",
  "lisa ann",
  "johnny sins",
  "lexington steele",
  "ava addams",
  "brandi love",
  "ron jeremy",
  "stormy daniels",
  "jenna jameson",
  "kendra lust",
  "adriana chechik",
  "mandy muse",
  "natasha nice",
  "abigail mac",
  "angelina valentine",
  "aspen rae",
  "august ames",
  "ava dalush",
  "brooke wylde",
  "brianna banks",
  "brittany andrews",
  "chanel preston",
  "charlotte stokely",
  "danny d",
  "emily willis",
  "gianna michaels",
  "gina valentina",
  "jayden jaymes",
  "keisha grey",
  "kenzie reeves",
  "kenzie taylor",
  "kimmy granger",
  "lana rhoades",
  "lela star",
  "lucas frost",
  "madison ivy",
  "maddy oreilly",
  "megan rain",
  "mercedes carrera",
  "nikki benz",
  "nikki delano",
  "nina elle",
  "nina hartley",
  "penny pax",
  "phoenix marie",
  "remy lacroix",
  "richelle ryan",
  "rocco siffredi",
  "sara jay",
  "stella cox",
  "tegan presley",
  "tori black",
  "veronica rodriguez",
  "vicky chase",
  "violet starr",
  "yurizan beltran"
];

const addScore = async (req, res) => {
  const { name, score } = req.body;

  const flag = false;
  for (let foulWord of foulWords) {
    if (name.toLowerCase().includes(foulWord)) {
      flag = true;
      break;
    }
  }

  if (flag) {
    name = "Anonymous";
  }

  try {
    let existingScore = await Score.findOne({ name });

    if (existingScore) {
      existingScore.time = new Date();
      existingScore.latestScore = score;
      existingScore.visits += 1;
      if (score > existingScore.highestScore) {
        existingScore.highestScore = score;
        if (score > existingScore.score) {
          existingScore.score = score;
        }
      }
      await existingScore.save();
    } else {
      const newScore = new Score({
        name,
        score,
        highestScore: score,
        latestScore: score,
        visits: 1,
      });
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
