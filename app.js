// Document Object Model
const body = document.getElementsByTagName("body");

// Game Rendering
function renderHTML() {
  const gameBoard = document.createElement("div");
  gameBoard.setAttribute("id", "game-board");
  const gameTitle = document.createElement("h1");
  gameTitle.setAttribute("id", "game-title");
  gameTitle.innerHTML = "Blackjack!";
  const table = document.createElement("div");
  table.setAttribute("id", "game-table");
  const dealerSeat = document.createElement("div");
  dealerSeat.setAttribute("id", "dealerSeat");
  table.appendChild(dealerSeat);
  const moneyInPlay = document.createElement("div");
  moneyInPlay.setAttribute("id", "money-in-play");
  table.appendChild(moneyInPlay);
  const playerSeat = document.createElement("div");
  playerSeat.setAttribute("id", "playerSeat");
  table.appendChild(playerSeat);
  const money = document.createElement("div");
  money.setAttribute("id", "money-display");
  money.innerHTML = "Money: 100";
  const playerChoices = document.createElement("span");
  playerChoices.setAttribute("id", "player-choice");
  const five = document.createElement("button");
  five.setAttribute("id", "five");
  five.innerHTML = "5";
  const ten = document.createElement("button");
  ten.setAttribute("id", "ten");
  ten.innerHTML = "10";
  const maxBet = document.createElement("button");
  maxBet.setAttribute("id", "max-bet");
  maxBet.innerHTML = "Max Bet";
  const twentyFive = document.createElement("button");
  twentyFive.setAttribute("id", "twenty-five");
  twentyFive.innerHTML = "25";
  playerChoices.appendChild(five);
  playerChoices.appendChild(ten);
  playerChoices.appendChild(twentyFive);
  playerChoices.appendChild(maxBet);
  gameBoard.appendChild(gameTitle);
  gameBoard.appendChild(table);
  gameBoard.appendChild(money);
  gameBoard.appendChild(playerChoices);
  body[0].appendChild(gameBoard);
}

renderHTML();

// Event Listeners
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const twentyFive = document.getElementById("twenty-five");
const maxButton = document.getElementById("max-bet");
const moneyDisplay = document.getElementById("money-display");
const moneyInPlay = document.getElementById("money-in-play");

five.addEventListener("click", addFive);
ten.addEventListener("click", addTen);
twentyFive.addEventListener("click", addTwentyFive);
maxButton.addEventListener("click", maxBet);

// Game State

const gameState = {
  playerName: "Player 1",
  money: 100,
  cards: [
    "2S",
    "3S",
    "4S",
    "5S",
    "6S",
    "7S",
    "8S",
    "9S",
    "10S",
    "JS",
    "QS",
    "KS",
    "AS",
    "2C",
    "3C",
    "4C",
    "5C",
    "6C",
    "7C",
    "8C",
    "9C",
    "10C",
    "JC",
    "QC",
    "KC",
    "AC",
    "2D",
    "3D",
    "4D",
    "5D",
    "6D",
    "7D",
    "8D",
    "9D",
    "10D",
    "JD",
    "QD",
    "KD",
    "AD",
    "2H",
    "3H",
    "4H",
    "5H",
    "6H",
    "7H",
    "8H",
    "9H",
    "10H",
    "JH",
    "QH",
    "KH",
    "AH",
  ],
  minimumBet: 5,
  maximumBet: 50,
  moneyInPlay: 0,
};

// Game Functionality

function addFive() {
  if (
    gameState.money >= 5 &&
    gameState.maximumBet >= gameState.moneyInPlay + 5
  ) {
    gameState.money -= 5;
    gameState.moneyInPlay += 5;
    moneyDisplay.innerHTML = `Money: ${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
  }
}

function addTen() {
  if (
    gameState.money >= 10 &&
    gameState.maximumBet >= gameState.moneyInPlay + 10
  ) {
    gameState.money -= 10;
    gameState.moneyInPlay += 10;
    moneyDisplay.innerHTML = `Money: ${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
  }
}

function addTwentyFive() {
  if (
    gameState.money >= 25 &&
    gameState.maximumBet >= gameState.moneyInPlay + 25
  ) {
    gameState.money -= 25;
    gameState.moneyInPlay += 25;
    moneyDisplay.innerHTML = `Money: ${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
  }
}

function maxBet() {
  if (
    gameState.moneyInPlay < 50 &&
    50 - gameState.moneyInPlay <= gameState.money
  ) {
    let subtractFromMoney = 50 - gameState.moneyInPlay;
    gameState.money -= subtractFromMoney;
    gameState.moneyInPlay = 50;
    moneyDisplay.innerHTML = `Money: ${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
  }
}

function gameStart() {}
