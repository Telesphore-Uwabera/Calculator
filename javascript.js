function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    if (b === 0) {
      return "ERROR: Division by zero";
    }
    return a / b;
  }

  function operate(operator, a, b) {
    switch (operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "*":
        return multiply(a, b);
      case "/":
        return divide(a, b);
      default:
        return "ERROR: Invalid operator";
    }
  }

  let firstNumber = null;
  let operator = null;
  let secondNumber = null;

  function updateDisplay(value) {
    const display = document.querySelector(".display");
    display.textContent = value;
  }

  function handleNumberClick(clickedNumber) {
    const displayValue = document.querySelector(".display").textContent;

    if (displayValue === "0" || operator === "=") {
      updateDisplay(clickedNumber);
    } else {
      updateDisplay(displayValue + clickedNumber);
    }
  }

  function handleOperatorClick(clickedOperator) {
    const displayValue = document.querySelector(".display").textContent;
    const currentNumber = parseFloat(displayValue);

    if (firstNumber !== null && operator) {
      const result = operate(operator, firstNumber, currentNumber);
      updateDisplay(roundResult(result));

      firstNumber = result;
    } else {
      firstNumber = currentNumber;
    }

    operator = clickedOperator;
  }

  function handleEqualsClick() {
    const displayValue = document.querySelector(".display").textContent;
    const currentNumber = parseFloat(displayValue);

    if (firstNumber !== null && operator) {
      // Perform the final calculation and update the display
      const result = operate(operator, firstNumber, currentNumber);

      if (operator === "/" && currentNumber === 0) {
        updateDisplay("ERROR: Division by zero");
      } else {
        updateDisplay(roundResult(result));
      }
      operator = null;
      secondNumber = null;
    }
  }

  function handleClearClick() {
    // Clear the calculator data and reset the display
    firstNumber = null;
    operator = null;
    updateDisplay(0);
  }
  function handleBackspaceClick() {
    const displayValue = document.querySelector(".display").textContent;
    const updatedDisplayValue = displayValue.slice(0, -1);

    updateDisplay(updatedDisplayValue);
  }

  function handleDecimalClick() {
    const displayValue = document.querySelector(".display").textContent;

    if (!displayValue.includes(".")) {
      updateDisplay(displayValue + ".");
    }
  }
  function roundResult(result) {
    const decimalPlaces = 5; // Set the number of decimal places you want to display
    return +result.toFixed(decimalPlaces);
  }

  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedNumber = button.dataset.value;
      handleNumberClick(clickedNumber);
    });
  });

  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedOperator = button.dataset.value;
      handleOperatorClick(clickedOperator);
    });
  });
  const equalsButton = document.getElementById("equals");
  equalsButton.addEventListener("click", handleEqualsClick);

  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", handleClearClick);

  const backspaceButton = document.getElementById("backspace");
  backspaceButton.addEventListener("click", handleBackspaceClick);

  const decimalButton = document.getElementById("decimal");
  decimalButton.addEventListener("click", handleDecimalClick);
  
