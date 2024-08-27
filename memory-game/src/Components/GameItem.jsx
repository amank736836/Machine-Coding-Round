import React, { memo } from "react";

export default memo(function GameItem({ id, number, isFlipped, handleClick }) {
  return (
    <div key={id} className="cards" onClick={() => handleClick(id)}>
      {isFlipped ? number : "?"}
    </div>
  );
});
