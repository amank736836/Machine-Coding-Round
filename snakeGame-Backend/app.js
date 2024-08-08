const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const snakeGameRouter = require('./routes/snakeGame.routes.js');

const allowedOrigins = [
    'https://amank736836-snake.vercel.app',
    'https://snake-amank736836.vercel.app',
    'https://machine-coding-round-1.onrender.com',
    'https://nagini.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/snakeGame", snakeGameRouter);

module.exports = app;