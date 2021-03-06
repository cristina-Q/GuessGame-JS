const form = document.querySelector('#form');
const userNumber = document.querySelector('.user-input');
const winSound = new Audio('./media/winsound.mp3');
const loseSound = new Audio('./media/losesound.mp3');
const cashSound = new Audio('./media/cashsound.mp3');
const breakSound = new Audio('./media/chop-wood.mp3');

winSound.volume = 0.4;
loseSound.volume = 0.4;
cashSound.volume = 0.4;
breakSound.volume = 0.4;

let maxBoundary = 100;
let score = 0;
let highscore = Number(localStorage.getItem('highscore'));
displayText('.highscore', highscore);

let randomNumber = generateRandomNumber(maxBoundary);
// document.querySelector('.sociallocker-links').classList.add('d-none'); working here

form.addEventListener(
  'submit',
  function (e) {
    resetState(); //reset state after win
    let userGuess = Number(userNumber.value);
    userNumber.value = '';

    // When input number is the same as random one - player wins
    if (userGuess === randomNumber) {
      winState();
      score += 10;
      displayText('.score', score);

      if (score > highscore) {
        highscore = score;
        displayText('.highscore', highscore);
      }

      getBackLives();
    }

    // When input number is OUT of range
    else if (userGuess === 0 || userGuess > 100 || userGuess < 0) {
      displayText(`.message`, `Please insert a NUMBER between 1 and ${maxBoundary}`);
    }

    // When input number is NOT the same as random one but still in range
    else if (userGuess !== randomNumber) {
      displayText('.message', guideGuess(userGuess, randomNumber));

      // decreases the lives
      if (document.querySelectorAll(`.invisible`).length < 5) {
        for (let i = 5; i <= 5; i--) {
          let activObject = document.getElementById(`heart-${i}`);
          if (!activObject.classList.contains(`invisible`)) {
            activObject.classList.add(`invisible`);
            break;
          }
        }
      }

      // decreases the score
      else if (score >= 5) {
        score -= 5;
        displayText('.score', score);
      }
      // nothing else to lose = loseState
      else {
        loseState();
      }
    }

    localStorage.setItem(`highscore`, `${highscore}`);
    e.preventDefault();
  },
  false,
);

document.querySelector('.new-game').addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    newGameState();
  },
  false,
);

//****************************************** reuse functions

function generateRandomNumber(maxLimit) {
  random = Math.floor(Math.random() * maxLimit) + 1;
  return random;
}

function getBackLives() {
  // gained back all lives
  for (let i = 1; i <= 5; i++) {
    let activObject = document.getElementById(`heart-${i}`);

    if (activObject.classList.contains('invisible')) {
      activObject.classList.toggle('invisible');
    }
  }
}

function displayText(selector, message) {
  document.querySelector(selector).textContent = message;
}

function changeProperty(selector, property, colorHex) {
  document.querySelector(selector).style[property] = colorHex;
}

//-------------- Different States -----------------
function resetState() {
  displayText('.main-title', 'Guess My Number!');
  displayText('.message', 'Start try Guessing the correct number!');
  displayText('#q-box', '?');
  changeProperty('body', 'background', ' #222020');
}

function winState() {
  winSound.play();
  setTimeout(function () {
    cashSound.play();
  }, 3000);
  displayText('.main-title', '🎉WOW!!! GUESSED IT!!🎉');
  displayText('.message', '🐱‍👤🎉🎊WOW!!! YOU GUESS THE NUMBER!!! ');
  displayText('#q-box', randomNumber);
  changeProperty('body', 'background', '#6d014e');
  randomNumber = generateRandomNumber(maxBoundary);
}

function loseState() {
  loseSound.play();
  displayText(`.message`, `You lost the game!!!🧨🧨🧨`);
  displayText(`.main-title`, `🧨🧨 You lost the game!!! 🧨🧨`);
  displayText('.highscore', highscore);
  displayText('#q-box', randomNumber);
  randomNumber = '☠';
}

function newGameState() {
  form.reset();
  score = 0;
  randomNumber = generateRandomNumber(maxBoundary);
  displayText('.score', score);
  displayText('.highscore', highscore);
  getBackLives();
  resetState();
}

function breakBox() {
  breakSound.play();
  displayText('.main-title', 'WOW!!! YOU DID IT!⛏⛏⛏');
  displayText('.message', '⛏⛏!!! Now use the revealed NUMBER !!!⛏⛏');
  displayText('#q-box', randomNumber);
  changeProperty('body', 'background', '#423d3d');
}

//--------------  precision estimator  --------------
function guideGuess(inputNumber, generatedNumber) {
  let guide;
  let differenceBTWnumbers = Math.abs(generatedNumber - inputNumber);

  if (inputNumber > generatedNumber) {
    if (differenceBTWnumbers >= 20) {
      guide = 'Your try is too HIGH! And you are far away!';
    } else if (differenceBTWnumbers <= 10 && differenceBTWnumbers > 5) {
      guide = 'Your try is too HIGH but...🎈 you are somehow close...';
    } else if (differenceBTWnumbers <= 5) {
      guide = 'Your try is too HIGH but...✨✨ you are pretty close!✨✨';
    } else {
      guide = 'Your try is too HIGH!';
    }
  } else if (inputNumber < generatedNumber) {
    if (differenceBTWnumbers >= 20) {
      guide = 'Your try is too LOW! And you are far away!';
    } else if (differenceBTWnumbers <= 10 && differenceBTWnumbers > 5) {
      guide = 'Your try is too LOW but...🎈 you are somehow close...';
    } else if (differenceBTWnumbers <= 5) {
      guide = 'Your try is too LOW but...✨✨ you are pretty close!✨✨';
    } else {
      guide = 'Your try is too LOW!';
    }
  }

  return guide;
}

/* --------------------------------- sociallocker function */
(function () {
  let sociallocker = document.querySelector('.sociallocker');
  if (!sociallocker) return;

  sociallocker.querySelectorAll('.sociallocker-links a').forEach(function (anchor) {
    anchor.onclick = function (e) {
      let open_window = window.open(
        this.href,
        'Share Link',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
      );

      let check_window_close = setInterval(function () {
        if (open_window.closed || open_window == null) {
          clearInterval(check_window_close);
          document.querySelector('.sociallocker-links').classList.add('d-none');
          document.querySelector('.sociallocker-overlay').classList.add('d-none');
          document.querySelector('.sociallocker-content').classList.add('d-none');
          document.querySelector('.sociallocker-content-unlock').classList.remove('d-none');

          document.querySelector('.unlock-content').addEventListener('click', () => {
            breakBox();
            document.querySelector('.sociallocker-links').classList.remove('d-none');
            document.querySelector('.sociallocker-overlay').classList.remove('d-none');
            document.querySelector('.sociallocker-content').classList.remove('d-none');
            document.querySelector('.sociallocker-content-unlock').classList.add('d-none');
          });
        }
      }, 1000);

      e.preventDefault();
    };
  });
})();
