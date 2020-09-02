const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Selecting the DOM elements
const board = document.querySelector("#board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessage = document.querySelector("#winningMessage");
const restartBtn = document.querySelector("#restartButton");
const winningMessageTextElement = document.querySelector<HTMLElement>(
  "[data-winning-message]"
);
let circleTurn: boolean;

//Function to start game
function startGame() {
  //Setting first turn for player X
  circleTurn = false;
  cellElements.forEach((cell) => {
    //Resetting everything
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    winningMessageTextElement!.innerText = "";

    //Starting New Game
    cell.addEventListener("click", handleClick, { once: true });
  });

  //Calling hover effect
  if (navigator.maxTouchPoints === 0) {
    setBoradHoverClass();
  }
  //Hiding the Restart button
  winningMessage?.classList.remove("show");
}

//Handling Click
function handleClick(e: any) {
  const cell = e.target;

  //Setting the current Player
  const currentclass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //Blocking marked place
  placeMark(cell, currentclass);

  //Checking for Game states
  if (checkWin(currentclass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //Swapping turn & hover effect
    swapTurn();

    if (navigator.maxTouchPoints === 0) {
      setBoradHoverClass();
    }
  }
}

//Marking the boxes after click
function placeMark(cell: any, currentClass: string) {
  cell.classList.add(currentClass);
}

//Swapping turns
function swapTurn() {
  circleTurn = !circleTurn;
}

//Setting hover effect class
function setBoradHoverClass() {
  board?.classList.remove(X_CLASS);
  board?.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board?.classList.add(CIRCLE_CLASS);
  } else {
    board?.classList.add(X_CLASS);
  }
}

//Checking Win!
function checkWin(currentClass: string) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

//Checking for the Game Over
function endGame(draw: boolean) {
  //Check for Win or Draw
  if (draw) {
    winningMessageTextElement!.innerText = "Draw!";
  } else {
    winningMessageTextElement!.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }

  //Showing the Game Over message and Restart button
  winningMessage?.classList.add("show");
}

//checking for Draw
function isDraw() {
  //Casting NodeListOf<Element> as any
  //NodeListOf<Element> doesn't have 'every' iterator
  return [...(cellElements as any)].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

//Entry Point
startGame();
restartBtn?.addEventListener("click", startGame);
