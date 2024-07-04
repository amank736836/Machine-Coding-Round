function checkWinner(board , size) {

  for(let i = 0; i < size; i++){
    const symbol = board[i][0];
    if(symbol){
      let winner = true;
      for(let j = 1; j < size; j++){
        if(board[i][j] !== symbol){
          winner = false;
          break;
        }
      }
      if(winner){
        return symbol;
      }
    }
  }


  for(let j = 0; j < size; j++){
    const symbol = board[0][j];
    if(symbol){
      let winner = true;
      for(let i = 1; i < size; i++){
        if(board[i][j] !== symbol){
          winner = false;
          break;
        }
      }
      if(winner){
        return symbol;
      }
    }
  }

  let symbol = board[0][0];
  if(symbol){
    let winner = true;
    for(let i = 1; i < size; i++){
      if(board[i][i] !== symbol){
        winner = false;
        break;
      }
    }
    if(winner){
      return symbol;
    }
  }

  symbol = board[0][size - 1];
  if(symbol){
    let winner = true;
    for(let i = 1; i < size; i++){
      if(board[i][size - 1 - i] !== symbol){
        winner = false;
        break;
      }
    }
    if(winner){
      return symbol;
    }
  }

  return null;
}

function initialState(size){
  return Array.from({ length: size }, () => Array(size).fill(null))
}

export { checkWinner , initialState}
