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
const clickAudio = new Audio();
clickAudio.src = "assets/audio/click_button.mp3";
const dealCardAudio = new Audio();
dealCardAudio.src = "assets/audio/deal_card.mp3";
const winnerAudio = new Audio;
winnerAudio.src = "assets/audio/winner.mp3";
const loserAudio = new Audio;
loserAudio.src = "assets/audio/loser.mp3";
const drawAudio = new Audio;
drawAudio.src = "assets/audio/draw.mp3";

// DEFINE STATE VARIABLES
let masterDeck;
let shuffledDeck;
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
playBtn.addEventListener("click", init); // play button

playAreaEl.addEventListener("click", function (e) {
  if (e.target.matches("#stand-button")) { // stand button
    stand();
  } else if (e.target.matches("#hit-button")) { // hit button
    hit();
  } else if (e.target.matches("#new-game-button")) { // new game button
    resetGame();
  }
});

clearBetBtn.addEventListener("click", clearBet); // clear player bet

fiveBtn.addEventListener("click", addFive); // five dollar chip

tenBtn.addEventListener("click", addTen); // ten dollar chip

twentyBtn.addEventListener("click", addTwenty); // twenty dollar chip

// POPULATE MASTER DECK ARRAY
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

// POPULATE SHUFFLED DECK ARRAY
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

// RENDER DEALER CARDS AT THE BEGINNING OF THE GAME
function renderOneCardFaceDown(deck, container) {
  container.innerHTML = "";
  let card1HTML = "";
  let card2HTML = "";

  card1HTML += `<div class="card ${deck[0].face}"></div>`;
  card2HTML += `<img id="face-down" src="css/card-deck-css/images/backs/red.svg" alt="face down card"></img>`;

  container.innerHTML = card1HTML + card2HTML;
}

// RENDER PLAYER CARDS AT THE BEGINNING OF THE GAME
function renderCards(hands, container) {
  container.innerHTML = "";
  hands.forEach((hand) => {
    container.innerHTML += `<div class="card ${hand.face}"></div>`;
  });
  return container.innerHTML;
}

// ADD PLAYER CARD
function addCard(arr, container) {
  arr.push(shuffledDeck[cardsArr.length]);
  changeValueOfA(shuffledDeck[cardsArr.length]);
  container.innerHTML = "";
  container.innerHTML = renderCards(playerArr, playerSideEl);
  cardsArr = playerArr.concat(dealerArr);
  playerSum = updateSum(playerArr);
}

// ADD DEALER CARD
function addDealerCard(arr, container) {
  arr.push(shuffledDeck[cardsArr.length]);
  container.innerHTML = "";
  if (shuffledDeck[cardsArr.length].face.includes("A")) {
    changeValueOfA(dealerArr[dealerArr.length - 1]);
  } else if (dealerArr[0].face.includes("A")) {
    changeValueOfA(dealerArr[0]);
  } else if (dealerArr[1].face.includes("A")) {
    changeValueOfA(dealerArr[1]);
  }
  container.innerHTML = renderCards(dealerArr, dealerSideEl);
  cardsArr = dealerArr.concat(playerArr);
  dealerSum = updateSum(dealerArr);
}

// INITIAL CONTROLLER FUNCTION
function init(e) {

  masterDeck = buildMasterDeck();
  shuffledDeck = getNewShuffledDeck();
  dealerArr = [];
  dealerSum = 0;
  playerArr = [];
  playerSum = 0;
  cardsArr = [];
  message = "";

  clickAudio.play();

  // Player needs to place a bet to start the game
  if (bet === 0) {
    messageEl.innerText = "You must place a bet!";
    return;
  }

  // Populate player cards array and dealer cards array
  for (let i = 0; i < 4; i++) {
    dealerArr.push(shuffledDeck[i]);
    i++;
    playerArr.push(shuffledDeck[i]);
  }

  // Combine cards into cards array
  cardsArr = cardsArr.concat(playerArr, dealerArr);

  // If both player cards are aces, second ace value becomes 1
  if (playerArr[0].face.includes("A") && playerArr[1].face.includes("A")) {
    playerArr[0].value = 1;
  }
  // If both dealer cards are aces, both cards value becomes 1
  if (dealerArr[0].face.includes("A") && dealerArr[1].face.includes("A")) {
    dealerArr[0].value = 1;
    dealerArr[1].value = 1;
  }
  playerSum = updateSum(playerArr);
  dealerSum = updateSum(dealerArr);

  dealCardAudio.play();
  
  render();
}

// RENDER INITIAL CARDS, SUM, HIT/STAND BUTTONS, AND TAKES MESSAGE ON THE MIDDLE OF THE PLAY AREA OFF
function render() {
  renderOneCardFaceDown(dealerArr, dealerSideEl);
  renderCards(playerArr, playerSideEl);

  renderSum(dealerArr[0].value, dealerSumEl);
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
  renderSum(dealerSum, dealerSumEl);
}

// UPDATE THE SUM OF PLAYER/DEALER ARRAY
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
  if (playerSum === 21) {
    if (dealerSum === 21) {
      container.innerText = "It's a draw!";
      drawAudio.play();
      draw();
    } else if (dealerSum > 21) {
      container.innerText = "21! You beat the dealer!";
      winnerAudio.play();
      winner();
    }
  }
  if (playerSum > 21 && dealerSum > 21) {
    container.innerText = "BUST!!";
    loserAudio.play();
    loser();
  }
  if (playerSum > dealerSum) {
    if (playerSum <= 21) {
      container.innerText = "You won!";
      winnerAudio.play();
      winner();
    } else if (playerSum > 21 && dealerSum <= 21) {
      container.innerText = "Bust! Dealer won.";
      loserAudio.play();
      loser();
    }
  }
  if (playerSum < dealerSum) {
    if (dealerSum <= 21) {
      container.innerText = "Dealer won!";
      loserAudio.play();
      loser();
    } else if (dealerSum > 21 && playerSum <= 21) {
      container.innerText = "Dealer bust. You won!";
      winnerAudio.play();
      winner();
    } else if (playerSum > 21) {
      container.innerText = "BUST!!!";
      loserAudio.play();
      loser();
    }
  }
  if (playerSum === dealerSum) {
    if (playerSum > 21 && dealerSum > 21) {
      container.innerText = "BUST!";
      loserAudio.play();
      loser();
    } else if (playerSum <= 21) {
      container.innerText = "Draw!";
      drawAudio.play();
      draw();
    }
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
  clickAudio.play();
  if (dealerSum > 17) {
    revealDealerCards(dealerArr, dealerSideEl);
  } else {
    while (dealerSum < 17) {
      addDealerCard(dealerArr, dealerSideEl);
      updateSum(dealerArr);
    }
    revealDealerCards(dealerArr, dealerSideEl);
  }
  renderSum(updateSum(dealerArr), dealerSumEl);
  renderMessage(messageEl);
  newGameButton(playAreaEl);
}

// HIT BUTTON
function hit() {
  clickAudio.play();
  dealCardAudio.play();
  playerSum = updateSum(playerArr);
  if (playerSum <= 21) {
    addCard(playerArr, playerSideEl);
    if (playerArr[0].face.includes("A")) {
      playerArr[0].value = 1;
      updateSum(playerArr);
    }
    if (playerArr[1].face.includes("A")) {
      playerArr[1].value = 1;
      updateSum(playerArr);
    }
    renderSum(updateSum(playerArr), playerSumEl);
  }
  playerSum = updateSum(playerArr);
  if (playerSum > 21) {
    renderSum(updateSum(playerArr), playerSumEl);
    stand();
  }
}

// RESETS THE GAME
function resetGame() {
  clickAudio.play();
  init();
}

// CHANGES THE VALUE OF ACE
function changeValueOfA(card) {
  if (card.face.includes("A")) {
    card.value = 1;
  }
}

// ADD FIVE DOLLAR CHIP
function addFive() {
  clickAudio.play();
  if (bank >= 5) {
    bank = bank - 5;
    bet = bet + 5;
    betEl.innerText = `BET-${bet}`;
    bankEl.innerText = `BANK-${bank}`;
  } else {
    messageEl.innerText = "Not enough funds!";
  }
}

// ADD TEN DOLLAR CHIP
function addTen() {
  clickAudio.play();
  if (bank >= 10) {
    bank = bank - 10;
    bet = bet + 10;
    betEl.innerText = `BET-${bet}`;
    bankEl.innerText = `BANK-${bank}`;
  } else {
    messageEl.innerText = "Not enough funds!";
  }
}

// ADD TWENTY DOLLAR CHIP
function addTwenty() {
  clickAudio.play();
  if (bank >= 20) {
    bank = bank - 20;
    bet = bet + 20;
    betEl.innerText = `BET-${bet}`;
    bankEl.innerText = `BANK-${bank}`;
  } else {
    messageEl.innerText = "Not enough funds!";
  }
}

// CLEAR BET BUTTON
function clearBet() {
  clickAudio.play();
  bank = bank + bet;
  bet = 0;
  betEl.innerText = `BET-${bet}`;
  bankEl.innerText = `BANK-${bank}`;
}

// UPDATE BET AND BANK IF PLAYER WINS
function winner() {
  bet = bet * 2;
  bank = bank + bet;
  bet = 0;
  betEl.innerText = "BET-0";
  bankEl.innerText = `BANK-${bank}`;
}

// UPDATE BET AND BANK IF ITS A DRAW
function draw() {
  bank = bet + bank;
  bet = 0;
  betEl.innerText = "BET-0";
  bankEl.innerText = `BANK-${bank}`;
}

// UPDATE BET AND BANK IF PLAYER LOST
function loser() {
  bet = 0;
  betEl.innerText = "BET-0";
  bankEl.innerText = `BANK-${bank}`;
}
