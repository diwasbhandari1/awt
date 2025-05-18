const display = document.getElementById('current');
const keypad = document.querySelector('.keypad');

let currentNumber = '0';
let previousNumber = null;
let operator = null;

const updateDisplay = () => {
  display.textContent = currentNumber;
};

const inputNumber = (number) => {
  if (currentNumber === '0') {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
  updateDisplay();
};

const inputDecimal = () => {
  if (!currentNumber.includes(',')) {
    currentNumber += ',';
    updateDisplay();
  }
};

const handleOperator = (op) => {
  if (operator && previousNumber !== null) {
    calculate();
  }
  previousNumber = currentNumber;
  operator = op;
  currentNumber = '0';
};

const calculate = () => {
  let result;
  const prev = parseFloat(previousNumber.replace(',', '.'));
  const current = parseFloat(currentNumber.replace(',', '.'));

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case 'add':
      result = prev + current;
      break;
    case 'subtract':
      result = prev - current;
      break;
    case 'multiply':
      result = prev * current;
      break;
    case 'divide':
      result = prev / current;
      break;
    case 'percent':
      result = current / 100;
      currentNumber = result.toString().replace('.', ','); // Update currentNumber for display
      operator = null;
      previousNumber = null;
      updateDisplay();
      return;
    default:
      return;
  }

  currentNumber = result.toString().replace('.', ',');
  operator = null;
  previousNumber = null;
  updateDisplay();
};

const clearAll = () => {
  currentNumber = '0';
  previousNumber = null;
  operator = null;
  updateDisplay();
};

const clearEntry = () => {
  currentNumber = '0';
  updateDisplay();
};

const changeSign = () => {
  currentNumber = (parseFloat(currentNumber.replace(',', '.')) * -1).toString().replace('.', ',');
  updateDisplay();
};

keypad.addEventListener('click', (event) => {
  const target = event.target;

  if (target.dataset.number) {
    inputNumber(target.dataset.number);
  } else if (target.dataset.action === 'decimal') {
    inputDecimal();
  } else if (target.dataset.action === 'add' ||
             target.dataset.action === 'subtract' ||
             target.dataset.action === 'multiply' ||
             target.dataset.action === 'divide' ||
             target.dataset.action === 'percent') {
    handleOperator(target.dataset.action);
  } else if (target.dataset.action === 'calculate') {
    calculate();
  } else if (target.dataset.action === 'clear') {
    clearAll();
  } else if (target.dataset.action === 'clear-entry') {
    clearEntry();
  } else if (target.dataset.action === 'sign') {
    changeSign();
  }
});

updateDisplay(); // Initial display update



