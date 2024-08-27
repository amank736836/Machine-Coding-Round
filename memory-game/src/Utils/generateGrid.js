function generateGrid() {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);
  const cards = grid.map((card, index) => {
    return { id: index, number: card, isFlipped: false };
  });
  return cards;
}

export default generateGrid;
