import React from "react";
import useMemoryGame from "../Hooks/useMemoryGame";
import GameItem from "./GameItem";

const MemoryGame = () => {
  const { cards, setCards, isLock, flippedCard, setFlippedCard } =
    useMemoryGame();

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock) {
      return;
    }
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCard([...flippedCard, index]);
  };

  return (
    <div className="grid-container">
      {cards.map(({ id, number, isFlipped }) => {
        return (
          <GameItem
            key={id}
            id={id}
            number={number}
            isFlipped={isFlipped}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default MemoryGame;
