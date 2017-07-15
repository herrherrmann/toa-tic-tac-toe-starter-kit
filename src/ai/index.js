const BOARD_SIZE = 3; // 3x3

export function move(game) {
  const currentPlayer = game.turn;
  const players = [currentPlayer, getOtherPlayer(game.players, currentPlayer)];
  const successors = getSuccessors(game.board, currentPlayer, game.players);
  let bestSuccessor = { value: -9999, action: null };
  successors.forEach(successor => {
    const value = minimax(successor.board, false, players);
    if (value > bestSuccessor.value) {
      bestSuccessor = { value, action: successor.action };
    }
  });
  return bestSuccessor.action;
}

// const game = {
//     gameUid: 'someId',
//     players: ['max', 'moritz'],
//     turn: 'moritz',
//     board: [
//         ['max', 'moritz', ''],
//         ['', 'max', ''],
//         ['', '', '']
//     ],
//     status: {
//         type: 'ONGOING',
//         winner: null
//     }
// };

export function getOtherPlayer(players, myPlayer) {
  return players[0] === myPlayer ? players[1] : players[0];
}

export function minimax(board, isMaxPlayer, players) {
  const player = isMaxPlayer ? players[0] : players[1];
  const successors = getSuccessors(board, player, players);
  if (!successors.length) {
    return getUtility(board, players);
  }
  let bestValue;
  if (isMaxPlayer) {
    bestValue = -9999;
    successors.forEach(successor => {
      const value = minimax(successor.board, !isMaxPlayer, players);
      bestValue = Math.max(bestValue, value);
    });
  } else {
    bestValue = 9999;
    successors.forEach(successor => {
      const value = minimax(successor.board, !isMaxPlayer, players);
      bestValue = Math.min(bestValue, value);
    });
  }
  return bestValue;
}

export function getSuccessors(board, player, players) {
  const winners = players.filter(player => didPlayerWin(board, player));
  if (winners.length) {
    return [];
  }
  let successors = [];
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === '') {
        const action = { x, y };
        const node = createNode(applyAction(board, action, player), action);
        successors.push(node);
      }
    });
  });
  return successors;
}

export function applyAction(board, action, player) {
  const newBoard = board.map(row => row.slice());
  newBoard[action.y][action.x] = player;
  return newBoard;
}

export function createNode(board, action) {
  return { board, action };
}

export function getUtility(board, players) {
  let result = 0;
  if (didPlayerWin(board, players[0])) {
    result = 10;
  } else if (didPlayerWin(board, players[1])) {
    result = -10;
  }
  return result;
}

export function didPlayerWin(board, player) {
  for (let index = 0; index < BOARD_SIZE; index++) {
    if (isRowWin(board, index, player)) {
      return true;
    }
    if (isColWin(board, index, player)) {
      return true;
    }
    if (isDiagWin(board, player)) {
      return true;
    }
  }
  return false;
}

export function isDiagWin(board, player) {
  const backslashWin = [board[0][0], board[1][1], board[2][2]]
    .filter(cell => cell === player).length === BOARD_SIZE;
  const forwardslashWin = [board[0][2], board[1][1], board[2][0]]
    .filter(cell => cell === player).length === BOARD_SIZE;
  return backslashWin || forwardslashWin;
}

export function isRowWin(board, rowIndex, player) {
  const row = board[rowIndex];
  const wonCells = row.filter(col => col === player);
  return wonCells === BOARD_SIZE;
}

export function isColWin(board, colIndex, player) {
  const col = [board[colIndex][0], board[colIndex][1], board[colIndex][2]];
  const wonCells = col.filter(cell => cell === player);
  return wonCells === BOARD_SIZE;
}
