const cardArray = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍉",
  "🍉",
  "🍓",
  "🍓",
  "🥭",
  "🥭",
  "🍍",
  "🍍",
  "🥝",
  "🥝",
];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

let chosenCards = [];
let chosenCardIds = [];
let matchedPairs = 0;
let score = 0;

const gameBoard = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const modal = document.getElementById("congrats-modal");
const playAgainBtn = document.getElementById("play-again-btn");

function createBoard() {
  gameBoard.innerHTML = "";
  chosenCards = [];
  chosenCardIds = [];
  matchedPairs = 0;
  score = 0;
  scoreEl.textContent = score;

  modal.classList.remove("show");

  const shuffled = shuffle([...cardArray]);

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-name", emoji);
    card.setAttribute("data-id", index);
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (chosenCards.length < 2) {
    const selected = this;
    const emoji = selected.getAttribute("data-name");

    selected.textContent = emoji;
    selected.classList.add("flipped");

    chosenCards.push(emoji);
    chosenCardIds.push(selected);

    if (chosenCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [cardOne, cardTwo] = chosenCardIds;
  const [emojiOne, emojiTwo] = chosenCards;

  if (emojiOne === emojiTwo) {
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");
    matchedPairs++;
    score++;
    scoreEl.textContent = score;
  } else {
    cardOne.classList.remove("flipped");
    cardTwo.classList.remove("flipped");
    cardOne.textContent = "";
    cardTwo.textContent = "";
  }

  chosenCards = [];
  chosenCardIds = [];

  if (matchedPairs === cardArray.length / 2) {
    setTimeout(() => {
      modal.classList.add("show");
    }, 300);
  }
}

restartBtn.addEventListener("click", createBoard);
playAgainBtn.addEventListener("click", createBoard);

createBoard();
