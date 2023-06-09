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
            exploded: false,
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
export const createMinedBoard = (rows, columns, minesAmount) => {
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
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (diferent && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
};

const safeNeighborhood = (board, row, column) => {
  const safes = (result, neighbor) => result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
};

export const openField = (board, row, column) => {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach((n) =>
        openField(board, n.row, n.column)
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter((n) => n.mined).length;
    }
  }
};

//Percorrer todos os campos
const fields = (board) => [].concat(...board);

//Saber se um canto é explodido
export const hadExplosion = (board) =>
  fields(board).filter((field) => field.exploded).length > 0;

const pendding = (field) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);

export const wonGame = (board) => fields(board).filter(pendding).length === 0;

export const showMines = (board) =>
  fields(board)
    .filter((field) => field.mined)
    .forEach((field) => (field.opened = true));

export const invertFlag = (board, row, column) => {
  const field = board[row][column];
  field.flagged = !field.flagged;
};

export const flagsUsed = (board) =>
  fields(board).filter((field) => field.flagged).length;

