const Router = require("express").Router;

const {
  getScore,
  addScore,
  latestScore,
} = require("../controllers/snakeGame.controller.js");

const router = Router();

router.route("/").get(getScore).post(addScore);

router.route("/latestScore").get(latestScore);

module.exports = router;
