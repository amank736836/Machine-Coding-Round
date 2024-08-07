const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const snakeGameRouter = require('./routes/snakeGame.routes.js');

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/snakeGame", snakeGameRouter);

module.exports = app;