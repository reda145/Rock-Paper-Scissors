
// ======================
// STATE (LocalStorage)
// ======================
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  tie: 0,
};

let savedresult = JSON.parse(localStorage.getItem('result'));
let savemoves = JSON.parse(localStorage.getItem('movs'));

// ======================
// INIT (عند تحميل الصفحة)
// ======================
if (savedresult) {
  document.querySelector('.result-js').innerText = savedresult;
}

if (savemoves) {
  document.querySelector('.js-move').innerHTML = savemoves;
}

updatethescore();

// ======================
// GAME LOGIC
// ======================
function game(playermove) {

  let pcnumb = pcmove();
  let result = '';

  // ======================
  // PLAYER MOVE LOGIC
  // ======================
  if (playermove === 'Rock') {

    if (pcnumb === 'Rock') {
      result = 'It is a tie!';
    } else if (pcnumb === 'Paper') {
      result = 'You lose!';
    } else {
      result = 'You win!';
    }

  } else if (playermove === 'Paper') {

    if (pcnumb === 'Rock') {
      result = 'You win!';
    } else if (pcnumb === 'Paper') {
      result = 'It is a tie!';
    } else {
      result = 'You lose!';
    }

  } else if (playermove === 'Scissors') {

    if (pcnumb === 'Rock') {
      result = 'You lose!';
    } else if (pcnumb === 'Paper') {
      result = 'You win!';
    } else {
      result = 'It is a tie!';
    }
  }

  // ======================
  // UPDATE SCORE
  // ======================
  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose!') {
    score.losses += 1;
  } else if (result === 'It is a tie!') {
    score.tie += 1;
  }

  // ======================
  // SAVE DATA
  // ======================
  localStorage.setItem('result', JSON.stringify(result));
  localStorage.setItem('score', JSON.stringify(score));

  // ======================
  // UPDATE UI
  // ======================
  updatethescore();

  let movs = document.querySelector('.js-move');

  movs.innerHTML = `
    You
    <img src="./Styles/${playermove}-emoji.png" class="move-icon">
    Computer
    <img src="./Styles/${pcnumb}-emoji.png" class="move-icon">
  `;

  localStorage.setItem('movs', JSON.stringify(movs.innerHTML));

  return result;
}

// ======================
// COMPUTER MOVE
// ======================
function pcmove() {

  const RandNum = Math.random();
  let pcnumb = '';

  if (RandNum >= 0 && RandNum <= (1 / 3)) {
    pcnumb = 'Rock';
  } else if (RandNum > 1 / 3 && RandNum <= (2 / 3)) {
    pcnumb = 'Paper';
  } else if (RandNum > 2 / 3 && RandNum <= 1) {
    pcnumb = 'Scissors';
  }

  return pcnumb;
}

// ======================
// UI FUNCTIONS
// ======================
function updatethescore() {
  document.querySelector('.score-js').innerText =
    `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.tie}`;
}

function updatetheresult(playermove) {
  let result = game(playermove);
  document.querySelector('.result-js').innerText = result;
}        

