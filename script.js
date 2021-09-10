'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
console.log(score0El, score1El);
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let scores, currentScore, activePlayer, playing;

// To change colors based on active player
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
};
init();

// To switch players if dice rolls to zero
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    console.log('Active=', activePlayer);
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// To roll dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `./source/dice-${dice}.png`;
        console.log(dice);
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }
        else {
            switchPlayer();
        }
    }


});

// To trigger event based on clicks
btnHold.addEventListener('click', function () {
    if (playing) {
        // Adding current score toactive player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }
        else {
            switchPlayer();
        }
    }
});

// To start a new game
btnNew.addEventListener('click', init);