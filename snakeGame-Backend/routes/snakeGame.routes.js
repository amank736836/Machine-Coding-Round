const Router = require("express").Router;

const {
  highestScore,
  addScore,
  latestScore,
} = require("../controllers/snakeGame.controller.js");

const router = Router();

router.route("/addScore").post(addScore);
router.route("/highestScore").get(highestScore);
router.route("/latestScore").get(latestScore);

module.exports = router;
