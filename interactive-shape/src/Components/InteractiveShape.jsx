import React, { useEffect, useRef, useState } from "react";

function InteractiveShape() {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => false))
  );
  // console.log(grid);

  const queue = useRef([]);

//   console.log(queue.current);
  const timerId = useRef([]);

  const handleOnClick = (rowIdx, cellIdx , flag) => {
    if(timerId.current.length > 0 && flag){
        return;
    }
    // if (grid[rowIdx][cellIdx] && flag) return;
    // if(grid[rowIdx][cellIdx]) return;
    // const newGrid = grid.map((row, rIdx) =>
    //   row.map((cell, cIdx) => {
    //     if (rIdx === rowIdx && cIdx === cellIdx) {
    //       return !cell;
    //     }
    //     return cell;
    //   })
    // );
    // const newGrid = [...grid];
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[rowIdx][cellIdx] = !newGrid[rowIdx][cellIdx];
      if (newGrid[rowIdx][cellIdx]) {
        queue.current.push([rowIdx, cellIdx]);
      }
      //   setGrid(newGrid);
      return newGrid;
    });
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, cellIdx], idx) => {
        timerId.current[idx] = setTimeout(() => {
          handleOnClick(rowIdx, cellIdx,false);
          if(idx === 8){
            timerId.current = [];
          }
        }, (idx + 1) * 1000);
      });
      queue.current = [];
    }

    
}, [grid]);

useEffect(() => {
    const cleanup = timerId.current.forEach((id) => {
      clearTimeout(id);
    });
    return () => {
        cleanup();
    }
    
  }, []);

  return (
    <div className="container">
      {grid.map((row, rowIdx) =>
        row.map((cell, cellIdx) => (
          <div
            onClick={() => {
                if(!grid[rowIdx][cellIdx]){
                    handleOnClick(rowIdx, cellIdx,true);
                }
            }}
            className={`cell ${cell ? "active" : ""}`}
            key={`${rowIdx}${cellIdx}`}
          ></div>
        ))
      )}
    </div>
  );
}

export default InteractiveShape;
