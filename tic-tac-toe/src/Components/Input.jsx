import React, { useState } from "react";
import TicTacToe from "./TicTacToe";

function Input() {
  const [size, setSize] = useState(3);
  return (
    <div>
      <div className="addSubtract">
        <button
          onClick={() => {
            if (size > 3) {
              setSize(size - 1);
            }
          }}
        >
          ➖
        </button>
        <div className="number">{size}</div>
        <button onClick={() => setSize(size + 1)}>➕</button>
      </div>
      <TicTacToe size={4} />
    </div>
  );
}

export default Input;
