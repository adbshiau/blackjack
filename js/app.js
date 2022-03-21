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
let playerButton;
let dealerArr;
let playerArr;

// DOM ELEMENTS TO BE UPDATED
const dealerSumEl = document.querySelector("#dealer-sum");
// const dealerCard1El = document.querySelector("#dealer-card1");
// const dealerCard2El = document.querySelector("#dealer-card2");
const dealerSideEl = document.querySelector(".dealer-side");
const messageEl = document.querySelector("#message");
const playerSumEl = document.querySelector("#player-sum");
const playerSideEl = document.querySelector(".player-side");
// const playerCard1El = document.querySelector("#player-card1");
// const playerCard2El = document.querySelector("#player-card2");
const playerBtn = document.querySelector("#player-button");

// ADD EVENT LISTENERS
playerBtn.addEventListener("click", init);

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

// RENDER CARDS
function renderDealerDeck(deck, container) {
  container.innerHTML = '';
  let card1HTML = '';
  let card2HTML = '';

  card1HTML += `<div class="card ${deck[0].face}"></div>`;
  card2HTML += `<img id="face-down" src="css/card-deck-css/images/backs/red.svg" alt="face down card"></img>`;
  // card2HTML += `<div class="card ${deck[1].face}"></div>`;

  // deck.forEach(function(card) {
  //   cardsHTML += `<div class="card ${card.face}">card</div>`;
  // })
  // dealerSideEl.append(card1HTML, card2HTML);

  container.innerHTML = card1HTML;
  container.innerHTML += card2HTML;
}

function renderPlayerDeck(deck, container) {
  container.innerHTML = '';
  let card1HTML = '';
  let card2HTML = '';

  card1HTML += `<div class="card ${deck[0].face}"></div>`;
  card2HTML += `<div class="card ${deck[1].face}"></div>`;

  container.innerHTML = card1HTML;
  container.innerHTML += card2HTML;
}

// INITIAL CONTROLLER FUNCTION
function init(e) {
  // console.log("init function is working");

  // New discovery - SET object
  // dealerSet = new Set();
  // playerSet = new Set();
  // for (let i = 0; i < 2; i++) {
  //   dealerSet.add(Math.floor(Math.random() * masterDeck.length));
  // }

  // Set initial value of state variables
  dealerArr = [];
  dealerSum = 0;
  playerArr = [];
  playerSum = 0;

  // let dealerCard1 = dealerArr.push(
  //   masterDeck[Math.floor(Math.random() * masterDeck.length)]
  // );
  // let dealerCard2 = dealerArr.push(
  //   masterDeck[Math.floor(Math.random() * masterDeck.length - 1)]
  // );

  // let playerCard1 = playerArr.push(
  //   masterDeck[Math.floor(Math.random() * masterDeck.length)]
  // );
  // let playerCard2 = playerArr.push(
  //   masterDeck[Math.floor(Math.random() * masterDeck.length - 1)]
  // );

  for (let i = 0; i < 4; i++) {
    dealerArr.push(shuffledDeck[i]);
    i++;
    playerArr.push(shuffledDeck[i]);
  }

  // renderDeck(dealerArr, dealerSideEl);
  // renderDeck(playerArr, playerSideEl);

  dealerSum = updateSum(dealerArr);
  playerSum = updateSum(playerArr);

  // renderSum(dealerSum, dealerSumEl);
  // renderSum(playerSum, playerSumEl);

  render();
}

function render () {
  renderDealerDeck(dealerArr, dealerSideEl);
  renderPlayerDeck(playerArr, playerSideEl);
  renderSum(dealerSum, dealerSumEl);
  renderSum(playerSum, playerSumEl);

  
  // renderDeck(playerArr, playerSideEl);
}

// Update the sum
function updateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].value;
  }
  return sum;
}

// Render sum
function renderSum(sum, container) {
  return container.innerText = sum;
}

// 

