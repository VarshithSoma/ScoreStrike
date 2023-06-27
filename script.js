"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score1El = document.querySelector("#score--0");
const score2El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// starting conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add("hidden");
let playing = true;

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// rolling dice
btnRoll.addEventListener("click", function () {
  //1. generationg random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display that number
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3 if the number is 1 switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to the active player
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    //2.check if the score is >=100
    if (score[activePlayer] >= 50) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    }

    //switch player
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
  }
});
btnNew.addEventListener("click", function () {
  score = [0, 0];
  score1El.textContent = 0;
  score2El.textContent = 0;
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
});

const model = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const showModal = document.querySelectorAll(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");
const rm = function () {
  overlay.classList.remove("hidden");
  model.classList.remove("hidden");
};
for (let i = 0; i < showModal.length; i++) {
  showModal[i].addEventListener("click", rm);
}
const closeModal = function () {
  overlay.classList.add("hidden");
  model.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//esc
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    closeModal();
  }
});
