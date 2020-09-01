var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var X_CLASS = "x";
var CIRCLE_CLASS = "circle";
var WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var board = document.querySelector("#board");
var cellElements = document.querySelectorAll("[data-cell]");
var winningMessage = document.querySelector("#winningMessage");
var restartBtn = document.querySelector("#restartButton");
var winningMessageTextElement = document.querySelector("[data-winning-message]");
var circleTurn;
function startGame() {
    circleTurn = false;
    cellElements.forEach(function (cell) {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        winningMessageTextElement.innerText = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoradHoverClass();
    winningMessage === null || winningMessage === void 0 ? void 0 : winningMessage.classList.remove("show");
}
function handleClick(e) {
    var cell = e.target;
    var currentclass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentclass);
    if (checkWin(currentclass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurn();
        setBoradHoverClass();
    }
    //PlaceMark
    //Check for Win
    //Check for Draw
    //Switch turns
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurn() {
    circleTurn = !circleTurn;
}
function setBoradHoverClass() {
    board === null || board === void 0 ? void 0 : board.classList.remove(X_CLASS);
    board === null || board === void 0 ? void 0 : board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board === null || board === void 0 ? void 0 : board.classList.add(CIRCLE_CLASS);
    }
    else {
        board === null || board === void 0 ? void 0 : board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(function (combination) {
        return combination.every(function (index) {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!";
    }
    else {
        winningMessageTextElement.innerText = (circleTurn ? "O's" : "X's") + " Win!";
    }
    winningMessage === null || winningMessage === void 0 ? void 0 : winningMessage.classList.add("show");
}
function isDraw() {
    return __spreadArrays(cellElements).every(function (cell) {
        return (cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS));
    });
}
startGame();
restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.addEventListener("click", startGame);
