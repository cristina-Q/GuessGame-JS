let maxBoundary = 100;
let randomNumber = Math.floor(Math.random() * maxBoundary) + 1;
let score = 0;
//randomNumber = 26; // for test

document.getElementById('btn-check').addEventListener('click', () => {
  resetState();
  let guessNumber = Number(Math.abs(document.querySelector('.input-number').value));

  // When input number is the same as random one - player wins
  if (guessNumber === randomNumber) {
    winState();
    score += 10;
    displayText('.score', score);

    // gained back all lives
    for (let i = 1; i <= 5; i++) {
      let activObject = document.getElementById(`heart-${i}`);

      if (activObject.classList.contains('invisible')) {
        activObject.classList.toggle('invisible');
      }
    }

    //// When input number is NOT the same as random one
  } else if (guessNumber !== randomNumber && guessNumber !== 0) {
    displayText('.message', guessNumber > randomNumber ? 'Your try is too HIGH!' : 'Your try is too LOW!');

    if (score >= 5) {
      score -= 5;
      displayText('.score', score);
    } else if (document.querySelectorAll('.invisible').length < 5) {
      for (let i = 5; i <= 5; i--) {
        let activObject = document.getElementById(`heart-${i}`);

        if (!activObject.classList.contains('invisible')) {
          activObject.classList.add('invisible');
          break;
        }
      }
    } else {
      displayText('.message', 'You lost the game!!!🧨🧨🧨');
      displayText('.main-title', '🧨🧨 You lost the game!!! 🧨🧨');
    }

    // When no input and check btn is clicked
  } else if (guessNumber === 0) {
    displayText('.message', 'Please insert a NUMBER between 1 and 100');
  }
});

//-------------------------- reuse functions

function displayText(className, message) {
  document.querySelector(className).textContent = message;
}

function changeProperty(className, property, colorHex) {
  document.querySelector(className).style[property] = colorHex;
}

function resetState() {
  displayText('.main-title', 'Guess My Number!');
  displayText('.message', 'Start try Guessing the correct number!');
  displayText('#q-box', '?');
  changeProperty('body', 'background', ' #222020');
}

function winState() {
  displayText('.main-title', '🎉WOW!!! GUESSED IT!!🎉');
  displayText('.message', '✨✨✨WOW!!! YOU GUESS THE NUMBER!!! ✨✨✨');
  displayText('#q-box', randomNumber);
  changeProperty('body', 'background', '#6d014e');
}
