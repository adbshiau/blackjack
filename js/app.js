// console.log("JS file has loaded!");

// DEFINE CONSTANTS
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();

// DEFINE STATE VARIABLES
let dealerSum;
let playerSum;
let playerButton;

// DOM ELEMENTS TO BE UPDATED
const dealerSumEl = document.querySelector("#dealer-sum");
const dealerCard1El = document.querySelector("#dealer-card1");
const dealerCard2El = document.querySelector("#dealer-card2");
// const dealerSideEl = document.querySelector(".dealer-side");
const messageEl = document.querySelector("#message");
const playerSumEl = document.querySelector("#player-sum");
const playerCard1El = document.querySelector("#player-card1");
const playerCard2El = document.querySelector("#player-card2");
const playerBtn = document.querySelector("#player-button"); 

// ADD EVENT LISTENERS
playerBtn.addEventListener("click", init);

// init();

// renderCardInContainer(masterDeck, dealerSideEl);

// INITIAL CONTROLLER FUNCTION
function init(e) {
  // console.log("init function is working");

  // Set initial value of state variables
  const randomIndex = Math.floor(Math.random() * masterDeck.length);
  console.log(randomIndex);

  

}

// MASTER DECK
function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

// function renderCardInContainer(deck, container) {
//   container.innerHTML = "";
//   let cardsHtml = "";
//   deck.forEach((card) => {
//     cardsHtml += `<div class="card${card.face}"></div>`;
//   });
//   container.innerHTML = cardsHtml;
// }

function getSum(a,b) {
  return a + b;
}