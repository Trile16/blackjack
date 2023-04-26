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
  const startGame = document.createElement("button");
  startGame.setAttribute("id", "game-start");
  startGame.innerHTML = "Start";
  const hit = document.createElement("button");
  hit.setAttribute("id", "hit");
  hit.setAttribute("class", "hidden");
  hit.innerHTML = "Hit";
  const stay = document.createElement("button");
  stay.setAttribute("id", "stay");
  stay.setAttribute("class", "hidden");
  stay.innerHTML = "Stay";
  playerChoices.appendChild(five);
  playerChoices.appendChild(ten);
  playerChoices.appendChild(twentyFive);
  playerChoices.appendChild(maxBet);
  playerChoices.appendChild(startGame);
  playerChoices.appendChild(hit);
  playerChoices.appendChild(stay);
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
const startGame = document.getElementById("game-start");
const playerChoices = document.getElementById("player-choice");
const hit = document.getElementById("hit");
const stay = document.getElementById("stay");

five.addEventListener("click", addFive);
ten.addEventListener("click", addTen);
twentyFive.addEventListener("click", addTwentyFive);
maxButton.addEventListener("click", maxBet);
startGame.addEventListener("click", gameStart);
hit.addEventListener("click", playerHit);

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
  playerCards: [],
  dealerCards: [],
  playerValue: 0,
  dealerValue: 0,
  playerAceCounter: 0,
  dealerAceCounter: 0,
  playerTurn: true,
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

function gameStart() {
  if (gameState.moneyInPlay) {
    changeButtonsForPlay();
    dealCards();
    checkPlayerCardValue();
    checkDealerCardValue();
    const hit = document.getElementById("hit");
    const stay = document.getElementById("stay");
    hit.addEventListener("click", playerHit);
  }
}

function changeButtonsForPlay() {
  // This will remove the pre-game buttons and add in gameplay buttons
  console.log("hello! you've started the game");
  five.setAttribute("class", "hidden");
  ten.setAttribute("class", "hidden");
  twentyFive.setAttribute("class", "hidden");
  maxButton.setAttribute("class", "hidden");
  startGame.setAttribute("class", "hidden");
  hit.removeAttribute("class");
  stay.removeAttribute("class");
}

function dealCards() {
  // Loop to pass cards from player to dealer
  for (let i = 0; i < 4; i++) {
    let cardChoice = Math.floor(Math.random() * gameState.cards.length);
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = gameState.cards[cardChoice];

    if (i % 2 === 0) {
      gameState.playerCards.push(gameState.cards[cardChoice]);
      playerSeat.appendChild(card);
    } else if (i === 3) {
      card.innerHTML = "Hidden";
      gameState.dealerCards.push(gameState.cards[cardChoice]);
      dealerSeat.appendChild(card);
    } else {
      gameState.dealerCards.push(gameState.cards[cardChoice]);
      dealerSeat.appendChild(card);
    }
    gameState.cards.splice(cardChoice, 1);

    console.log("player cards: ", gameState.playerCards);
    console.log("dealer cards: ", gameState.dealerCards);
  }
}

function checkPlayerCardValue() {
  //Grab the value for the player with player card array
  gameState.playerValue = 0;

  for (let card of gameState.playerCards) {
    console.log(card[0]);
    if (card[0] === "A") {
      gameState.playerAceCounter++;
      if (gameState.playerValue + 11 > 21) {
        gameState.playerValue++;
      } else {
        gameState.playerValue += 11;
      }
    } else if (
      card[0] === "J" ||
      card[0] === "Q" ||
      card[0] === "K" ||
      card[0] === "1"
    ) {
      gameState.playerValue += 10;
    } else {
      gameState.playerValue += parseInt(card[0]);
    }

    console.log("player value: ", gameState.playerValue);
  }
}

function checkDealerCardValue() {
  //Grab the value for the dealer with dealer card array
  for (let card of gameState.dealerCards) {
    console.log(card[0]);
    if (card[0] === "A") {
      gameState.dealerAceCounter++;
      if (gameState.dealerValue + 11 > 21) {
        gameState.dealerValue++;
      } else {
        gameState.dealerValue += 11;
      }
    } else if (
      card[0] === "J" ||
      card[0] === "Q" ||
      card[0] === "K" ||
      card[0] === "1"
    ) {
      gameState.dealerValue += 10;
    } else {
      gameState.dealerValue += parseInt(card[0]);
    }

    console.log("dealer value: ", gameState.dealerValue);
  }
}

function playerHit() {
  let cardChoice = Math.floor(Math.random() * gameState.cards.length);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = gameState.cards[cardChoice];
  gameState.playerCards.push(gameState.cards[cardChoice]);
  playerSeat.appendChild(card);
  checkPlayerCardValue();
  if (gameState.playerValue > 21) {
    gameLost();
  }
}

function gameLost() {
  console.log("BUST!");
  hit.setAttribute("class", "hidden");
  stay.setAttribute("class", "hidden");
  five.removeAttribute("class");
  ten.removeAttribute("class");
  twentyFive.removeAttribute("class");
  maxButton.removeAttribute("class");
  startGame.removeAttribute("class");
}
