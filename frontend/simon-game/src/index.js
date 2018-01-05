// State
let machineSequence = [];
let playerSequence = [];
let btnClicked;
let count;
let failCount = 0;
const colors = ["red", "green", "blue", "yellow"];
const audios = {
  blue: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  green: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
};

window.onload = function main() {
  document.querySelector("#start").addEventListener("click", start);
  // document.querySelector("#strict").addEventListener("click", playStrict);
  document.querySelector(".game").addEventListener("click", handleBtnClick);
};

/** Handles all logic when a button is clicked . */
function handleBtnClick(event) {
  if (event.target.className === "child") {
    playerSequence.push(event.target.id);
    // trigger logic only after track stops , can get confusing otherwise for user
    playPiece(event.target.id).then(() => {
      if (!sequenceMatches()) {
        if (failCount === 3) {
          fail();
          return;
        }
        playerSequence = [];
        failCount++;
        alert("You pushed wrong Button , try again!");
        playMachine();
      }

      // compare at equal sequences if user nails it then trigger next color in random sequence
      if (playerSequence.length === machineSequence.length && sequenceMatches()) {
        count++;
        document.querySelector(".count").innerHTML = count;

        if (hasWon(count)) {
          alert("You won!");
          start();
        }
        playerSequence = [];
        next();
      }
    });
  }
}

function start() {
  resetState();
  next();
}

function resetState() {
  machineSequence = [];
  playerSequence = [];
  count = failCount = 0;
  document.querySelector(".count").innerHTML = "0";
  return;
}

function fail() {
  alert("You Lost, Restarting!");
  start();
  return;
}

/** Compare player sequence and machine sequence for maching button presses
 * @returns {boolean} returns `false` if user's last input is different than
 * last machine input .
 */
function sequenceMatches() {
  const lastInput = playerSequence.length - 1;
  return playerSequence[lastInput] === machineSequence[lastInput];
}

/**
 * pick random color, push it to seqArr , then play (seqArr)
 */
function next() {
  const randomColor = colors[Math.floor(Math.random() * 4)];
  machineSequence.push(randomColor);
  playMachine();
}

// function playStrictDriver() {
//   document.querySelector("#strict").addEventListener("click", playStrict);
// }

// function playStrict() {
//   resetState();
//   var strictBtn = document.querySelector(".game");
//   document.querySelector(".count").innerHTML = "0";
//   count = 0;

//   strictBtn.addEventListener("click", function(event) {
//     if (event.target.className === "child") {
//       playerSequence.push(event.target.id);
//       playPiece(event.target.id);

//       //only compare if there are equal number of elements in player and machine sequence
//       if (playerSequence.length == machineSequence.length) {
//         if (compare()) {
//           playerSequence = [];
//           next();
//         } else {
//           alert("You Pushed Wrong Button, try again");
//           resetState();
//         }
//       }
//     }
//   });
// }

/**
 * Recursively play the sequence
 */
function playMachine(k = 0) {
  if (k === machineSequence.length) return;
  playPiece(machineSequence[k]).then(() => playMachine(k + 1));
}

function hasWon(count) {
  return count === 5;
}

/** Plays sound and flashes for relevant color
 * the flash takes 0.2 seconds and returns a `Promise` that resolves when
 * sound track ends playing.
 * @param {String} color one of {['green','red','yellow','blue']}
 */
function playPiece(color) {
  return new Promise(resolve => {
    const element = document.querySelector("#" + color);
    element.style.opacity = 0.6;
    setTimeout(() => {
      element.style.opacity = 1;
    }, 200);
    const piece = new Audio(audios[color]);
    piece.play();
    piece.addEventListener("ended", () => {
      resolve();
    });
  });
}
