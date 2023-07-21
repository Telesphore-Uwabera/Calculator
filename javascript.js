// Basic math functions
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

  // Function to operate on two numbers based on the operator
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

  // Variables to store calculator operation data
  let firstNumber = null;
  let operator = null;
  let secondNumber = null;

  // Function to update the display
  function updateDisplay(value) {
    const display = document.querySelector(".display");
    display.textContent = value;
  }

  // Function to handle number button clicks
  function handleNumberClick(clickedNumber) {
    const displayValue = document.querySelector(".display").textContent;

    // Handle case when display is "0" or when an operator was just clicked
    if (displayValue === "0" || operator === "=") {
      updateDisplay(clickedNumber);
    } else {
      updateDisplay(displayValue + clickedNumber);
    }
  }

  // Function to handle operator button clicks
  function handleOperatorClick(clickedOperator) {
    const displayValue = document.querySelector(".display").textContent;
    const currentNumber = parseFloat(displayValue);

    // Check if there is a pending calculation with a firstNumber and operator
    if (secondNumber !== null && operator) {
      // Perform the previous calculation and update the display
      const result = operate(operator, firstNumber, currentNumber);
      updateDisplay(roundResult(result));

      // Store the result as the new first number for potential further calculations
      firstNumber = result;
    } else {
      // If there is no pending calculation, set the current number as the first number
      firstNumber = currentNumber;
    }

    // Store the clicked operator
    operator = clickedOperator;
  }

  // Function to handle the equals button click
  function handleEqualsClick() {
    const displayValue = document.querySelector(".display").textContent;
    const currentNumber = parseFloat(displayValue);

    // Check if there is a pending calculation with a firstNumber and operator
    if (firstNumber !== null && operator) {
      // Perform the final calculation and update the display
      const result = operate(operator, firstNumber, currentNumber);

      // Check for division by zero
      if (operator === "/" && currentNumber === 0) {
        updateDisplay("ERROR: Division by zero");
      } else {
        updateDisplay(roundResult(result));
      }

      // Reset the operator and secondNumber variables for future calculations
      operator = null;
      secondNumber = null;
    }
  }

  // Function to handle the clear button click
  function handleClearClick() {
    // Clear the calculator data and reset the display
    firstNumber = null;
    operator = null;
    updateDisplay(0);
  }

  // Function to handle the backspace button click
  function handleBackspaceClick() {
    const displayValue = document.querySelector(".display").textContent;
    const updatedDisplayValue = displayValue.slice(0, -1);

    // Update the display with the new value after backspace
    updateDisplay(updatedDisplayValue);
  }

  // Function to handle the decimal button click
  function handleDecimalClick() {
    const displayValue = document.querySelector(".display").textContent;

    // Check if there is already a decimal in the display value
    if (!displayValue.includes(".")) {
      updateDisplay(displayValue + ".");
    }
  }

  // Function to round the result with long decimals
  function roundResult(result) {
    const decimalPlaces = 5; // Set the number of decimal places you want to display
    return +result.toFixed(decimalPlaces);
  }

  // Add event listeners for number buttons
  const numberButtons = document.querySelectorAll(".number");
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedNumber = button.dataset.value;
      handleNumberClick(clickedNumber);
    });
  });

  // Add event listeners for operator buttons
  const operatorButtons = document.querySelectorAll(".operator");
  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const clickedOperator = button.dataset.value;
      handleOperatorClick(clickedOperator);
    });
  });

  // Add event listener for the equals button
  const equalsButton = document.getElementById("equals");
  equalsButton.addEventListener("click", handleEqualsClick);

  // Add event listener for the clear button
  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", handleClearClick);

  // Add event listener for the backspace button
  const backspaceButton = document.getElementById("backspace");
  backspaceButton.addEventListener("click", handleBackspaceClick);

  // Add event listener for the decimal button
  const decimalButton = document.getElementById("decimal");
  decimalButton.addEventListener("click", handleDecimalClick);
  