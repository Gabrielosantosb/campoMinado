const createBoard = (rows, columns) => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            nearMines: 0,
          };
        });
    });
};
// Espalhar as minas no tabuleiro
const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const selectedRow = parseInt(Math.random() * rows, 10);
    const selectedColumn = parseInt(Math.random() * columns, 10);

    //Se o border usando linhas e columns selecionado não minados, plantar mais uma bomba
    if (!board[selectedRow][selectedColumn].mined) {
      board[selectedRow][selectedColumn].mined = true;
      minesPlanted++;
    }
  }
};

//Criar tabuleiro com bombas plantadas
export const createMineBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

export const cloneBoard = (board) => {
  return board.map((rows) => {
    return rows.map((field) => {
      return { ...field };
    });
  });
};

const getNeighbors = (board, row, column) => {
  const neighbors = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  rows.forEach((r) => {
    columns.forEach((c) => {
      const different = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (different && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

const safeNeighborhood =  (board, row, column) => {

  
}