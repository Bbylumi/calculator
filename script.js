const clickSound = new Audio('click-sound.mp3');
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => clickSound.play());
});

const display = document.querySelector("#display");

const buttons = document.querySelectorAll("button");
console.log(display, buttons);

let currentInput = "0",
  previousInput = "",
  operator = "",
  resultDisplay = false;

//   eventlistener to all button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;
    console.log(value);

    //handl number issuse
    if (!isNaN(value) || value === ".") {
      if (resultDisplay) {
        currentInput = value;
        resultDisplay = false;
      } else {
        currentInput = currentInput === "0" ? value : currentInput + value;
      }
      updateDisplay(currentInput);
      return;
    }
    //clear button
    if (value === "C") {
      currentInput = "0";
      previousInput = "";
      operator = "";
      resultDisplay = "";
      updateDisplay("0");
      return;
    }

    //handle backspace
    if (value === "←") {
      currentInput = currentInput.slice(0, -1) || 0;
      updateDisplay(currentInput);
      return;
    }

    // handle sign change
    if (value === "±") {
      currentInput = parseFloat(currentInput * -1).toString();
      updateDisplay(currentInput);
      return;
    }

    // math operations
    if (["/", "*", "+", "-", "^"].includes(value)) {
      if (resultDisplay) {
        previousInput = display.value;
        resultDisplay = false;
      } else {
        if (currentInput) {
          previousInput = previousInput ? calculate().toString() : currentInput;
        }
      }

      currentInput = "";
      operator = value;
      updateDisplay(previousInput);
      return;
    }

    // handle equal sign
    if (value === "=") {
      if (currentInput && previousInput && operator) {
        const result = calculate();
        updateDisplay(result);
        previousInput = result.toString();
        currentInput = "";
        operator = "";
        resultDisplay = true;
      }
      return;
    }

    // handle scientific keys
    if (
      ["sin", "cos", "log", "tan", "ln", "π", "√", "x²", "e", "exp"].includes(
        value
      )
    ) {
      if (resultDisplay) {
        currentInput = display.value;
        resultDisplay = false;
      }
      const result = scientificOpetation(value);
      currentInput = result.toString();
      updateDisplay(result);
      resultDisplay = true;
      return;
    }

    // handle percentage
    if (value === "%") {
      if (resultDisplay) {
        currentInput = display.value;
        resultDisplay = false;
      }

      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay(currentInput);
      resultDisplay = true;
      return;
    }

    // handle i/x
    if (value === "1/x") {
      if (resultDisplay) {
        currentInput = display.value;
        resultDisplay = false;
      }
      currentInput = (1 / parseFloat(currentInput)).toString();
      updateDisplay(currentInput);
      resultDisplay = true``;
      return;
    }

    // absolute value
    if (resultDisplay) {
      currentInput = display.value;
      resultDisplay = false;
    }


    currentInput = Math.abs(parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
    resultDisplay = true;
    return;
  });
});

//update display function
function updateDisplay(value) {
  display.value = value;
}

//function to perform calc

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) {
    return 0;
  }

  switch (operator) {
    case "+":
      return prev + current;
    case "-":
      return prev - current;
    case "*":
      return prev * current;
    case "/":
      return prev / current;
    case "^":
      return Math.pow(prev, current);

    default:
      return current;
  }
}

//function for scientific operation
function scientificOpetation(value) {
  const current = parseFloat(currentInput);

  if (isNaN(current)) {
    return 0;
  }

  switch (value) {
    case "sin":
      return Math.sin(current * (Math.PI / 180));
    case "cos":
      return Math.cos(current * (Math.PI / 180));
    case "tan":
      return Math.tan(current * (Math.PI / 180));
    case "log":
      return Math.log10(current);
    case "ln":
      return Math.log(current);
    case "√":
      return Math.sqrt(current);

    //comeback
    case "x²":
      return Math.pow(current, 2);
    // comeback

    case "π":
      return Math.PI;

    case "e":
      return Math.E;
    case "exp":
      return Math.exp(current);

    default:
      return current;
  }
}
