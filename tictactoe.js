const squares = document.querySelectorAll(".cell");
const gameUpdate = document.querySelector("#gameUpdate");
const reset = document.querySelector("#reset");
/* have to creat a variable to know what rows/columns to check if won*/
const winnerCard = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let picks = ["", "", "", "", "", "", "", "", "", ""];
let nextUp = "X";
let playing = false;
/* envoking the callGame func to kick it off*/
callGame();

function callGame() {
  squares.forEach((cell) => cell.addEventListener("click", pickedCell));
  reset.addEventListener("click", redo);
  gameUpdate.textContent = `${nextUp} - lets Kick IT OFF!`;
  playing = true;
}

/* used cellNum to get the squares on the grid and find the placing*/
function pickedCell() {
  const cellNum = this.getAttribute("cellNum");
  if (picks[cellNum] != "" || !playing) {
    return;
  }

  thisCell(this, cellNum);

  winGame();
}
function thisCell(cell, index) {
  picks[index] = nextUp;
  cell.textContent = nextUp;
}
function nowUp() {
  nextUp = nextUp == "X" ? "O" : "X";
  gameUpdate.textContent = `${nextUp} lets GO!`;
}
function winGame() {
  let gameWon = false;
  /* looping over the winnerCard array at top of page */
  for (let i = 0; i < winnerCard.length; i++) {
    const currentGame = winnerCard[i];
    const block1 = picks[currentGame[0]];
    const block2 = picks[currentGame[1]];
    const block3 = picks[currentGame[2]];
    /* looking for empty spaces to make sure the game continues on */
    if (block1 == "" || block2 == "" || block3 == "") {
      continue;
    }
    if (block1 == block2 && block2 == block3) {
      gameWon = true;
      break;
    }
  }
  /* annoucing the game won */
  if (gameWon) {
    gameUpdate.textContent = `${nextUp} WON!`;
    playing = false;
  } else if (!picks.includes("")) {
    gameUpdate.textContent = `TIED!`;
    playing = false;
  } else {
    nowUp();
  }
}
function redo() {
  nextUp = "X";
  picks = ["", "", "", "", "", "", "", "", "", ""];
  gameUpdate.textContent = `${nextUp} - Kick it off!`;
  squares.forEach((cell) => (cell.textContent = ""));
  playing = true;
}
