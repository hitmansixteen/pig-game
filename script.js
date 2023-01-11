'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let flag = 0;
let playing = true;
let currentScore = 0;
const scores = [0, 0];

const switchPlayer = function () {
  document.getElementById(`current--${flag}`).textContent = 0;
  flag = flag === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${flag}`).textContent = currentScore;
    } else {
      currentScore = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[flag] += currentScore;
    currentScore = 0;
    document.getElementById(`current--${flag}`).textContent = 0;
    document.getElementById(`score--${flag}`).textContent = scores[flag];
    if (scores[flag] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${flag}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${flag}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      btnHold.classList.add('hidden');
      btnRoll.classList.add('hidden');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector(`.player--${flag}`).classList.remove('player--winner');
  document.querySelector(`.player--${flag}`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  flag = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
  diceEl.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
});
