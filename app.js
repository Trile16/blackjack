// Game State
const cardsArray = [
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
const gameState = {
  playerName: "Player 1",
  startingMoney: 100,
  money: 100,
  cards: [],
  minimumBet: 5,
  maximumBet: 50,
  moneyInPlay: 0,
  playerCards: [],
  splitArray: [],
  dealerCards: [],
  playerValue: 0,
  playerSplitValue: 0,
  dealerValue: 0,
  playerAceCounter: 0,
  playerSplitAceCounter: 0,
  dealerAceCounter: 0,
  numDecks: 4,
  isSplit: false,
  optionsToggle: false,
  isFirstGame: true,
};

// Game Rendering
function renderHTML() {
  const body = document.getElementsByTagName("body");

  // Rendering HTML for Settings
  const options = document.createElement("div");
  options.setAttribute("id", "options");
  const optionsButton = document.createElement("button");
  optionsButton.setAttribute("id", "options-button");
  optionsButton.innerHTML = "Settings";
  options.appendChild(optionsButton);
  const moneyOptionLabel = document.createElement("label");
  moneyOptionLabel.setAttribute("for", "money_option");
  moneyOptionLabel.innerHTML = "Starting Money";
  const moneyOption = document.createElement("input");
  moneyOption.setAttribute("id", "money_option");
  moneyOption.setAttribute("type", "range");
  moneyOption.setAttribute("name", "money_option");
  moneyOption.setAttribute("value", "100");
  moneyOption.setAttribute("min", "25");
  moneyOption.setAttribute("max", "500");
  moneyOption.setAttribute("step", "5");
  moneyOption.setAttribute(
    "oninput",
    "money_option_disp.value = money_option.value"
  );
  moneyOption.style.display = "none";
  const moneyOptionOutput = document.createElement("output");
  moneyOptionOutput.setAttribute("id", "money_option_disp");
  moneyOptionOutput.innerHTML = "$100";

  options.appendChild(moneyOptionLabel);
  options.appendChild(moneyOptionOutput);
  options.appendChild(moneyOption);

  const numDecksOptionLabel = document.createElement("label");
  numDecksOptionLabel.setAttribute("for", "num_decks");
  numDecksOptionLabel.innerHTML = "Number of Decks";
  const numDecksOption = document.createElement("input");
  numDecksOption.setAttribute("id", "num_decks_option");
  numDecksOption.setAttribute("type", "range");
  numDecksOption.setAttribute("name", "num_decks_option");
  numDecksOption.setAttribute("value", "4");
  numDecksOption.setAttribute("min", "1");
  numDecksOption.setAttribute("max", "8");
  numDecksOption.setAttribute(
    "oninput",
    "num_decks_option_disp.value = num_decks_option.value"
  );
  numDecksOption.style.display = "none";
  const numDecksOptionOutput = document.createElement("output");
  numDecksOptionOutput.setAttribute("id", "num_decks_option_disp");
  numDecksOptionOutput.innerHTML = "4";

  options.appendChild(numDecksOptionLabel);
  options.appendChild(numDecksOptionOutput);
  options.appendChild(numDecksOption);

  const minBetOptionLabel = document.createElement("label");
  minBetOptionLabel.setAttribute("for", "min_bet");
  minBetOptionLabel.innerHTML = "Minimum Bet";
  const minBetOption = document.createElement("input");
  minBetOption.setAttribute("id", "min_bet_option");
  minBetOption.setAttribute("type", "range");
  minBetOption.setAttribute("name", "min_bet_option");
  minBetOption.setAttribute("value", "1");
  minBetOption.setAttribute("min", "5");
  minBetOption.setAttribute("max", "25");
  minBetOption.setAttribute("step", "5");
  minBetOption.setAttribute(
    "oninput",
    "min_bet_option_disp.value = min_bet_option.value"
  );
  minBetOption.style.display = "none";
  const minBetOptionOutput = document.createElement("output");
  minBetOptionOutput.setAttribute("id", "min_bet_option_disp");
  minBetOptionOutput.innerHTML = "5";

  options.appendChild(minBetOptionLabel);
  options.appendChild(minBetOptionOutput);
  options.appendChild(minBetOption);

  const maxBetOptionLabel = document.createElement("label");
  maxBetOptionLabel.setAttribute("for", "max_bet");
  maxBetOptionLabel.innerHTML = "Maximum Bet";
  const maxBetOption = document.createElement("input");
  maxBetOption.setAttribute("id", "max_bet_option");
  maxBetOption.setAttribute("type", "range");
  maxBetOption.setAttribute("name", "max_bet_option");
  maxBetOption.setAttribute("value", "50");
  maxBetOption.setAttribute("min", "50");
  maxBetOption.setAttribute("max", "500");
  maxBetOption.setAttribute("step", "25");
  maxBetOption.setAttribute(
    "oninput",
    "max_bet_option_disp.value = max_bet_option.value"
  );
  maxBetOption.style.display = "none";
  const maxBetOptionOutput = document.createElement("output");
  maxBetOptionOutput.setAttribute("id", "max_bet_option_disp");
  maxBetOptionOutput.innerHTML = "50";

  options.appendChild(maxBetOptionLabel);
  options.appendChild(maxBetOptionOutput);
  options.appendChild(maxBetOption);

  const optionsSubmitButton = document.createElement("button");
  optionsSubmitButton.setAttribute("id", "options-submit");
  optionsSubmitButton.innerHTML = "Apply Settings";
  optionsSubmitButton.style.display = "none";

  options.appendChild(optionsSubmitButton);

  // Rendering HTML for Game Board

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
  const playerSplitSeat = document.createElement("div");
  playerSplitSeat.setAttribute("id", "playerSplitSeat");
  playerSplitSeat.setAttribute("class", "card-display");
  playerSplitSeat.style.display = "none";
  table.appendChild(playerSplitSeat);
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

  const hitSplit = document.createElement("button");
  hitSplit.setAttribute("id", "hit-2");
  hitSplit.style.display = "none";
  hitSplit.innerHTML = "Hit";

  const staySplit = document.createElement("button");
  staySplit.setAttribute("id", "stay-2");
  staySplit.style.display = "none";
  staySplit.innerHTML = "Stay";

  const doubleSplit = document.createElement("button");
  doubleSplit.setAttribute("id", "double-2");
  doubleSplit.style.display = "none";
  doubleSplit.innerHTML = "Double Down";

  const split = document.createElement("button");
  split.setAttribute("id", "split");
  split.style.display = "none";
  split.innerHTML = "Split";

  const yes = document.createElement("button");
  yes.setAttribute("id", "yes");
  yes.style.display = "none";
  yes.innerHTML = "Yes";

  const no = document.createElement("button");
  no.setAttribute("id", "no");
  no.style.display = "none";
  no.innerHTML = "No";

  // Append children to body
  playerChoices.appendChild(five);
  playerChoices.appendChild(ten);
  playerChoices.appendChild(twentyFive);
  playerChoices.appendChild(maxBet);
  playerChoices.appendChild(clear);
  playerChoices.appendChild(startGame);
  playerChoices.appendChild(hit);
  playerChoices.appendChild(stay);
  playerChoices.appendChild(double);
  playerChoices.appendChild(hitSplit);
  playerChoices.appendChild(staySplit);
  playerChoices.appendChild(doubleSplit);
  playerChoices.appendChild(split);
  playerChoices.appendChild(yes);
  playerChoices.appendChild(no);
  gameBoard.appendChild(gameTitle);
  gameBoard.appendChild(table);
  gameBoard.appendChild(money);
  gameBoard.appendChild(playerChoices);
  gameBoard.appendChild(cardValuesDisplay);
  body[0].appendChild(gameBoard);
  body[0].appendChild(options);
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
const hitSplit = document.getElementById("hit-2");
const staySplit = document.getElementById("stay-2");
const doubleSplit = document.getElementById("double-2");
const split = document.getElementById("split");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const playerValueDisplay = document.getElementById("player-value-display");
const dealerValueDisplay = document.getElementById("dealer-value-display");
const optionsButton = document.getElementById("options-button");
const optionsSubmitButton = document.getElementById("options-submit");
const optionsMoney = document.getElementById("money_option");
const optionsNumDecks = document.getElementById("num_decks_option");
const optionsMinBet = document.getElementById("min_bet_option");
const optionsMaxBet = document.getElementById("max_bet_option");
const optionsMoneyVisual = document.getElementById("money_option_disp");
const optionsNumDecksVisual = document.getElementById("num_decks_option_disp");
const optionsMinBetVisual = document.getElementById("min_bet_option_disp");
const optionsMaxBetVisual = document.getElementById("max_bet_option_disp");
const playerSplitSeat = document.getElementById("playerSplitSeat");

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
split.addEventListener("click", splitHand);
hitSplit.addEventListener("click", playerSplitHit);
staySplit.addEventListener("click", playerSplitStay);
yes.addEventListener("click", insuranceYes);
no.addEventListener("click", insuranceNo);
optionsButton.addEventListener("click", toggleOptionsWindow);
optionsSubmitButton.addEventListener("click", submitOptions);

// Game Functionality

function addFive() {
  if (
    gameState.money >= 5 &&
    gameState.maximumBet >= gameState.moneyInPlay + 5
  ) {
    clearTable();
    gameState.money -= 5;
    gameState.moneyInPlay += 5;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3.5rem";
    moneyInPlay.style.width = "3.5rem";
    playerSplitSeat.style.display = "none";
  }
}

function addTen() {
  if (
    gameState.money >= 10 &&
    gameState.maximumBet >= gameState.moneyInPlay + 10
  ) {
    clearTable();
    gameState.money -= 10;
    gameState.moneyInPlay += 10;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3.5rem";
    moneyInPlay.style.width = "3.5rem";
    playerSplitSeat.style.display = "none";
  }
}

function addTwentyFive() {
  if (
    gameState.money >= 25 &&
    gameState.maximumBet >= gameState.moneyInPlay + 25
  ) {
    clearTable();
    gameState.money -= 25;
    gameState.moneyInPlay += 25;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3.5rem";
    moneyInPlay.style.width = "3.5rem";
    playerSplitSeat.style.display = "none";
  }
}

function maxBet() {
  if (
    gameState.moneyInPlay < gameState.maximumBet &&
    gameState.maximumBet - gameState.moneyInPlay <= gameState.money
  ) {
    clearTable();
    let subtractFromMoney = gameState.maximumBet - gameState.moneyInPlay;
    gameState.money -= subtractFromMoney;
    gameState.moneyInPlay = gameState.maximumBet;
    moneyDisplay.innerHTML = `Money: $${gameState.money}`;
    moneyInPlay.innerHTML = `${gameState.moneyInPlay}`;
    moneyInPlay.style.backgroundImage = "url('./assets/chip.png')";
    moneyInPlay.style.height = "3.5rem";
    moneyInPlay.style.width = "3.5rem";
    playerSplitSeat.style.display = "none";
  }
}

function clearBet() {
  clearTable();
  console.log(gameState.money);
  console.log(gameState.moneyInPlay);
  let returnMoney = gameState.moneyInPlay;
  console.log(returnMoney);
  gameState.money += returnMoney;
  console.log(gameState.money);
  gameState.moneyInPlay = 0;
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;
  moneyInPlay.innerHTML = "";
  moneyInPlay.style.removeProperty("background-image");
  moneyInPlay.style.removeProperty("height");
  moneyInPlay.style.removeProperty("width");
  playerSplitSeat.style.display = "none";
}

function gameStart() {
  if (gameState.moneyInPlay >= gameState.minimumBet) {
    changeButtonsForPlay();
    if (gameState.isFirstGame) {
      deckReload();
    }
    dealCards();
    checkDealerCardValue();
    checkPlayerCardValue();
    checkBlackjack();
  }
}

function deckReload(optionsCheck) {
  if (optionsCheck) {
    alert("Success! Settings updated!");
  } else if (gameState.isFirstGame) {
    gameState.isFirstGame = false;
  } else {
    alert("The shoe has been reshuffled!");
  }
  gameState.cards = [];
  for (let i = 0; i < gameState.numDecks; i++) {
    for (let card of cardsArray) {
      gameState.cards.push(card);
    }
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
  gameState.optionsToggle = false;
  optionsButton.style.display = "none";
  optionsMoney.style.display = "none";
  optionsNumDecks.style.display = "none";
  optionsMinBet.style.display = "none";
  optionsMaxBet.style.display = "none";
  optionsSubmitButton.style.display = "none";
  hit.style.removeProperty("display");
  stay.style.removeProperty("display");
  if (gameState.money >= gameState.moneyInPlay) {
    double.style.removeProperty("display");
  }
}

function changeButtonsForSplitPlay() {
  // This will add buttons that will function with the split hand
  five.style.display = "none";
  ten.style.display = "none";
  twentyFive.style.display = "none";
  maxButton.style.display = "none";
  clear.style.display = "none";
  startGame.style.display = "none";
  optionsSubmitButton.style.display = "none";
  hit.style.display = "none";
  stay.style.display = "none";
  double.style.display = "none";
  playerSplitSeat.display = "none";

  hitSplit.style.removeProperty("display");
  staySplit.style.removeProperty("display");
}

function changeButtonsForBetting() {
  five.style.removeProperty("display");
  ten.style.removeProperty("display");
  twentyFive.style.removeProperty("display");
  maxButton.style.removeProperty("display");
  clear.style.removeProperty("display");
  startGame.style.removeProperty("display");
  optionsButton.style.removeProperty("display");

  hit.style.display = "none";
  stay.style.display = "none";
  double.style.display = "none";
  split.style.display = "none";
  hitSplit.style.display = "none";
  staySplit.style.display = "none";
  doubleSplit.style.display = "none";
  yes.style.display = "none";
  no.style.display = "none";

  //Reshuffle if deck is too small
  if (gameState.cards.length < 10) {
    deckReload();
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

  if (gameState.playerCards[0][0] === gameState.playerCards[1][0]) {
    split.style.removeProperty("display");
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

    console.log("player value: ", gameState.playerValue);
    playerValueDisplay.innerHTML = `Player: ${gameState.playerValue}`;
  }

  gameState.playerAceCounter = 0;
}

function checkPlayerSplitCardValue() {
  //Grab the value for the player with player card array
  gameState.playerSplitValue = 0;

  for (let card of gameState.splitArray) {
    console.log(card[0]);
    if (card[0] === "A") {
      gameState.playerSplitAceCounter++;
      gameState.playerSplitValue += 11;
    } else if (
      card[0] === "J" ||
      card[0] === "Q" ||
      card[0] === "K" ||
      card[0] === "1"
    ) {
      gameState.playerSplitValue += 10;
    } else {
      gameState.playerSplitValue += parseInt(card[0]);
    }

    while (
      gameState.playerSplitValue > 21 &&
      gameState.playerSplitAceCounter > 0
    ) {
      gameState.playerSplitValue -= 10;
      gameState.playerSplitAceCounter--;
    }

    console.log("player value: ", gameState.playerSplitValue);
    playerValueDisplay.innerHTML = `Player: ${gameState.playerValue}, ${gameState.playerSplitValue}`;
  }

  gameState.playerSplitAceCounter = 0;
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
        yes.style.display = "none";
        no.style.display = "none";
        gamePush();
      } else {
        hit.style.display = "none";
        stay.style.display = "none";
        double.style.display = "none";
        split.style.display = "none";
        moneyInPlay.style.removeProperty("background-image");
        moneyInPlay.style.removeProperty("height");
        moneyInPlay.style.removeProperty("width");
        moneyInPlay.innerHTML = "Insurance?";
        moneyInPlay.style.backgroundImage = "url('./assets/gold-plate.png')";
        moneyInPlay.style.width = "20rem";
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

  gameState.dealerAceCounter = 0;
}

function playerHit() {
  double.style.display = "none";
  split.style.display = "none";

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
  if (gameState.playerValue > 21 && gameState.isSplit === false) {
    gameLost();
  } else if (gameState.playerValue > 21 && gameState.isSplit === true) {
    checkPlayerSplitCardValue();
    playerValueDisplay.innerHTML = `Player: ${gameState.playerValue}, ${gameState.playerSplitValue}`;
    changeButtonsForSplitPlay();
  }
}

function playerSplitHit() {
  double.style.display = "none";
  let cardChoice = Math.floor(Math.random() * gameState.cards.length);
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = gameState.cards[cardChoice];
  gameState.splitArray.push(gameState.cards[cardChoice]);

  let suitCheck = card.innerHTML;
  if (
    suitCheck[suitCheck.length - 1] === "♥" ||
    suitCheck[suitCheck.length - 1] === "♦"
  ) {
    card.style.color = "red";
  }

  playerSplitSeat.appendChild(card);
  gameState.cards.splice(cardChoice, 1);
  checkPlayerSplitCardValue();
  if (gameState.playerSplitValue > 21 && gameState.playerValue > 21) {
    gameLost();
  } else if (gameState.playerSplitValue > 21) {
    checkPlayerCardValue();
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
  if (gameState.isSplit === false) {
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
  } else {
    checkPlayerSplitCardValue();
    playerValueDisplay.innerHTML = `Player: ${gameState.playerValue}, ${gameState.playerSplitValue}`;
    changeButtonsForSplitPlay();
  }
}

function playerSplitStay() {
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

  checkSplitHandWin();
}

function doubleDown() {
  gameState.money -= gameState.moneyInPlay;
  gameState.moneyInPlay *= 2;

  moneyInPlay.innerHTML = gameState.moneyInPlay;
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;
  playerHit();
  if (gameState.playerValue) {
    playerStay();
  }
}

function splitHand() {
  gameState.isSplit = true;

  split.style.display = "none";
  doubleSplit.style.display = "none";

  gameState.money -= gameState.moneyInPlay;
  gameState.moneyInPlay *= 2;

  let secondCard = gameState.playerCards.pop();
  playerSeat.removeChild(playerSeat.lastChild);

  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = secondCard;
  gameState.splitArray.push(secondCard);

  let suitCheck = card.innerHTML;
  if (
    suitCheck[suitCheck.length - 1] === "♥" ||
    suitCheck[suitCheck.length - 1] === "♦"
  ) {
    card.style.color = "red";
  }

  playerSplitSeat.style.removeProperty("display");
  playerSplitSeat.appendChild(card);

  playerHit();
}

function checkSplitHandWin() {
  while (gameState.dealerValue < 17) {
    dealerHit();
    checkDealerCardValue();
  }
  if (gameState.dealerValue > 21) {
    if (gameState.playerValue > 21 && gameState.playerSplitValue < 21) {
      gamePush();
    } else if (gameState.playerValue < 21 && gameState.playerSplitValue > 21) {
      gamePush();
    } else {
      gameWon();
    }
  } else if (gameState.dealerValue >= 17) {
    if (
      gameState.dealerValue < gameState.playerValue &&
      gameState.playerValue <= 21 &&
      gameState.playerSplitValue > gameState.dealerValue
    ) {
      gameWon();
    } else if (
      gameState.dealerValue < gameState.playerValue &&
      gameState.playerValue <= 21 &&
      gameState.playerSplitValue < gameState.dealerValue
    ) {
      gamePush();
    } else if (
      gameState.dealerValue > gameState.playerValue &&
      gameState.playerSplitValue < gameState.dealerValue
    ) {
      gamePush();
    } else if (
      gameState.dealerValue === gameState.playerValue &&
      gameState.dealerValue < gameState.playerSplitValue
    ) {
      gameState.moneyInPlay -= gameState.moneyInPlay / 4;
      gameWon();
    } else if (
      gameState.dealerValue === gameState.playerSplitValue &&
      gameState.dealerValue < gameState.playerValue
    ) {
      gameState.moneyInPlay -= gameState.moneyInPlay / 4;
      gameWon();
    } else if (
      gameState.dealerValue === gameState.playerValue &&
      gameState.dealerValue > gameState.playerSplitValue
    ) {
      gameState.moneyInPlay -= gameState.moneyInPlay * 0.75;
      gameState.money += gameState.moneyInPlay / 4;
      gameLost();
    } else if (
      gameState.dealerValue === gameState.playerSplitValue &&
      gameState.dealerValue > gameState.playerValue
    ) {
      gameState.moneyInPlay -= gameState.moneyInPlay * 0.75;
      gameLost();
    } else {
      gameLost();
    }
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
  moneyInPlay.style.backgroundImage = "url('./assets/gold-plate.png')";
  moneyInPlay.style.width = "20rem";
  gameState.moneyInPlay = 0;
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;

  changeButtonsForBetting();
  clearSplitVariables();
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
  moneyInPlay.style.backgroundImage = "url('./assets/gold-plate.png')";
  moneyInPlay.style.width = "20rem";

  gameState.moneyInPlay = 0;

  changeButtonsForBetting();
  clearSplitVariables();
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
  moneyInPlay.style.backgroundImage = "url('./assets/gold-plate.png')";
  moneyInPlay.style.width = "20rem";

  changeButtonsForBetting();
  clearSplitVariables();
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
    dealerValueDisplay.innerHTML = `Dealer: ${gameState.dealerValue}`;
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

    dealerValueDisplay.innerHTML = `Dealer: ${gameState.dealerValue}`;
    moneyDisplay.innerHTML = `Money $${gameState.money}`;
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
    if (gameState.playerCards[0][0] === gameState.playerCards[1][0]) {
      split.style.removeProperty("display");
    }
  }
}

function checkBlackjack() {
  if (
    gameState.playerValue === 21 &&
    gameState.playerCards.length === 2 &&
    gameState.dealerValue != 21
  ) {
    gameState.moneyInPlay = Math.ceil(gameState.moneyInPlay * 1.25);
    gameWon();
  }
}

// Options Functions

function toggleOptionsWindow() {
  if (gameState.optionsToggle === false) {
    gameState.optionsToggle = true;
    optionsMoney.style.removeProperty("display");
    optionsNumDecks.style.removeProperty("display");
    optionsMinBet.style.removeProperty("display");
    optionsMaxBet.style.removeProperty("display");
    optionsSubmitButton.style.removeProperty("display");
  } else {
    gameState.optionsToggle = false;
    optionsMoney.style.display = "none";
    optionsNumDecks.style.display = "none";
    optionsMinBet.style.display = "none";
    optionsMaxBet.style.display = "none";
    optionsMoneyVisual.innerHTML = `$${gameState.startingMoney}`;
    optionsNumDecksVisual.innerHTML = gameState.numDecks;
    optionsMinBetVisual.innerHTML = gameState.minimumBet;
    optionsMaxBetVisual.innerHTML = gameState.maximumBet;
    optionsSubmitButton.style.display = "none";
  }
}

function submitOptions() {
  gameState.money = parseInt(optionsMoney.value);
  gameState.startingMoney = parseInt(optionsMoney.value);
  gameState.minimumBet = parseInt(optionsMinBet.value);
  gameState.maximumBet = parseInt(optionsMaxBet.value);
  gameState.numDecks = parseInt(optionsNumDecks.value);
  gameState.moneyInPlay = 0;
  gameState.optionsToggle = false;
  gameState.isFirstGame = true;
  optionsMoney.style.display = "none";
  optionsNumDecks.style.display = "none";
  optionsMinBet.style.display = "none";
  optionsMaxBet.style.display = "none";
  optionsMoneyVisual.innerHTML = `$${gameState.startingMoney}`;
  optionsNumDecksVisual.innerHTML = gameState.numDecks;
  optionsMinBetVisual.innerHTML = gameState.minimumBet;
  optionsMaxBetVisual.innerHTML = gameState.maximumBet;
  optionsSubmitButton.style.display = "none";
  moneyDisplay.innerHTML = `Money: $${gameState.money}`;
  moneyInPlay.innerHTML = "";
  moneyInPlay.style.removeProperty("background-image");

  console.log(gameState.money);

  console.log(optionsMinBet.value);
  console.log(optionsMaxBet.value);

  clearTable();
  deckReload(true);
  console.log(gameState.cards);
}

// Game Clearing Functions

function clearTable() {
  while (dealerSeat.hasChildNodes()) {
    dealerSeat.removeChild(dealerSeat.firstChild);
  }

  while (playerSeat.hasChildNodes()) {
    playerSeat.removeChild(playerSeat.firstChild);
  }

  playerValueDisplay.innerHTML = "Player: ";
  dealerValueDisplay.innerHTML = "Dealer: ";
}

function clearSplitVariables() {
  gameState.splitArray = [];
  gameState.playerSplitAceCounter = 0;
  gameState.playerSplitValue = 0;
  gameState.isSplit = false;
}
