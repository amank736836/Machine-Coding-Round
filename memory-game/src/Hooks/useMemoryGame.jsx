import { useEffect, useState } from "react";
import generateGrid from "../Utils/generateGrid";

const useMemoryGame = () => {
  const [cards, setCards] = useState(generateGrid());
  const [isLock, setIsLock] = useState(false);
  const [flippedCard, setFlippedCard] = useState([]);

  useEffect(() => {
    if (flippedCard.length === 2) {
      setIsLock(true);

      setTimeout(() => {
        if (cards[flippedCard[0]].number !== cards[flippedCard[1]].number) {
          setCards((prev) => {
            const newCards = [...prev];
            newCards[flippedCard[0]].isFlipped = false;
            newCards[flippedCard[1]].isFlipped = false;
            return newCards;
          });
        }
        setIsLock(false);
        setFlippedCard([]);
      }, 3000);
    }
  }, [flippedCard]);

  return {
    cards,
    setCards,
    isLock,
    flippedCard,
    setFlippedCard,
  };
};

export default useMemoryGame;
