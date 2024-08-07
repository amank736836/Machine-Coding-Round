const Router = require("express").Router;

const {
  getScore,
  addScore,
} = require("../controllers/snakeGame.controller.js");

const router = Router();

router.route("/").get(getScore).post(addScore);

module.exports = router;
