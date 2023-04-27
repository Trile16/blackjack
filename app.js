// Game State

const gameState = {
  playerName: "Player 1",
  money: 100,
  cards: [
    "2♠",
    "3♠",
    "4♠",
    "5♠",
    "6♠",
    "7♠",
    "8♠",
    "9♠",
    "10♠",
    "J♠",
    "Q♠",
    "K♠",
    "A♠",
    "2♣",
    "3♣",
    "4♣",
    "5♣",
    "6♣",
    "7♣",
    "8♣",
    "9♣",
    "10♣",
    "J♣",
    "Q♣",
    "K♣",
    "A♣",
    "2♦",
    "3♦",
    "4♦",
    "5♦",
    "6♦",
    "7♦",
    "8♦",
    "9♦",
    "10♦",
    "J♦",
    "Q♦",
    "K♦",
    "A♦",
    "2♥",
    "3♥",
    "4♥",
    "5♥",
    "6♥",
    "7♥",
    "8♥",
    "9♥",
    "10♥",
    "J♥",
    "Q♥",
    "K♥",
    "A♥",
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

// Game Rendering
function renderHTML() {
  const body = document.getElementsByTagName("body");
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
  money.innerHTML = `Money: $${gameState.money}`;
  const cardValuesDisplay = document.createElement("span");
  cardValuesDisplay.setAttribute("id", "card-values-display");
  const playerValueDisplay = document.createElement("div");
  playerValueDisplay.setAttribute("id", "player-value-display");
  playerValueDisplay.innerHTML = "Player: ";
  const dealerValueDisplay = document.createElement("div");
  dealerValueDisplay.setAttribute("id", "dealer-value-display");
  dealerValueDisplay.innerHTML = "Dealer: ";
  cardValuesDisplay.appendChild(playerValueDisplay);
  cardValuesDisplay.appendChild(dealerValueDisplay);
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
  const clear = document.createElement("button");
  clear.setAttribute("id", "clear-bet");
  clear.innerHTML = "Clear Bet";
  const startGame = document.createElement("button");
  startGame.setAttribute("id", "game-start");
  startGame.innerHTML = "Start";
  const hit = document.createElement("button");
  hit.setAttribute("id", "hit");
  hit.style.display = "none";
  hit.innerHTML = "Hit";
  const stay = document.createElement("button");
  stay.setAttribute("id", "stay");
  stay.style.display = "none";
  stay.innerHTML = "Stay";
  const double = document.createElement("button");
  double.setAttribute("id", "double");
  double.style.display = "none";
  double.innerHTML = "Double Down";
  const yes = document.createElement("button");
  yes.setAttribute("id", "yes");
  yes.style.display = "none";
  yes.innerHTML = "Yes";
  const no = document.createElement("button");
  no.setAttribute("id", "no");
  no.style.display = "none";
  no.innerHTML = "No";
  playerChoices.appendChild(five);
  playerChoices.appendChild(ten);
  playerChoices.appendChild(twentyFive);
  playerChoices.appendChild(maxBet);
  playerChoices.appendChild(clear);
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
  gameBoard.appendChild(cardValuesDisplay);
  body[0].appendChild(gameBoard);
}

renderHTML();

// DOM
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const twentyFive = document.getElementById("twenty-five");
const maxButton = document.getElementById("max-bet");
const clear = document.getElementById("clear-bet");
const moneyDisplay = document.getElementById("money-display");
const moneyInPlay = document.getElementById("money-in-play");
const startGame = document.getElementById("game-start");
const playerChoices = document.getElementById("player-choice");
const hit = document.getElementById("hit");
const stay = document.getElementById("stay");
const double = document.getElementById("double");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const playerValueDisplay = document.getElementById("player-value-display");
const dealerValueDisplay = document.getElementById("dealer-value-display");

// Event Listeners
five.addEventListener("click", addFive);
ten.addEventListener("click", addTen);
twentyFive.addEventListener("click", addTwentyFive);
clear.addEventListener("click", clearBet);
maxButton.addEventListener("click", maxBet);
startGame.addEventListener("click", gameStart);
hit.addEventListener("click", playerHit);
stay.addEventListener("click", playerStay);
double.addEventListener("click", doubleDown);
yes.addEventListener("click", insuranceYes);
no.addEventListener("click", insuranceNo);

// Game Functionality

function addFive() {
  if (
    gameState.money >= 5 &&
    gameState.maximumBet >= gameState.moneyInPlay + 5
  ) {
    gameState.money -= 5;
    gameState.moneyInPlay += 5;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3rem";
    moneyInPlay.style.width = "3rem";
  }
}

function addTen() {
  if (
    gameState.money >= 10 &&
    gameState.maximumBet >= gameState.moneyInPlay + 10
  ) {
    gameState.money -= 10;
    gameState.moneyInPlay += 10;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3rem";
    moneyInPlay.style.width = "3rem";
  }
}

function addTwentyFive() {
  if (
    gameState.money >= 25 &&
    gameState.maximumBet >= gameState.moneyInPlay + 25
  ) {
    gameState.money -= 25;
    gameState.moneyInPlay += 25;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3rem";
    moneyInPlay.style.width = "3rem";
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
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3rem";
    moneyInPlay.style.width = "3rem";
  }
}

function clearBet() {
  gameState.money += gameState.moneyInPlay;
  gameState.moneyInPlay = 0;
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;
  moneyInPlay.innerHTML = "";
  moneyInPlay.style.removeProperty("background-image");
  moneyInPlay.style.removeProperty("height");
  moneyInPlay.style.removeProperty("width");
}

function gameStart() {
  if (gameState.moneyInPlay) {
    changeButtonsForPlay();
    if (gameState.cards.length <= 10) {
      gameState.cards = [
        "2♠",
        "3♠",
        "4♠",
        "5♠",
        "6♠",
        "7♠",
        "8♠",
        "9♠",
        "10♠",
        "J♠",
        "Q♠",
        "K♠",
        "A♠",
        "2♣",
        "3♣",
        "4♣",
        "5♣",
        "6♣",
        "7♣",
        "8♣",
        "9♣",
        "10♣",
        "J♣",
        "Q♣",
        "K♣",
        "A♣",
        "2♦",
        "3♦",
        "4♦",
        "5♦",
        "6♦",
        "7♦",
        "8♦",
        "9♦",
        "10♦",
        "J♦",
        "Q♦",
        "K♦",
        "A♦",
        "2♥",
        "3♥",
        "4♥",
        "5♥",
        "6♥",
        "7♥",
        "8♥",
        "9♥",
        "10♥",
        "J♥",
        "Q♥",
        "K♥",
        "A♥",
      ];
    }
    dealCards();
    checkDealerCardValue();
    checkPlayerCardValue();
    checkBlackjack();
  }
}

function changeButtonsForPlay() {
  // This will remove the pre-game buttons and add in gameplay buttons
  five.style.display = "none";
  ten.style.display = "none";
  twentyFive.style.display = "none";
  maxButton.style.display = "none";
  clear.style.display = "none";
  startGame.style.display = "none";
  hit.style.removeProperty("display");
  stay.style.removeProperty("display");
  if (gameState.money >= gameState.moneyInPlay) {
    double.style.removeProperty("display");
  }
}

function changeButtonsForBetting() {
  five.style.removeProperty("display");
  ten.style.removeProperty("display");
  twentyFive.style.removeProperty("display");
  maxButton.style.removeProperty("display");
  clear.style.removeProperty("display");
  startGame.style.removeProperty("display");

  hit.style.display = "none";
  stay.style.display = "none";
  double.style.display = "none";
  yes.style.display = "none";
  no.style.display = "none";
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

    let suitCheck = card.innerHTML;

    if (
      suitCheck[suitCheck.length - 1] === "♥" ||
      suitCheck[suitCheck.length - 1] === "♦"
    ) {
      card.style.color = "red";
    }

    if (i % 2 === 0) {
      gameState.playerCards.push(gameState.cards[cardChoice]);
      playerSeat.appendChild(card);
    } else if (i === 3) {
      card.removeAttribute("style");
      card.style.backgroundImage = "url('./assets/hidden-card.jpg')";
      card.style.backgroundSize = "100% 100%";
      card.innerHTML = "";
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

    while (gameState.playerValue > 21 && gameState.playerAceCounter > 0) {
      gameState.playerValue -= 10;
      gameState.playerAceCounter--;
    }

    gameState.playerAceCounter = 0;

    console.log("player value: ", gameState.playerValue);
    playerValueDisplay.innerHTML = `Player: ${gameState.playerValue}`;
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

    gameState.dealerAceCounter = 0;

    if (
      gameState.dealerCards.length === 2 &&
      gameState.dealerCards[0][0] === "A" &&
      gameState.money >= gameState.moneyInPlay
    ) {
      checkPlayerCardValue();
      if (gameState.playerValue === 21 && gameState.dealerValue === 21) {
        const dealerHiddenCard = document.getElementById("dealer-hidden-card");
        dealerHiddenCard.innerHTML = gameState.dealerCards[1];
        yes.style.display = "none";
        no.style.display = "none";
        gamePush();
      } else {
        hit.style.display = "none";
        stay.style.display = "none";
        double.style.display = "none";
        moneyInPlay.style.removeProperty("background-image");
        moneyInPlay.style.removeProperty("height");
        moneyInPlay.style.removeProperty("width");
        moneyInPlay.innerHTML = "Insurance?";
        yes.style.removeProperty("display");
        no.style.removeProperty("display");
      }
    }

    console.log("dealer value: ", gameState.dealerValue);
    if (gameState.dealerCards.length === 2) {
      let cardValueDealer = gameState.dealerCards[0];

      if (
        cardValueDealer[0] === "J" ||
        cardValueDealer[0] === "Q" ||
        cardValueDealer[0] === "K" ||
        cardValueDealer[0] === "1"
      ) {
        dealerValueDisplay.innerHTML = `Dealer: 10`;
      } else if (cardValueDealer[0] === "A") {
        dealerValueDisplay.innerHTML = `Dealer: 11`;
      } else {
        dealerValueDisplay.innerHTML = `Dealer: ${cardValueDealer[0]}`;
      }
    } else {
      dealerValueDisplay.innerHTML = `Dealer: ${gameState.dealerValue}`;
    }
  }
}

function playerHit() {
  double.style.display = "none";
  let cardChoice = Math.floor(Math.random() * gameState.cards.length);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = gameState.cards[cardChoice];
  gameState.playerCards.push(gameState.cards[cardChoice]);

  let suitCheck = card.innerHTML;
  if (
    suitCheck[suitCheck.length - 1] === "♥" ||
    suitCheck[suitCheck.length - 1] === "♦"
  ) {
    card.style.color = "red";
  }

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

  let suitCheck = card.innerHTML;
  if (
    suitCheck[suitCheck.length - 1] === "♥" ||
    suitCheck[suitCheck.length - 1] === "♦"
  ) {
    card.style.color = "red";
  }

  dealerSeat.appendChild(card);
  gameState.cards.splice(cardChoice, 1);
}

function playerStay() {
  const dealerHiddenCard = document.getElementById("dealer-hidden-card");
  dealerHiddenCard.style.removeProperty("background-image");

  let suitCheck = gameState.dealerCards[1];
  if (
    suitCheck[suitCheck.length - 1] === "♥" ||
    suitCheck[suitCheck.length - 1] === "♦"
  ) {
    dealerHiddenCard.style.color = "red";
  }

  dealerHiddenCard.innerHTML = gameState.dealerCards[1];
  dealerValueDisplay.innerHTML = `Dealer: ${gameState.dealerValue}`;
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
  double.style.removeProperty("display");
  gameState.money -= gameState.moneyInPlay;
  gameState.moneyInPlay *= 2;

  moneyInPlay.innerHTML = gameState.moneyInPlay;
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;
  playerHit();
  if (gameState.playerValue) {
    playerStay();
  }
}

function gameWon() {
  gameState.playerValue = 0;
  gameState.dealerValue = 0;
  gameState.playerCards = [];
  gameState.dealerCards = [];

  gameState.money += gameState.moneyInPlay * 2;
  moneyInPlay.style.removeProperty("background-image");
  moneyInPlay.style.removeProperty("height");
  moneyInPlay.style.removeProperty("width");
  moneyInPlay.innerHTML = `You have won $${gameState.moneyInPlay * 2}!`;
  gameState.moneyInPlay = 0;
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;

  changeButtonsForBetting();
}

function gameLost() {
  gameState.playerValue = 0;
  gameState.dealerValue = 0;
  gameState.playerCards = [];
  gameState.dealerCards = [];
  moneyInPlay.style.removeProperty("background-image");
  moneyInPlay.style.removeProperty("height");
  moneyInPlay.style.removeProperty("width");
  moneyInPlay.innerHTML = `You have lost $${gameState.moneyInPlay}...`;
  gameState.moneyInPlay = 0;

  changeButtonsForBetting();
}

function gamePush() {
  console.log("BUST!");
  gameState.playerValue = 0;
  gameState.dealerValue = 0;
  gameState.playerCards = [];
  gameState.dealerCards = [];

  gameState.money += gameState.moneyInPlay;
  gameState.moneyInPlay = 0;
  moneyInPlay.style.removeProperty("background-image");
  moneyInPlay.style.removeProperty("height");
  moneyInPlay.style.removeProperty("width");
  moneyInPlay.innerHTML = "Push!";
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;

  changeButtonsForBetting();
}

function insuranceYes() {
  if (gameState.dealerValue === 21) {
    yes.style.display = "none";
    no.style.display = "none";
    const dealerHiddenCard = document.getElementById("dealer-hidden-card");
    dealerHiddenCard.style.removeProperty("background-image");
    let suitCheck = gameState.dealerCards[1];

    if (
      suitCheck[suitCheck.length - 1] === "♥" ||
      suitCheck[suitCheck.length - 1] === "♦"
    ) {
      dealerHiddenCard.style.color = "red";
    }

    dealerHiddenCard.innerHTML = gameState.dealerCards[1];
    gameState.moneyInPlay *= 2;
    gameWon();
  } else {
    gameState.money -= gameState.moneyInPlay;
    moneyInPlay.innerHTML = gameState.moneyInPlay;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3rem";
    moneyInPlay.style.width = "3rem";
    yes.style.display = "none";
    no.style.display = "none";
    hit.style.removeProperty("display");
    stay.style.removeProperty("display");
    if (gameState.money >= gameState.moneyInPlay) {
      double.style.removeProperty("display");
    }
  }
}

function insuranceNo() {
  if (gameState.dealerValue === 21) {
    yes.style.display = "none";
    no.style.display = "none";
    const dealerHiddenCard = document.getElementById("dealer-hidden-card");
    dealerHiddenCard.style.removeProperty("background-image");
    dealerHiddenCard.innerHTML = gameState.dealerCards[1];

    let suitCheck = gameState.dealerCards[1];
    if (
      suitCheck[suitCheck.length - 1] === "♥" ||
      suitCheck[suitCheck.length - 1] === "♦"
    ) {
      dealerHiddenCard.style.color = "red";
    }

    gameState.moneyInPlay *= 2;
    gameState.money -= gameState.moneyInPlay;
    gameLost();
  } else {
    moneyInPlay.innerHTML = gameState.moneyInPlay;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3rem";
    moneyInPlay.style.width = "3rem";
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    yes.style.display = "none";
    no.style.display = "none";
    hit.style.removeProperty("display");
    stay.style.removeProperty("display");
    if (gameState.money >= gameState.moneyInPlay) {
      double.style.removeProperty("display");
    }
  }
}

function checkBlackjack() {
  if (
    gameState.playerValue === 21 &&
    gameState.playerCards.length === 2 &&
    gameState.dealerValue != 21
  ) {
    gameState.moneyInPlay = Math.ceil(gameState.moneyInPlay * 1.5);
    gameWon();
  }
}
