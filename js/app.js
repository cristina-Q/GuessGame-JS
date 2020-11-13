const form = document.querySelector('#form');
let userNumber = document.querySelector('.user-input');

let maxBoundary = 100;
let score = 0;
let randomNumber = generateRandomNumber(maxBoundary);

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

      // gained back all lives
      for (let i = 1; i <= 5; i++) {
        let activObject = document.getElementById(`heart-${i}`);

        if (activObject.classList.contains('invisible')) {
          activObject.classList.toggle('invisible');
        }
      }
    }

    // When input number is OUT of range
    else if (userGuess === 0 || userGuess > 100 || userGuess < 0) {
      displayText(
        `.message`,
        `Please insert a NUMBER between 1 and ${maxBoundary}`,
      );
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

    e.preventDefault();
  },
  false,
);

//-------------------------- reuse functions

function displayText(selector, message) {
  document.querySelector(selector).textContent = message;
}

function changeProperty(selector, property, colorHex) {
  document.querySelector(selector).style[property] = colorHex;
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
  randomNumber = generateRandomNumber(maxBoundary);
}

function loseState() {
  displayText(`.message`, `You lost the game!!!🧨🧨🧨`);
  displayText(`.main-title`, `🧨🧨 You lost the game!!! 🧨🧨`);
  displayText('#q-box', randomNumber);
  randomNumber = '☠';
}

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

    //
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

function generateRandomNumber(maxLimit) {
  random = Math.floor(Math.random() * maxLimit) + 1;
  return random;
}
