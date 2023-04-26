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
  dealerSeat.setAttribute("class", "card-display");
  table.appendChild(dealerSeat);
  const moneyInPlay = document.createElement("div");
  moneyInPlay.setAttribute("id", "money-in-play");
  table.appendChild(moneyInPlay);
  const playerSeat = document.createElement("div");
  playerSeat.setAttribute("id", "playerSeat");
  playerSeat.setAttribute("class", "card-display");
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
  const double = document.createElement("button");
  double.setAttribute("id", "double");
  double.setAttribute("class", "hidden");
  double.innerHTML = "Double Down";
  const yes = document.createElement("button");
  yes.setAttribute("id", "yes");
  yes.setAttribute("class", "hidden");
  yes.innerHTML = "Yes";
  const no = document.createElement("button");
  no.setAttribute("id", "no");
  no.setAttribute("class", "hidden");
  no.innerHTML = "No";
  playerChoices.appendChild(five);
  playerChoices.appendChild(ten);
  playerChoices.appendChild(twentyFive);
  playerChoices.appendChild(maxBet);
  playerChoices.appendChild(startGame);
  playerChoices.appendChild(hit);
  playerChoices.appendChild(stay);
  playerChoices.appendChild(double);
  playerChoices.appendChild(yes);
  playerChoices.appendChild(no);
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
const double = document.getElementById("double");
const yes = document.getElementById("yes");
const no = document.getElementById("no");

five.addEventListener("click", addFive);
ten.addEventListener("click", addTen);
twentyFive.addEventListener("click", addTwentyFive);
maxButton.addEventListener("click", maxBet);
startGame.addEventListener("click", gameStart);
hit.addEventListener("click", playerHit);
stay.addEventListener("click", playerStay);
double.addEventListener("click", doubleDown);
yes.addEventListener("click", insuranceYes);
no.addEventListener("click", insuranceNo);
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
    checkDealerCardValue();
    checkPlayerCardValue();
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
  if (gameState.money >= gameState.moneyInPlay) {
    double.removeAttribute("class");
  }
}

function dealCards() {
  // Loop to pass cards from player to dealer
  playerSeat.innerHTML = "";
  dealerSeat.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    let cardChoice = Math.floor(Math.random() * gameState.cards.length);
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = gameState.cards[cardChoice];

    if (i % 2 === 0) {
      gameState.playerCards.push(gameState.cards[cardChoice]);
      playerSeat.appendChild(card);
    } else if (i === 3) {
      card.innerHTML = "?";
      card.setAttribute("id", "dealer-hidden-card");
      gameState.dealerCards.push(gameState.cards[cardChoice]);
      dealerSeat.appendChild(card);
    } else {
      gameState.dealerCards.push(gameState.cards[cardChoice]);
      dealerSeat.appendChild(card);
    }
    gameState.cards.splice(cardChoice, 1);

    console.log("player cards: ", gameState.playerCards);
    console.log("dealer cards: ", gameState.dealerCards);
    console.log("cards: ", gameState.cards);
  }
}

function checkPlayerCardValue() {
  //Grab the value for the player with player card array
  gameState.playerValue = 0;

  for (let card of gameState.playerCards) {
    console.log(card[0]);
    if (card[0] === "A") {
      gameState.playerAceCounter++;
      gameState.playerValue += 11;
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

    if (
      gameState.playerValue === 21 &&
      gameState.playerValue.length === 2 &&
      gameState.playerValue != 21
    ) {
      gameState.moneyInPlay = Math.floor(gameState.moneyInPlay * 1.5);
      gameWon();
    }

    while (gameState.playerValue > 21 && gameState.playerAceCounter > 0) {
      gameState.playerValue -= 10;
      gameState.playerAceCounter--;
    }

    console.log("player value: ", gameState.playerValue);
  }
}

function checkDealerCardValue() {
  //Grab the value for the dealer with dealer card array
  gameState.dealerValue = 0;
  for (let card of gameState.dealerCards) {
    console.log(card[0]);
    if (card[0] === "A") {
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

    while (gameState.dealerValue > 21 && gameState.dealerAceCounter > 0) {
      gameState.dealerValue -= 10;
      gameState.dealerAceCounter--;
    }

    if (
      gameState.dealerCards.length === 2 &&
      gameState.dealerCards[0][0] === "A" &&
      gameState.money >= gameState.moneyInPlay
    ) {
      checkPlayerCardValue();
      if (gameState.playerValue === 21 && gameState.dealerValue === 21) {
        const dealerHiddenCard = document.getElementById("dealer-hidden-card");
        dealerHiddenCard.innerHTML = gameState.dealerCards[1];
        gamePush();
      } else {
        hit.setAttribute("class", "hidden");
        stay.setAttribute("class", "hidden");
        double.setAttribute("class", "hidden");
        moneyInPlay.innerHTML = "Insurance?";
        yes.removeAttribute("class");
        no.removeAttribute("class");
      }
    }

    console.log("dealer value: ", gameState.dealerValue);
  }
}

function playerHit() {
  double.setAttribute("class", "hidden");
  let cardChoice = Math.floor(Math.random() * gameState.cards.length);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = gameState.cards[cardChoice];
  gameState.playerCards.push(gameState.cards[cardChoice]);
  playerSeat.appendChild(card);
  gameState.cards.splice(cardChoice, 1);
  checkPlayerCardValue();
  if (gameState.playerValue > 21) {
    gameLost();
  }
}

function dealerHit() {
  let cardChoice = Math.floor(Math.random() * gameState.cards.length);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = gameState.cards[cardChoice];
  gameState.dealerCards.push(gameState.cards[cardChoice]);
  dealerSeat.appendChild(card);
  gameState.cards.splice(cardChoice, 1);
  setTimeout(() => {});
}

function playerStay() {
  const dealerHiddenCard = document.getElementById("dealer-hidden-card");
  dealerHiddenCard.innerHTML = gameState.dealerCards[1];
  while (gameState.dealerValue < 17) {
    dealerHit();
    checkDealerCardValue();
  }
  if (gameState.dealerValue > 21) {
    gameWon();
  } else if (gameState.dealerValue >= 17) {
    if (gameState.dealerValue < gameState.playerValue) {
      gameWon();
    } else if (gameState.dealerValue > gameState.playerValue) {
      gameLost();
    } else if (gameState.dealerValue === gameState.playerValue) {
      gamePush();
    }
  }
}

function doubleDown() {
  double.removeAttribute("class");
  gameState.money -= gameState.moneyInPlay;
  gameState.moneyInPlay *= 2;

  moneyInPlay.innerHTML = gameState.moneyInPlay;
  moneyDisplay.innerHTML = `Money: ${gameState.money}`;
  playerHit();
  if (gameState.playerValue) {
    playerStay();
  }
}

function gameWon() {
  console.log("BUST!");
  gameState.playerValue = 0;
  gameState.dealerValue = 0;
  gameState.playerCards = [];
  gameState.dealerCards = [];

  gameState.money += gameState.moneyInPlay * 2;
  moneyInPlay.innerHTML = `You have won ${gameState.moneyInPlay * 2}!`;
  gameState.moneyInPlay = 0;
  moneyDisplay.innerHTML = `Money: ${gameState.money}`;

  hit.setAttribute("class", "hidden");
  stay.setAttribute("class", "hidden");
  if (double) {
    double.setAttribute("class", "hidden");
  }
  five.removeAttribute("class");
  ten.removeAttribute("class");
  twentyFive.removeAttribute("class");
  maxButton.removeAttribute("class");
  startGame.removeAttribute("class");
}

function gameLost() {
  console.log("BUST!");
  gameState.playerValue = 0;
  gameState.dealerValue = 0;
  gameState.playerCards = [];
  gameState.dealerCards = [];
  moneyInPlay.innerHTML = `You have lost ${gameState.moneyInPlay}...`;
  gameState.moneyInPlay = 0;

  hit.setAttribute("class", "hidden");
  stay.setAttribute("class", "hidden");
  if (double) {
    double.setAttribute("class", "hidden");
  }
  five.removeAttribute("class");
  ten.removeAttribute("class");
  twentyFive.removeAttribute("class");
  maxButton.removeAttribute("class");
  startGame.removeAttribute("class");
}

function gamePush() {
  console.log("BUST!");
  gameState.playerValue = 0;
  gameState.dealerValue = 0;
  gameState.playerCards = [];
  gameState.dealerCards = [];

  gameState.money += gameState.moneyInPlay;
  gameState.moneyInPlay = 0;
  moneyInPlay.innerHTML = "Push!";
  moneyDisplay.innerHTML = `Money: ${gameState.money}`;

  hit.setAttribute("class", "hidden");
  stay.setAttribute("class", "hidden");
  if (double) {
    double.setAttribute("class", "hidden");
  }
  five.removeAttribute("class");
  ten.removeAttribute("class");
  twentyFive.removeAttribute("class");
  maxButton.removeAttribute("class");
  startGame.removeAttribute("class");
}

function insuranceYes() {
  if (gameState.dealerValue === 21) {
    yes.setAttribute("class", "hidden");
    no.setAttribute("class", "hidden");
    const dealerHiddenCard = document.getElementById("dealer-hidden-card");
    dealerHiddenCard.innerHTML = gameState.dealerCards[1];
    gameState.moneyInPlay *= 2;
    gameWon();
  } else {
    gameState.money -= gameState.moneyInPlay;
    moneyInPlay.innerHTML = gameState.moneyInPlay;
    moneyDisplay.innerHTML = `Money: ${gameState.money}`;
    yes.setAttribute("class", "hidden");
    no.setAttribute("class", "hidden");
    hit.removeAttribute("class");
    stay.removeAttribute("class");
    if (gameState.money >= gameState.moneyInPlay) {
      double.removeAttribute("class");
    }
  }
}

function insuranceNo() {
  if (gameState.dealerValue === 21) {
    yes.setAttribute("class", "hidden");
    no.setAttribute("class", "hidden");
    const dealerHiddenCard = document.getElementById("dealer-hidden-card");
    dealerHiddenCard.innerHTML = gameState.dealerCards[1];
    gameLost();
  } else {
    moneyInPlay.innerHTML = gameState.moneyInPlay;
    moneyDisplay.innerHTML = `Money: ${gameState.money}`;
    yes.setAttribute("class", "hidden");
    no.setAttribute("class", "hidden");
    hit.removeAttribute("class");
    stay.removeAttribute("class");
    if (gameState.money >= gameState.moneyInPlay) {
      double.removeAttribute("class");
    }
  }
}
