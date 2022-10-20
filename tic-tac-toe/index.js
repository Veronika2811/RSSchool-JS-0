const currentPlayer = document.querySelector(".current-player");
const game = document.querySelector(".game");
const gameItem = [...document.querySelectorAll(".game__item")];
const audio = new Audio();

const itemsNames = {
  o: "O",
  x: "X",
};

let activePlayer = itemsNames.x;

const caseOfVictory = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let tableResult = [];

let move = 0;

let result = "";

game.addEventListener("click", makeStep);

function makeStep(event) {
  const currentgameItem = event.target;
  if (
    currentgameItem.className === "game__item" &&
    currentgameItem.textContent === ""
  ) {
    move % 2 === 0
      ? (event.target.textContent = itemsNames.x)
      : (event.target.textContent = itemsNames.o);

    event.target.style.opacity = "0.6";

    audio.src = `./assets/audio/click.mp3`;
    audio.play();

    move++;
    check();
    toogleActivePlayer();
  }
}

function check() {
  for (let i = 0; i < caseOfVictory.length; i++) {
    if (
      gameItem[caseOfVictory[i][0]].textContent == itemsNames.x &&
      gameItem[caseOfVictory[i][1]].textContent == itemsNames.x &&
      gameItem[caseOfVictory[i][2]].textContent == itemsNames.x
    ) {
      result = `Won by X in ${move} steps`;
      prepareResault(result, "victory");

      leaderBoard();
      tableResult.unshift(result);
    } else if (
      gameItem[caseOfVictory[i][0]].textContent == itemsNames.o &&
      gameItem[caseOfVictory[i][1]].textContent == itemsNames.o &&
      gameItem[caseOfVictory[i][2]].textContent == itemsNames.o
    ) {
      result = `Won by 0 in ${move} steps`;
      prepareResault(result, "victory");

      leaderBoard();
      tableResult.unshift(result);
    }
  }
  if (move == 9) {
    result = `Draw in ${move} steps`;
    prepareResault(result, "gameOver");

    leaderBoard();
    tableResult.unshift(result);
  }
}

function toogleActivePlayer() {
  activePlayer = activePlayer === itemsNames.x ? itemsNames.o : itemsNames.x;
  currentPlayer.textContent = `Current player is ${activePlayer}`;
}

// Result game
const modalResultGame = document.querySelector(".content");
const modalResultWindow = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalBtnClose = document.querySelector(".modal__btn-close");

function prepareResault(result, music) {
  modalResultWindow.style.display = "block";
  modalResultGame.textContent = `${result}!`;
}

overlay.addEventListener("click", closeModal);
modalBtnClose.addEventListener("click", closeModal);

function closeModal() {
  modalResultWindow.style.display = "none";
  location.reload(); 
}

// Table result
const resultBtn = document.querySelector(".btn-result");
const resultWindowsOpen = document.querySelector(".result");
const resultBtnClose = document.querySelector(".result__btn-close");
let resultGame = document.querySelector(".result__list");

resultBtn.addEventListener("click", resultWindow);

function resultWindow() {
  resultWindowsOpen.style.display = "block";
  if (resultGame.textContent === "") {
    tableResult.forEach((element) => {
      resultGame.innerHTML = resultGame.innerHTML + `<li>${element}</li>`;
    });
  }
}

resultBtnClose.addEventListener("click", resultWindowClose);

function resultWindowClose() {
  resultWindowsOpen.style.display = "none";
}

function leaderBoard() {
  if (tableResult.length > 10) {
    tableResult.pop();
  }
}

// Local storage table result and theme
function setLocalStorage() {
  localStorage.setItem("tableResult", JSON.stringify(tableResult));
  localStorage.setItem("theme", theme);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("tableResult")) {
    tableResult = JSON.parse(localStorage.getItem("tableResult"));
  }
  leaderBoard(tableResult);
  if (localStorage.getItem("theme") === "pink") {
    pinkTheme.forEach((elem) => elem.classList.add("pink"));
  }
}

window.addEventListener("load", getLocalStorage);

// Theme
let theme = localStorage.getItem("theme") || "blue";
const switchTheme = document.querySelector(".switch");
const pinkTheme = document.querySelectorAll(
  "body, .switch, .title, .result__title, .result__btn-close, .content, .modal__btn-close, .github, .footer-container__link, .switch:hover"
);

switchTheme.addEventListener("click", () => {
  theme === "blue" ? theme = "pink" : theme = "blue";
  pinkTheme.forEach((el) => el.classList.toggle("pink"));
});