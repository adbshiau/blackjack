// console.log("JS file has loaded!");

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
const shuffledDeck = getNewShuffledDeck();

// DEFINE STATE VARIABLES
let dealerSum;
let playerSum;
let dealerArr;
let playerArr;
let cardsArr;
let message;

// DOM ELEMENTS TO BE UPDATED
const dealerSumEl = document.querySelector("#dealer-sum");
const dealerSideEl = document.querySelector(".dealer-side");
const messageEl = document.querySelector("#message");
const playerSumEl = document.querySelector("#player-sum");
const playerSideEl = document.querySelector(".player-side");
const playAreaEl = document.querySelector(".play-area");
const playBtn = document.querySelector("#play-button");

// ADD EVENT LISTENERS
playBtn.addEventListener("click", init);
// hitBtn.addEventListener("click", addPlayerCard)
playAreaEl.addEventListener("click", function(e) {
  if (e.target.matches("#stand-button")) {
    revealDealerCards(dealerArr, dealerSideEl);
    renderMessage(messageEl);
    newGame(playAreaEl);
  } else if (e.target.matches("#hit-button")) {
    addCard(playerArr, playerSideEl);
    if (playerSum < 21) {
      renderSum((updateSum(playerArr)), playerSumEl);
    } else if (playerSum > 21) {
      renderSum((updateSum(playerArr)), playerSumEl);
      revealDealerCards(dealerArr, dealerSideEl);
      renderMessage(messageEl);
      newGame(playAreaEl);
    } else if (playerSum === 21) {
      renderSum((updateSum(playerArr)), playerSumEl);
      revealDealerCards(dealerArr, dealerSideEl);
      renderMessage(messageEl);
      newGame(playAreaEl);
    }
  }
});

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
  container.innerHTML = '';
  let card1HTML = '';
  let card2HTML = '';

  card1HTML += `<div class="card ${deck[0].face}"></div>`;
  card2HTML += `<img id="face-down" src="css/card-deck-css/images/backs/red.svg" alt="face down card"></img>`;
  
  container.innerHTML = card1HTML +card2HTML;
}

function renderCards(hands, container) {
  container.innerHTML = '';

  hands.forEach((hand) => {
    container.innerHTML += `<div class="card ${hand.face}"></div>`;
  })
  return container.innerHTML;
}

function addCard (arr, container) {
  arr.push(shuffledDeck[cardsArr.length]);

  container.innerHTML = '';
  let cardHTML = '';
  
  cardHTML += `<div class="card ${arr[cardsArr.length-2].face}"></div>`;
  
  container.innerHTML = renderCards(playerArr, playerSideEl);
  cardsArr = playerArr.concat(dealerArr);
  playerSum = updateSum(playerArr);
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
  for (let i = 0; i < 4; i++) {
    dealerArr.push(shuffledDeck[i]);
    i++;
    playerArr.push(shuffledDeck[i]);
  }

  cardsArr = cardsArr.concat(playerArr, dealerArr);

  dealerSum = dealerArr[0].value;
  playerSum = updateSum(playerArr);

  render();
}

// RENDER INITIAL CARDS, SUM, AND HIT & STAND BUTTON
function render () {
  renderOneCardFaceDown(dealerArr, dealerSideEl);
  renderCards(playerArr, playerSideEl);
  
  renderSum(dealerSum, dealerSumEl);
  renderSum(playerSum, playerSumEl);

  renderHitStandButton(playAreaEl);
  messageEl.innerText = message;
}

// RENDER HIT AND STAND BUTTON AFTER CLICKING PLAY
function renderHitStandButton (container) {
  container.innerHTML = '';
  let hitButton = '';
  let standButton = '';

  hitButton += `<button id="hit-button">HIT</button>`;
  standButton += `<button id="stand-button">STAND</button>`;
  container.innerHTML = hitButton + standButton;
}

// REVEAL DEALER CARDS IF STAND IS CLICKED
function revealDealerCards(arr, container) {
  renderCards(arr, container);
  dealerSum = updateSum(dealerArr);
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
  return container.innerText = sum;
}

function renderMessage(container) {
  if (playerSum > 21) {
    container.innerText = "Bust! Dealer won!";
  }
  else if (playerSum < dealerSum) {
    container.innerText = "Dealer won!";
  }
  else if (playerSum > dealerSum) {
    container.innerText = "You won!";
  }
  else if (playerSum === dealerSum) {
    container.innerText = "Draw!";
  }
}

function newGame(container) {
  container.innerHTML = '';
  let newGameButton = '';

  newGameButton += `<button id="new-game-button">NEW GAME</button>`;
  container.innerHTML = newGameButton;


}
