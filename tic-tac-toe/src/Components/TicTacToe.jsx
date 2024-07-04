import React, { useEffect, useState } from "react";
import Board from "./Board";
import { checkWinner, initialState } from "../Utils/ticTacTow.utils.js";

function TicTacToe({ size = 3 }) {
  console.log(size);
  const [board, setBoard] = useState(initialState(size));
  useEffect(() => {}, [size]);
  // console.log(board);
  // const [turn , setTurn] = useState("X");
  const [turn, setTurn] = useState(true);
  const status = turn ? "Player X's turn" : "Player O's turn";
  const winner = checkWinner(board, size);
  console.log(winner);
  const handleClick = (row, col) => {
    // console.log(row, col);
    // const newBoard = board.map((r, rIndex) => {
    //   if (rIndex === row) {
    //     return r.map((c, cIndex) => {
    //       if (cIndex === col && c === null) {
    //         // setTurn(turn === "X" ? "O" : "X");
    //         // return turn;
    //         setTurn(!turn);
    //         return turn ? "X" : "O";
    //       }
    //       return c;
    //     });
    //   }
    //   return r;
    // });
    if (board[row][col] || winner) {
      return;
    }
    const deepCopy = JSON.parse(JSON.stringify(board));
    deepCopy[row][col] = turn ? "X" : "O";
    setBoard(deepCopy);
    setTurn(!turn);
  };

  const handleReset = () => {
    setBoard(initialState(size));
    setTurn(!turn);
  };

  return (
    <div className="container">
      <Board board={board} size={size} handleClick={handleClick} />
      <div className="status">{winner ? `Player ${winner} wins!` : status}</div>
      <button
        className="reset"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;
