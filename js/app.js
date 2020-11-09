let maxBoundary = 100;
let randomNumber = Math.floor(Math.random() * maxBoundary) + 1;
let guessNumber;

let score = 0;

document.getElementById('btn-check').addEventListener('click', () => {
  resetState(); //reset state after win
  guessNumber = Number(Math.abs(document.querySelector('.input-number').value));

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
    randomNumber = Math.floor(Math.random() * maxBoundary) + 1;

    //// When input number is NOT the same as random one
  } else if (guessNumber !== randomNumber && guessNumber !== 0) {
    displayText('.message', guideGuess());

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
  displayText('.message', '🐱‍👤🎉🎊WOW!!! YOU GUESS THE NUMBER!!! ');
  displayText('#q-box', randomNumber);
  changeProperty('body', 'background', '#6d014e');
}

function guideGuess() {
  let guide;
  let differenceBTWnumbers = Math.abs(randomNumber - guessNumber);

  if (guessNumber > randomNumber) {
    if (differenceBTWnumbers >= 20) {
      guide = 'Your try is too HIGH! And you are far away!';
    } else if (differenceBTWnumbers <= 10 && differenceBTWnumbers > 5) {
      guide = 'Your try is too HIGH but...🎈 you are somehow close...';
    } else if (differenceBTWnumbers <= 5) {
      guide = 'Your try is too HIGH but...✨✨ you are pretty close!✨✨';
    } else {
      guide = 'Your try is too HIGH!';
    }

    //
  } else if (guessNumber < randomNumber) {
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
