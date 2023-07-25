let currentOperation = '';
let currentResult = '';
let currentOperator = '';

function updateDisplay(button) {
  const value = button.innerText;
  currentOperation += value;
  updateScreen();
}

function updateScreen() {
  const screenOperation = document.querySelector('.operation h1');
  screenOperation.textContent = currentOperation;
}

function showResults() {
  const screenResult = document.querySelector('.result');
  screenResult.textContent = currentResult;
}

function calculate() {
  currentResult = eval(currentOperation);
  currentOperation = currentResult.toString();
  showResults();
}

function clearDisplay() {
  currentOperation = '';
  currentResult = '';
  updateScreen();
  showResults();
}

function setOperator(button) {
  currentOperator = button.innerText;
  currentOperation += currentOperator;
  updateScreen();
}

function backspace() {
  currentOperation = currentOperation.slice(0, -1);
  updateScreen();
}

// Add event listeners to the number buttons and operator buttons
const numberButtons = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator');

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    updateDisplay(button);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setOperator(button);
  });
});

// Add event listener to the equals button (=) to calculate the result
const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', () => {
  calculate();
});

// Add event listener to the clear button (C) to clear the display
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  clearDisplay();
});

// Add event listener to the backspace button (⌫) to remove the last character
const backspaceButton = document.getElementById('backspace');
backspaceButton.addEventListener('click', () => {
  backspace();
});
