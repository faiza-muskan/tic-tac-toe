const state = {
  gameEl: document.querySelector(".game"),
  cells: Array(9).fill(null),
  Symbols: ["o", "x"],
  winningComb: [
    // rows
    [0, 1, 2], //first row
    [3, 4, 5], //middle row
    [6, 7, 8], //last row
    // columns
    [0, 3, 6], //first column
    [1, 4, 7], //middle column
    [2, 5, 8], //last column
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ],
  isGameFinished: false,
  rules: document.querySelector(".rules"),
};

// game instruction
const instructions = () => {
  const heading = document.createElement("h1");
  heading.innerText = "Tic Tac Toe";
  const heading2 = document.createElement("h1");
  heading2.innerText = "Rules";
  const list = document.createElement("ul");
  list.classList.add("list");
  const listItem1 = document.createElement("li");
  listItem1.innerText =
    "Player 1 is 'X' and player 2 is 'O, Players take turns putting their marks in empty squares.";
  const listItem2 = document.createElement("li");
  listItem2.innerText =
    "The game is played on a grid that's 3 squares by 3 squares.";
  const listItem3 = document.createElement("li");
  listItem3.innerText =
    "The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.";
  const listItem4 = document.createElement("li");
  listItem4.innerText =
    "When all 9 squares are full, the game is over. The game draw!";
  list.append(listItem1, listItem2, listItem3, listItem4);

  state.rules.append(heading, heading2, list);
};
instructions();

const drawBoard = () => {
  state.gameEl.innerHTML = ""; // ask why to clear
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cells");

    if (state.cells[i]) {
      //if the cells contains x or an o run this code
      const cellSymbol = document.createElement("p");
      cellSymbol.innerText = state.cells[i];
      cellSymbol.classList.add("symbol");
      cell.append(cellSymbol);
    } else {
      // if the cells doesn't contains x or an o then run this code
      const cellFn = () => {
        if (state.isGameFinished) {
          return;
        }
        state.Symbols.reverse();
        state.cells[i] = state.Symbols[0];
        drawBoard();

        if (checkWinner()) {
          state.isGameFinished = true;
          drawMessage("you've won!!");
        }

        if (checkDraw()) {
          state.isGameFinished = true;
          drawMessage("it's a draw!!");
        }
      };

      cell.addEventListener("click", cellFn);
    }
    state.gameEl.append(cell);
  }
};

const checkWinner = () => {
  return state.winningComb.some((combo) => {
    const cell = combo.map((index) => {
      return state.cells[index];
    });
    return !cell.includes(null) && new Set(cell).size === 1; //set eleminates the duplicates and returns one value if[x,o,x]it returns [x,o], if[x,x,x]it returns just [x]
  });
};

const checkDraw = () => {
  return state.cells.every((cells) => {
    return cells !== null;
  });
};

const drawMessage = (message) => {
  const banner = document.createElement("div");
  banner.classList.add("banner");
  const h1 = document.createElement("h1");
  h1.innerText = message;

  banner.append(h1);

  state.gameEl.append(banner);
};

drawBoard();
