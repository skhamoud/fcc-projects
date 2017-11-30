/** 
 * Set Array of Sequence seqArr , and round = 1
 * check for user's input 
 *    if(CheckInput()) {
 *      round++
 *      repeat line 3 
 *    }
 *    else Notify and replay() last sequence 
 * 
 */
window.onload = start;
let machineSequence = [];
let humanSequence = [];
let btnClicked;
let count;
/* Start the game */
function start() {
  document.querySelector("#strict").addEventListener("click", playStrict);
  document.querySelector("#start").addEventListener("click", main);
}

/* Driver function for the game */

function main() {
  console.log("Game started , main ()...");
  if (machineSequence.length > 0 /* empty sequence if it has contents */)
    machineSequence = [];
  if (humanSequence.length > 0) humanSequence = [];
  count = 0;
  document.querySelector(".count").innerHTML = "0"; //reset the count
  next(machineSequence);

  btnClicked = document.querySelector(".game");
  //   console.log("btnClicked" + btnClicked.id);
  btnClicked.addEventListener("click", function(event) {
    // console.log(
    //   "className: " + event.target.className + " Id " + event.target.id
    // );
    if (event.target.className === "child") {
      humanSequence.push(event.target.id);
      humanPlay(event.target.id); /* flush and play music */

      //   console.log("event.target.id " + event.target.id);
      //   console.log("After loggin id");
      //   console.log("human Sequence" + humanSequence);
      //only compare if there are equal number of elements in human and machine sequence
      if (humanSequence.length == machineSequence.length) {
        if (compare()) {
          humanSequence = [];
          next(machineSequence);
        } else {
          console.log("error, aborting...");
          return;
        }
      }
      //   else {
      //     // console.log("machine sequence if all fails: " + machineSequence);
      //     machinePlay(machineSequence);
      //     btnClicked = document.querySelector(".game");
      //     btnClicked.addEventListener("click", function(event) {
      //       if (event.target.className === "child") {
      //         humanSequence.push(event.target.id);
      //         humanPlay(event.target.id); /* flush and play music */

      //         // console.log("second btn clicked.target.id " + event.target.id);
      //         // console.log("After loggin id");
      //       }
      //     });
      // return;
      //   }
    }
  });
}

//compare sequence and check if player won
function compare() {
  //   console.log("human sequence: " + humanSequence);
  //   console.log("machineSequence:" + machineSequence);
  if (compareSequence(machineSequence)) {
    count++;
    document.querySelector(".count").innerHTML = count;

    if (checkIfWon(count)) {
      alert("You won!");
    }

    // alert("you're winning");
  } else if (!compareSequence(machineSequence)) {
    document.querySelector("#youLost").innerHTML =
      "You pressed the wrong button. Try again!";

    return false;
  }
  //   console.log("Finally, you won!");

  return true;
}

/**
 * pick random color, push it to seqArr , then play (seqArr)
 */
function next(sequence) {
  let colors = ["red", "green", "blue", "yellow"],
    randomColor = colors[Math.floor(Math.random() * 4)];

  sequence.push(randomColor);
  console.log("inside next: sequence: " + sequence.toString());
  machinePlay(sequence);
}

/* flash an element and play music */
function flashElement(element, buttonName) {
  console.log("button: ", buttonName);
  //   element.style.backgroundColor = "white";
  //   element.style.backgroundColor = element.id;
  // element.classList.add(buttonName);
  // setTimeout(function() {  // internal setTimeout is making this take too long and async
  //     element.classList.remove(buttonName);}, 500);   // adjust to 500 to
}

/* play the human sequence */
function humanPlay(color) {
  let colorId = "#" + color;
  let music;
  let element = document.querySelector(colorId);
  if (color == "green") {
    flashElement(element, "buttonGreen");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    //music.play();
  } else if (color == "yellow") {
    flashElement(element, "buttonYellow");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    //music.play();
  } else if (color == "blue") {
    flashElement(element, "buttonBlue");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    // music.play();
  } else if (color == "red") {
    flashElement(element, "buttonRed");
    music = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    //music.play();
  }

  music.play();
}

function playStrictDriver() {
  document.querySelector("#strict").addEventListener("click", playStrict);
}

function playStrict() {
  restart();
  var strictBtn = document.querySelector(".game");
  document.querySelector(".count").innerHTML = "0";
  count = 0;

  strictBtn.addEventListener("click", function(event) {
    // console.log(
    //   "className: " + event.target.className + " Id " + event.target.id
    // );
    if (event.target.className === "child") {
      humanSequence.push(event.target.id);
      humanPlay(event.target.id); /* flush and play music */

      //only compare if there are equal number of elements in human and machine sequence
      if (humanSequence.length == machineSequence.length) {
        if (compare()) {
          humanSequence = [];
          next(machineSequence);
        }
      } else {
        // console.log(
        //   "You pressed the wrong button. Game will restart. " + machineSequence
        // );
        next(machineSequence);
      }
    }
  });
}
/**
 * loop through the machine Sequence 
 * for each color playSound(color) and flash()
 * 
 */
function machinePlay(sequence) {
  let audio = {
    blue: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    green: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };
  for (let i = 0; i < sequence.length; i++) {
    let element;
    let colorID = "#" + sequence[i];
    element = document.querySelector(colorID);
    if (sequence[i] == "green") {
      flashElement(element, "buttonGreen");
      let music = new Audio(audio[i]);
      music.play();
    } else if (sequence[i] == "blue") {
      flashElement(element, "buttonBlue");
      let music = new Audio(audio[i]);
      music.play();
    } else if (sequence[i] == "yellow") {
      flashElement(element, "buttonYellow");
      let music = new Audio(audio[i]);
      music.play();
    } else {
      flashElement(element, "buttonRed");
      let music = new Audio(audio[i]);
      music.play();
    }
  }
}

/* Compare human sequence and machine sequence for maching button presses */
function compareSequence() {
  for (let i = 0; i < machineSequence.length; i++) {
    if (machineSequence[i] != humanSequence[i]) {
      return false;
    } else {
      humanPlay(humanSequence[i]);
    }
  }
  return true;
}

function restart() {
  humanSequence = machineSequence = [];
  count = 0;
}

/* Initialize arrays so they are all empty in preparation for next sequence */
function initArrays(humanSeq, machineSeq) {
  machineSeq = humanSeq = [];
}

function checkIfWon(count) {
  return count === 20;
}

function playPiece(audio) {
  return new Promise((resolve, reject) => {
    const piece = new Audio(audio);
    piece.play();
    piece.addEventListener("ended", () => resolve());
  });
}
