// use parser of mathjs or do my own or just do eval (no issues since global variables are not accessible in final bundle)?
// const math = require('mathjs-expression-parser');

/** State for keeping up with everything,  */
let expression = '',
  answer = '';

/** view for Dom and visual elements  */
const view = {
  inputScreen: document.querySelector('.inputScreenResult'),
  inputScreenHistory: document.querySelector('.inputScreenHistory'),
  keypad: document.querySelector('.keypad'),
};

window.onload = function() {
  setupListeners();
  updateScreen();
  updateScreenHistory();
};

function setupListeners() {
  document.addEventListener('keydown', e => {
    if (/[*/+-]/.test(e.key)) {
      handleSignInput(e.key);
    } else if (/[0-9]/.test(e.key)) {
      handleDigitInput(e.key);
    } else if (e.key === 'Enter') {
      processExpression(expression);
    } else if (e.key === 'Backspace' && expression) {
      const inputArr = expression.split('');
      inputArr.pop();
      expression = inputArr.join('');
      // updateScreen(expression);
      updateScreenHistory(expression);
    }
  });

  view.keypad.addEventListener('click', function(ev) {
    ev.preventDefault();
    const target = ev.target;
    const value = ev.target.value;
    switch (target.className) {
      case 'digit':
        handleDigitInput(value);
        break;
      case 'sign':
        handleSignInput(value);
        break;
      case 'equal':
        processExpression(expression);
        break;
      case 'AC':
        clearAll();
        break;
      default:
        break;
    }
  });
}

/** Handles a digit input in operation */
function handleDigitInput(digit) {
  // reset expression and answer if this digit is first in expression
  if (answer) answer = expression = '';
  let lastNumber = expression.split(/[*+/-]/).pop();
  // skip if incoming is a comma & num already has one
  if (digit === '.' && /\./.test(lastNumber)) return;
  expression += digit;
  lastNumber += digit;
  updateScreen(lastNumber);
  updateScreenHistory(expression);
  logInput();
}

/** Handles the input of a sign  */
function handleSignInput(newSign) {
  if (answer) {
    // use existing answer if any
    expression = String(answer);
    answer = '';
  }
  const lastTokenIdx = expression.length - 1;
  const lastInExpression = expression.charAt(lastTokenIdx);
  if (!isLastInExpressionASign(expression)) {
    expression += newSign;
  } else if (lastInExpression !== newSign) {
    // if new sign is different than last one in expression, replace it
    const exprArr = expression.split('');
    exprArr.splice(lastTokenIdx, 1, newSign);
    expression = exprArr.join('');
  }
  // show multiplication as x rather than *
  let operand = newSign;
  if (newSign === '*') operand = 'x';
  updateScreen(operand);
  updateScreenHistory(expression);
}

function isLastInExpressionASign(expression) {
  const lastTokenIdx = expression.length - 1;
  const lastInExpression = expression.charAt(lastTokenIdx);
  return /[*/+-]/.test(lastInExpression);
}

/**
 * processes input => result
 */
function processExpression() {
  if (expression && isLastInExpressionASign(expression)) {
    warn('Finish expression!');
    return;
  }
  if (expression && /[*/+-]/.test(expression.charAt(0))) {
    warn('Remove sign at the start!');
    return;
  }
  answer = expression ? eval(expression) : 0;
  if (!Number.isInteger(answer)) answer = Number(answer).toFixed(2);
  updateScreen(answer);
  updateScreenHistory(answer);
  // expression = '';
}

/** Clears all */
function clearAll() {
  expression = answer = '';
  updateScreen();
  updateScreenHistory();
}

/** Updates screenInput */
function updateScreen(info = 0) {
  let { inputScreen, inputScreen: { style } } = view;
  inputScreen.classList.remove('warning');
  view.inputScreen.textContent = info;
}

/** Updates the operand sign on screen */
function updateScreenHistory(info = 0) {
  view.inputScreenHistory.textContent = info;
}
function warn(warning) {
  let { inputScreen, inputScreen: { style } } = view;
  inputScreen.classList.add('warning');
  inputScreen.textContent = warning;
}

function logInput() {
  console.log(JSON.stringify({ expression, answer }, null, 1));
}

// ========= Custom Parser ===========================
/** My own parser for arithmetic simple operations */
function calculateExpression(expression) {
  const operationsObj = {
    '*': function multiply(a, b) {
      return a * b;
    },
    '/': function divide(a, b) {
      return a / b;
    },
    '+': function add(a, b) {
      return a + b;
    },
    '-': function substract(a, b) {
      return a - b;
    },
  };

  const expArr = expression.split(/([/+*-])/);
  console.log('expression array in parser :', expArr);
  const opsArr = ['*', '/', '+', '-']; // order with preceding priority

  // loop through operands
  opsArr.forEach((operand, opIdx) => {
    // look up signs
    expArr.forEach((token, tokenIdx) => {
      if (operand === token) {
        // calculate op around sign
        const a = expArr[tokenIdx - 1];
        const b = expArr[tokenIdx + 1];
        const result = operationsObj[operand](Number(a), Number(b));
        expArr[tokenIdx - 1] = result; // swap result with left number
        expArr.splice(tokenIdx, 2); // delete sign and right number
      }
    });
  });

  return expArr[0]; // at the end only result is left in array .
}
