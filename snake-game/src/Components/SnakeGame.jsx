import { useEffect, useRef, useState } from "react";
import highestScoreSend from "../Functions/highestScoreSend";

export default function SnakeGame() {
  const [GRID_SIZE, setGRID_SIZE] = useState(20);
  const GRIDGAME = Array.from({ length: GRID_SIZE }, () =>
    new Array(GRID_SIZE).fill("")
  );

  const initialSnakeBody = [[5, 5]];

  const [snakeBody, setSnakeBody] = useState([...initialSnakeBody]);
  const [user, setUser] = useState("");
  const [AllScores, setAllScores] = useState([]);
  const [alert, setAlert] = useState(false);
  const [fr, setFr] = useState(0);  

  const directionRef = useRef([1, 0]);
  const interval = useRef(null);
  const score = useRef(0);

  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    if (snakeBody.some(([xc, yc]) => xc === x && yc === y)) {
      return generateFood();
    } else {
      return [x, y];
    }
  };

  const foodRef = useRef(generateFood());

  const runSnake = () => {
    interval.current = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const copySnakeBody = [...prevSnakeBody];
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ];

        if (
          copySnakeBody
            .slice(1)
            .some(([x, y]) => x === newHead[0] && y === newHead[1])
        ) {
          highestScoreSend({ user, score: score.current });
          updateLocalStorage({ user, score: score.current });
          console.log("Game Over");
          score.current = 0;
          return [...initialSnakeBody];
        }

        if (
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1]
        ) {
          foodRef.current = generateFood();
          score.current += 1;
        } else {
          copySnakeBody.pop();
        }
        if (newHead[0] < 0) {
          newHead[0] = GRID_SIZE - 1;
        }
        if (newHead[0] >= GRID_SIZE) {
          newHead[0] = 0;
        }
        if (newHead[1] < 0) {
          newHead[1] = GRID_SIZE - 1;
        }
        if (newHead[1] >= GRID_SIZE) {
          newHead[1] = 0;
        }
        copySnakeBody.unshift(newHead);
        return copySnakeBody;
      });
    }, 85 - score.current);
  };

  const updateLocalStorage = ({ user, score }) => {
    const scores = [...AllScores, { name: user, score }];
    scores.sort((a, b) => b.score - a.score);
    setAllScores(scores.slice(0, 5));
  };

  const handleDirection = (e) => {
    const key = e.key;
    console.log(interval.current);
    if (interval.current === null && user.trim() !== "") {
      runSnake();
    }
    if (key === "ArrowUp" && directionRef.current[1] === 0) {
      directionRef.current = [0, -1];
    } else if (key === "ArrowDown" && directionRef.current[1] === 0) {
      directionRef.current = [0, 1];
    } else if (key === "ArrowLeft" && directionRef.current[0] === 0) {
      directionRef.current = [-1, 0];
    } else if (key === "ArrowRight" && directionRef.current[0] === 0) {
      directionRef.current = [1, 0];
    }
  };

  const isSnakeBodyDiv = (xc, yc) => {
    return snakeBody.some(([x, y]) => x === xc && y === yc);
  };

  const highestScores = async () => {
    try {
      const data = await fetch(
        "https://machine-coding-round-bsrq.onrender.com/snakeGame"
      );
      const scores = await data.json();
      setAllScores(scores);
      setFr(()=>{
        return (scores.length / 5) + 1;
      })
    } catch (error) {
      console.log(error);
      const scores = [
        {
          name: "Error in fetching data",
          score: null,
        },
      ];
      setAllScores(scores);
    }
  };

  useEffect(() => {
    if (score.current === 0) {
      clearInterval(interval.current);
      interval.current = null;
    } else {
      clearInterval(interval.current);
      interval.current = null;
      runSnake();
    }
  }, [score.current]);

  useEffect(() => {
    highestScores();
    window.addEventListener("keydown", handleDirection);

    return () => {
      clearInterval(interval.current);
      interval.current = null;
      window.removeEventListener("keydown", handleDirection);
    };
  }, []);

  return (
    <div className="container">
      <div className="title">
        <div className="gameName">Snake Game</div>
        <div className="name">{user}</div>
        <div className="scoreCard">Score : {score.current}</div>
      </div>
      <div
        className="container-game"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          height: `${GRID_SIZE}rem`,
          width: `${GRID_SIZE}rem`,
        }}
      >
        {interval.current == null && (
          <div className="inputs">
            <input
              type="button"
              value="Start"
              onClick={
                user === ""
                  ? () => {
                      setAlert(true);
                    }
                  : () => {
                      runSnake();
                    }
              }
              className="start"
            />
            <input
              type="text"
              placeholder="Enter your name"
              className="user"
              value={user}
              onChange={(e) => {
                setUser(e.target.value.substring(0, 20));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && user.trim() !== "") {
                  runSnake();
                }
              }}
            />
            {alert && <p className="alert">Please enter your name</p>}
          </div>
        )}

        {interval.current !== null &&
          GRIDGAME.map((row, yc) =>
            row.map((cell, xc) => (
              <div
                key={`${xc} * ${GRID_SIZE} + ${yc}`}
                className={`cell
            ${isSnakeBodyDiv(xc, yc) ? "snake" : ""}
            ${
              foodRef.current[0] === xc && foodRef.current[1] === yc
                ? "food"
                : ""
            }
            `}
              ></div>
            ))
          )}
      </div>
      <div className="buttons">
        <div className="up">
          <button
            onClick={() => {
              if (interval.current === null && user.trim() !== "") {
                runSnake();
              }
              if (directionRef.current[1] === 0) {
                directionRef.current = [0, -1];
              }
            }}
          >
            ⬆️
          </button>
        </div>
        <div className="leftright">
          <button
            onClick={() => {
              if (interval.current === null && user.trim() !== "") {
                runSnake();
              }
              if (directionRef.current[0] === 0) {
                directionRef.current = [-1, 0];
              }
            }}
          >
            ⬅️
          </button>
          <button disabled>🫰</button>
          <button
            onClick={() => {
              if (interval.current === null && user.trim() !== "") {
                runSnake();
              }
              if (directionRef.current[0] === 0) {
                directionRef.current = [1, 0];
              }
            }}
          >
            ➡️
          </button>
        </div>
        <div className="down">
          <button
            onClick={() => {
              if (interval.current === null && user.trim() !== "") {
                runSnake();
              }
              if (directionRef.current[1] === 0) {
                directionRef.current = [0, 1];
              }
            }}
          >
            ⬇️
          </button>
        </div>
      </div>
      <div
        className="scoresContainer"
        style={{
          gridTemplateColumns: `repeat(${fr}, 1fr)`,
        }}
      >
        <h3>Highest Scores</h3>
        <div className="scores">
          {AllScores.map((score, index) => (
            <div key={index} className="score">
              <div>
                {index + 1}. {score.name} - {score.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
