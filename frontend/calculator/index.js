/** State for keeping up with everything, view for Dom related stuff */
const state = {
    input: "",
    isFirstPart: true,
    p1: "",
    p2: "",
    sign: "",
    answer: ""
  },
  view = {
    inputScreen: document.querySelector(".inputScreenResult"),
    inputScreenOperand: document.querySelector(".inputScreenOperand"),
    keypad: document.querySelector(".keypad"),
    digits: document.querySelector(".digits")
  };

setupListeners();

function setupListeners() {
  document.addEventListener("keydown", e => {
    // input  sign
    if (/[\+\-*\/]/.test(e.key)) {
      handleSignInput(e.key);
    } else if (/[0-9]/.test(e.key)) {
      // input next digit
      handleDigitInput(e.key);
    } else if (e.key === "Enter") {
      // process operation
      processInput();
    } else if (e.key === "Backspace" && state.input) {
      // delete last digit
      const inputArr = state.input.split("");
      inputArr.pop();
      state.input = inputArr.join("");
      updateScreen(state.input);
    }
  });

  view.keypad.addEventListener("click", function(ev) {
    ev.preventDefault();
    if (ev.target.className === "digit") handleDigitInput(ev.target.value);
    else if (ev.target.className === "sign") handleSignInput(ev.target.value);
    else if (ev.target.className === "equal") processInput();
    else if (ev.target.className === "clear") clearAll();
  });
}

/** Handles a digit input in operation */
function handleDigitInput(digit) {
  if (state.isFirstPart && state.answer) clear("answer");
  state.input += digit;
  populateOperation(state.input);
  updateScreen(state.input);
}

/** Handles the input of a sign  */
function handleSignInput(sign) {
  if (state.isFirstPart) {
    if (state.answer) {
      // use existing answer if any
      state.input = state.answer;
      clear("answer");
      populateOperation(state.input);
    }
    // indicate that the next input is 2nd part of operation
    state.isFirstPart = false;
    clear("input");
  } else {
    processInput();
  }
  state.sign = sign;
  // show multiplication as x rather than *
  let operand = sign;
  if (sign === "*") operand = "x";
  updateScreenOperand(operand);
}

/**
 * processes input 
 * => result
 */
function processInput() {
  const { p1, p2, sign } = state;
  state.isFirstPart = true;
  state.answer = calculate(sign, p1, p2);
  updateScreen(state.answer);
  updateScreenOperand("");
  clear("input");
}

/**
 * Clears passed stateProperty name in string
 */
function clear(stateProperty) {
  state[stateProperty] = "";
}

/** Clears all */
function clearAll() {
  state.input = state.p1 = state.p2 = state.answer = state.sign = "";
  state.isFirstPart = true;
  logInput();
}

/**
 * Populates relevant part of operation depending on the state.isFirstPart property
 */
function populateOperation(input) {
  state.isFirstPart ? (state.p1 = Number(input)) : (state.p2 = Number(input));
}

/** Updates screenInput */
function updateScreen(info) {
  view.inputScreen.textContent = info;
}

/** Updates the operand sign on screen */
function updateScreenOperand(operand) {
  view.inputScreenOperand.textContent = state.p1 + " " + operand;
}

/** Calculates operation , takes (sign, 1st part then 2nd part) */
const calculate = (sign, a, b) => {
  switch (sign) {
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "+":
      return a + b;
    case "-":
      return a - b;

    default:
      break;
  }
};

function logInput() {
  console.log(JSON.stringify(state, null, 1));
}
