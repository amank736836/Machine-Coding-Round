import React from "react";

function Board({ size, board, handleClick }) {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size}, 40px)`,
      }}
    >
      {board.map((row, rowIndex) => {
        // return row.map((val, i) => {
        //   return (
        //     <div key={i} className="cell">
        //       {val}
        //     </div>
        //   );
        // });
        return row.map((cell, colIndex) => {
          return (
            <div
              key={colIndex}
              className="cell"
              onClick={() => {
                handleClick(rowIndex, colIndex);
              }}
            >
              {cell}
            </div>
          );
        });
      })}
    </div>
  );
}

export default Board;
