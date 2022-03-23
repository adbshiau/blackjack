// DEFINE CONSTANTS
const suits = ["s", "c", "d", "h"];
const ranks = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const masterDeck = buildMasterDeck();
let shuffledDeck = getNewShuffledDeck();

// DEFINE STATE VARIABLES
let dealerSum;
let playerSum;
let dealerArr;
let playerArr;
let cardsArr;
let message;
let bet = 0;
let bank = 100;

// DOM ELEMENTS TO BE UPDATED
const dealerSumEl = document.querySelector("#dealer-sum");
const dealerSideEl = document.querySelector(".dealer-side");
const messageEl = document.querySelector("#message");
const playerSumEl = document.querySelector("#player-sum");
const playerSideEl = document.querySelector(".player-side");
const playAreaEl = document.querySelector(".play-area");
const playBtn = document.querySelector("#play-button");
const betEl = document.querySelector("#bet");
const bankEl = document.querySelector("#bank");
const clearBetBtn = document.querySelector("#clear-bet");
const fiveBtn = document.querySelector("#five");
const tenBtn = document.querySelector("#ten");
const twentyBtn = document.querySelector("#twenty");

// ADD EVENT LISTENERS
playBtn.addEventListener("click", init);

playAreaEl.addEventListener("click", function (e) {
  if (e.target.matches("#stand-button")) {
    stand();
  } else if (e.target.matches("#hit-button")) {
    hit();
  } else if (e.target.matches("#new-game-button")) {
    resetGame();
  }
});

clearBetBtn.addEventListener("click", clearBet);

fiveBtn.addEventListener("click", addFive);

// tenBtn.addEventListener("click", addTen);

// twentyBtn.addEventListener("click", addTwenty);


// MASTER DECK
function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === "A" ? 11 : 10),
      });
    });
  });
  return deck;
}

// SHUFFLED DECK
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

// RENDER DEALERS CARDS AT THE BEGINNING OF THE GAME
function renderOneCardFaceDown(deck, container) {
  container.innerHTML = "";
  let card1HTML = "";
  let card2HTML = "";

  card1HTML += `<div class="card ${deck[0].face}"></div>`;
  card2HTML += `<img id="face-down" src="css/card-deck-css/images/backs/red.svg" alt="face down card"></img>`;

  container.innerHTML = card1HTML + card2HTML;
}

// RENDER PLAYERS CARDS AT THE BEGINNING OF THE GAME
function renderCards(hands, container) {
  container.innerHTML = "";
  hands.forEach((hand) => {
    container.innerHTML += `<div class="card ${hand.face}"></div>`;
  });
  return container.innerHTML;
}

function addCard(arr, container) {
  arr.push(shuffledDeck[cardsArr.length]);
  changeValueOfA(shuffledDeck[cardsArr.length]);
  container.innerHTML = "";
  container.innerHTML = renderCards(playerArr, playerSideEl);
  cardsArr = playerArr.concat(dealerArr);
  playerSum = updateSum(playerArr);
}

function addDealerCard(arr, container) {
  arr.push(shuffledDeck[cardsArr.length]);
  container.innerHTML = "";
  changeValueOfA(shuffledDeck[cardsArr.length]);
  container.innerHTML = renderCards(dealerArr, dealerSideEl);
  cardsArr = dealerArr.concat(playerArr);
  dealerSum = updateSum(dealerArr);
}

// INITIAL CONTROLLER FUNCTION
function init(e) {
  // New discovery - SET object
  // dealerSet = new Set();
  // playerSet = new Set();
  // for (let i = 0; i < 2; i++) {
  //   dealerSet.add(Math.floor(Math.random() * masterDeck.length));
  // }

  // SET INITIAL FUNCTION OF THE STATE VARIABLES
  dealerArr = [];
  dealerSum = 0;
  playerArr = [];
  playerSum = 0;
  cardsArr = [];
  message = "";

  if (bet === 0) {
    messageEl.innerText = "You must place a bet!"
    return;
  }

  for (let i = 0; i < 4; i++) {
    dealerArr.push(shuffledDeck[i]);
    i++;
    playerArr.push(shuffledDeck[i]);
  }

  cardsArr = cardsArr.concat(playerArr, dealerArr);

  dealerSum = dealerArr[0].value;
  playerSum = updateSum(playerArr);

  render();
  if (playerSum > 21) {
    renderMessage();
  }
}

// RENDER INITIAL CARDS, SUM, AND HIT & STAND BUTTON
function render() {
  renderOneCardFaceDown(dealerArr, dealerSideEl);
  renderCards(playerArr, playerSideEl);

  renderSum(dealerSum, dealerSumEl);
  renderSum(playerSum, playerSumEl);

  renderHitStandButton(playAreaEl);
  messageEl.innerText = message;
}

// RENDER HIT AND STAND BUTTON AFTER CLICKING PLAY
function renderHitStandButton(container) {
  container.innerHTML = "";
  let hitButton = "";
  let standButton = "";

  hitButton += `<button id="hit-button">HIT</button>`;
  standButton += `<button id="stand-button">STAND</button>`;
  container.innerHTML = hitButton + standButton;
}

// REVEAL DEALER CARDS WHEN STAND IS CLICKED
function revealDealerCards(arr, container) {
  renderCards(arr, container);
  // dealerSum = updateSum(dealerArr);
  renderSum(dealerSum, dealerSumEl);
}

// UPDATE THE SUM
function updateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].value;
  }
  return sum;
}

// RENDER SUM
function renderSum(sum, container) {
  return (container.innerText = sum);
}

// RENDER WIN/LOSE MESSAGE
function renderMessage(container) {
  if (playerSum > 21 && dealerSum <= 21) {
    container.innerText = "Bust! Dealer won!";
  } else if (playerSum < dealerSum && dealerSum <= 21) {
    container.innerText = "Dealer won!";
  } else if (playerSum > dealerSum && playerSum <= 21) {
    container.innerText = "You beat the dealer!";
  } else if (playerSum === dealerSum && playerSum <= 21) {
    container.innerText = "Draw!";
  } else if (playerSum < dealerSum && dealerSum > 21) {
    container.innerText = " Dealer bust. You won!";
  } else if (playerSum > 21 && dealerSum > 21) {
    container.innerText = "BUST!"
  } else if (dealerSum > playerSum && dealerSum > 21 && playerSum > 21) {
    container.innerText = "BUST!";
  } else if (dealerSum === playerSum && dealerSum > 21 && playerSum > 21) {
    container.innerText = "BUST!";
  }
}

// NEW GAME BUTTON APPEARS
function newGameButton(container) {
  container.innerHTML = "";
  let newGameButton = "";
  newGameButton += `<button id="new-game-button">NEW GAME</button>`;
  container.innerHTML = newGameButton;
}

// STAND BUTTON
function stand() {
  dealerSum = updateSum(dealerArr);
  if (dealerSum > 17) {
    revealDealerCards(dealerArr, dealerSideEl);
  } else {
    while (dealerSum < 17) {
      addDealerCard(dealerArr, dealerSideEl);
      renderSum(updateSum(dealerArr), dealerSumEl);
    }
    revealDealerCards(dealerArr, dealerSideEl);
  }
  renderSum(updateSum(dealerArr), dealerSumEl);
  renderMessage(messageEl);
  newGameButton(playAreaEl);
}

// HIT BUTTON
function hit() {
  if (playerSum <= 21) {
    addCard(playerArr, playerSideEl);
    renderSum(updateSum(playerArr), playerSumEl);
    if (playerSum > 21) {
      renderSum(updateSum(playerArr), playerSumEl);
      stand();
    }
  } else {
    renderMessage(messageEl);
  }
}

// RESETS THE GAME
function resetGame() {
  shuffledDeck = getNewShuffledDeck();
  init();
}

function changeValueOfA(card) {
  if (card.face.includes("A")) {
    card.value = 1
  }
}

function addFive() {
  bank = bank - 5;
  bet = bet + 5;
  betEl.innerText = `BET-${bet}`;
  bankEl.innerText = `BANK-${bank}`;
}

// function addTen() {
//   bank = bank - 10;
//   bet = bet + 10;
//   betEl.innerText = `BET-${bet}`;
//   bankEl.innerText = `BANK-${bank}`;
// }

// function addTwenty() {
//   bank = bank - 20;
//   bet = bet + 20;
//   betEl.innerText = `BET-${bet}`;
//   bankEl.innerText = `BANK-${bank}`;
// }

function clearBet() {
  bank = bank + bet;
  bet = 0;
  betEl.innerText = `BET-${bet}`;
  bankEl.innerText = `BANK-${bank}`;
}