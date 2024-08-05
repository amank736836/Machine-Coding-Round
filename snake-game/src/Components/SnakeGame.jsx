import { useEffect, useRef, useState } from "react";

export default function SnakeGame() {
  const [GRID_SIZE, setGRID_SIZE] = useState(15);
  const GRIDGAME = Array.from({ length: GRID_SIZE }, () =>
    new Array(GRID_SIZE).fill("")
  );

  const initialSnakeBody = [
    [5, 5],
    // [6, 5],
    // [7, 5],
  ];

  const [snakeBody, setSnakeBody] = useState([...initialSnakeBody]);

  const directionRef = useRef([1, 0]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const copySnakeBody = [...prevSnakeBody];
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ];

        if (
          copySnakeBody.some(([x, y]) => x === newHead[0] && y === newHead[1])
        ) {
          return [...initialSnakeBody];
        }

        if (
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1]
        ) {
          foodRef.current = generateFood();
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
        // if (
        //   (newHead[0] < 0) |
        //   (newHead[0] >= GRID_SIZE) |
        //   (newHead[1] < 0) |
        //   (newHead[1] >= GRID_SIZE)
        // ) {
        //   //   clearInterval(interval);
        //   // return prevSnakeBody;
        //   return [
        //     [5, 5],
        //     [6, 5],
        //     [7, 5],
        //   ];
        // }
        copySnakeBody.unshift(newHead);
        return copySnakeBody;
      });
    }, 100);

    const handleDirection = (e) => {
      const key = e.key;
      console.log(key);
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

    window.addEventListener("keydown", handleDirection);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleDirection);
    };
  }, []);

  const isSnakeBodyDiv = (xc, yc) => {
    return snakeBody.some(([x, y]) => x === xc && y === yc);
  };

  return (
    <div
      className="container"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {GRIDGAME.map((row, yc) =>
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
  );
}
