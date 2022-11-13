const isValidNode = (row, col, value, board) => {
  const cellValue = value;

  // Check horizontal
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === cellValue) return false;
  }

  // Check Vertucal
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === cellValue) return false;
  }

  // check box: we have to only check the diagonal of the box
  let x0 = Math.floor(row / 3) * 3;
  let y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j].value === cellValue) return false;
    }
  }

  return true;
};
const getWrongLines = (board, type) => {
  let wrongLines = new Set();

  for (let i = 0; i < 9; i++) {
    let dict = {};

    for (let j = 0; j < 9; j++) {
      let key;
      if (type === "horizontal") key = board[i][j].value;
      else key = board[j][i].value;

      if (key === 0) continue;

      if (Object.hasOwnProperty.call(dict, key)) {
        dict[key] += 1;
        if (dict[key] > 1) {
          wrongLines.add(i);
          break;
        }
      } else dict[key] = 1;
    }
  }
  return wrongLines;
};

const isBoxValid = (board, x0, y0) => {
  let dict = {};

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let key = board[x0 + i][y0 + j].value;
      if (key === 0) continue;

      if (Object.hasOwnProperty.call(dict, key)) {
        dict[key] += 1;
        if (dict[key] > 1) {
          return false;
        }
      } else dict[key] = 1;
    }
  }
  return true;
};

const getWrongBoxes = (board) => {
  let wrongBoxes = new Set();
  let boxValues = {
    0: { x: 0, y: 0 },
    1: { x: 0, y: 3 },
    2: { x: 0, y: 6 },
    3: { x: 3, y: 0 },
    4: { x: 3, y: 3 },
    5: { x: 3, y: 6 },
    6: { x: 6, y: 0 },
    7: { x: 6, y: 3 },
    8: { x: 6, y: 6 },
  };

  // We check for every boxes
  for (let box = 0; box < 9; box++) {
    // Now check all cells of the selected box
    let x0 = boxValues[box].x;
    let y0 = boxValues[box].y;

    if (!isBoxValid(board, x0, y0)) {
      wrongBoxes.add(box);
    }
  }

  return wrongBoxes;
};

const getBoxNumber = (x, y) => {
  let x0 = Math.floor(x / 3);
  let y0 = Math.floor(y / 3);
  let BoxNumber = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ][x0][y0];
  return BoxNumber;
};

const isValidN = (row, col, value, board) => {
  const cellValue = value;

  // Check horizontal
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === cellValue) return false;
  }

  // Check Vertical
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === cellValue) return false;
  }

  // check box: we have to only check the diagonal of the box
  let x0 = Math.floor(row / 3) * 3;
  let y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j] === cellValue) return false;
    }
  }

  return true;
};

const countSudokuSolution = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        let count = 0;
        for (let k = 1; k <= 9; k++) {
          if (isValidN(i, j, k, board)) {
            board[i][j] = k;
            count += countSudokuSolution(board);
            board[i][j] = 0;
          }
        }
        return count;
      }
    }
  }
  return 1;
};

const solveRandomSudoku = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          let num = Math.floor(Math.random() * 9) + 1;
          if (isValidN(i, j, num, board)) {
            board[i][j] = num;
            if (solveRandomSudoku(board)) return true;
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const getSudokuGrid = (maxEmptyCellsCount) => {
  let sudokuGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  solveRandomSudoku(sudokuGrid);

  // The min number of filled cell, so that unique solution exists is 17
  let emptyCells = 0;
  let suffledCells = [];
  for (let i = 0; i < 81; i++) {
    suffledCells.push(i);
  }

  // random ordering of the elements
  suffledCells.sort(() => Math.random() - 0.5);

  let index = 0;
  while ((emptyCells <= maxEmptyCellsCount) & (index < 81)) {
    if (suffledCells.length === 0) break;

    let cell = suffledCells[index];
    index++;

    let i = Math.floor(cell / 9);
    let j = cell % 9;

    let value = sudokuGrid[i][j];
    sudokuGrid[i][j] = 0;

    let count = countSudokuSolution(sudokuGrid);

    if (count === 1) emptyCells++;
    else sudokuGrid[i][j] = value;
  }

  return sudokuGrid;
};

const getNode = (row, column, value, isModifiable) => {
  return {
    row: row,
    column: column,
    value: value,
    isValid: true,
    isModifiable: isModifiable,
    isHinted: false,
  };
};
export const solveSudoku = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValidNode(i, j, k, board)) {
            board[i][j].value = k;
            if (solveSudoku(board)) return true;
            board[i][j].value = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const arrayCopy = (arr) => {
  let newArray = JSON.parse(JSON.stringify(arr));
  return newArray;
};

export const getHint = (board) => {
  // Copying the board and solving it without referencing the actual grid
  let solvedBoard = arrayCopy(board);
  let solvedStatus = solveSudoku(solvedBoard);

  //  If no solution was found
  if (solvedStatus === false) {
    return { board: null, solvedStatus: false };
  }

  //   If solution was found
  // Finding all the empty nodes from the orginal given board
  let emptyNodePositionList = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        emptyNodePositionList.push([i, j]);
      }
    }
  }

  // Selecting Random element from the empty nodes list
  const randomIndex = Math.floor(Math.random() * emptyNodePositionList.length);
  let row = emptyNodePositionList[randomIndex][0];
  let col = emptyNodePositionList[randomIndex][1];

  // Creating new board from the data
  // Making new node and replacing the empty value with the hint
  let result = arrayCopy(board);
  result[row][col].value = solvedBoard[row][col].value;
  result[row][col].isHinted = true;
  result[row][col].isModifiable = false;

  return { board: result, solvedStatus: true };
};

export const checkPlayerWon = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0 || board[i][j].isValid === false) {
        return false;
      }
    }
  }
  return true;
};

export const checkBoard = (board) => {
  // Check for the Horizontal
  // we will check all the board

  let wrongHorizontal = getWrongLines(board, "horizontal");
  let wrongVertical = getWrongLines(board, "vertical");
  let wrongBoxes = getWrongBoxes(board);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        wrongHorizontal.has(i) ||
        wrongVertical.has(j) ||
        wrongBoxes.has(getBoxNumber(i, j))
      ) {
        board[i][j].isValid = false;
      } else {
        board[i][j].isValid = true;
      }
    }
  }
};

export const animateElement = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

export const createSudokuGrid = (maxEmptyCellsCount) => {
  const numberGrid = getSudokuGrid(maxEmptyCellsCount);
  let sudokuGrid = [];

  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let isModifiable = numberGrid[i][j] === 0;
      let node = getNode(i, j, numberGrid[i][j], isModifiable);
      row.push(node);
    }
    sudokuGrid.push(row);
  }

  return sudokuGrid;
};
