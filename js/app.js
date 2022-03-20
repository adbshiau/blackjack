// console.log("JS file has loaded!");

// DEFINE CONSTANTS
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const masterDeck = buildMasterDeck();

// DEFINE STATE VARIABLES
let dealerSum;
let playerSum;
let playerButton;
let dealerArr;
let playerArr;

// DOM ELEMENTS TO BE UPDATED
const dealerSumEl = document.querySelector("#dealer-sum");
const dealerCard1El = document.querySelector("#dealer-card1");
const dealerCard2El = document.querySelector("#dealer-card2");
const dealerSideEl = document.querySelector(".dealer-side");
const messageEl = document.querySelector("#message");
const playerSumEl = document.querySelector("#player-sum");
const playerCard1El = document.querySelector("#player-card1");
const playerCard2El = document.querySelector("#player-card2");
const playerBtn = document.querySelector("#player-button"); 

// ADD EVENT LISTENERS
playerBtn.addEventListener("click", init);

// renderCardInContainer(masterDeck, dealerSideEl);

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

// INITIAL CONTROLLER FUNCTION
function init(e) {
  // console.log("init function is working");

  // Set initial value of state variables
  // dealerSet = new Set();
  // playerSet = new Set();

  // for (let i = 0; i < 2; i++) {
  //   dealerSet.add(Math.floor(Math.random() * masterDeck.length));
  // }

  dealerArr = [];
  playerArr = [];
  
  let dealerCard1 = dealerArr.push(masterDeck[(Math.floor(Math.random() * masterDeck.length))]);
  let dealerCard2 = dealerArr.push(masterDeck[(Math.floor(Math.random() * masterDeck.length - 1))]);

  function renderDealerDeck(dealerDeck, container) {
    container.innerHTML = '';
    let card1HTML = '';
    let card2HTML = '';

    card1HTML += `<div class="card ${dealerDeck[0].face}"></div>`;
    card2HTML += `<div class="card ${dealerDeck[1].face}"></div>`;
    console.group(dealerDeck, "dealerDeck");
    // dealerDeck.forEach(function(card) {
    //   cardsHTML += `<div class="card ${card.face}">card</div>`;
    //   console.log(cardsHTML, "cardsHTML");
    //   console.log(card.face, "card.face");
    // })
    // dealerSideEl.append(card1HTML, card2HTML);

    container.innerHTML = card1HTML;
    container.innerHTML += card2HTML;
    console.log(container.innerHTML, "container");
    
    console.log(dealerSideEl, "dealerSideEl");
  }

  renderDealerDeck(dealerArr, dealerSideEl);
  // if (dealerCard1 !== dealerCard2) {
  //   dealerArr.push(dealerCard1, dealerCard2);
  // } else {

  // }

  // console.log(dealerSet);
  // const randomIndex = Math.floor(Math.random() * masterDeck.length);

  // render();
}

// RENDER
// function render() {
//   dealerSideEl.innerHTML = "";
//   let cardsHTML = "";
//   for (let index of dealerArr) {
//     console.log(index);
//   }
// }

// function renderCardInContainer(deck, container) {
//   container.innerHTML = "";
//   let cardsHtml = "";
//   deck.forEach((card) => {
//     cardsHtml += `<div class="card${card.face}"></div>`;
//   });
//   container.innerHTML = cardsHtml;
// }

// Update the sum given the index of  
function updateSum(arr) {
  let sum = 0;


}

