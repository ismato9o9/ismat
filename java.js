const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';
let previousInput = '';
let operator = '';

keys.addEventListener('click', function(event) {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            calculate();
            break;
        case 'clear':
            clear();
            break;
        case '.':
            if (!currentInput.includes('.')) {
                currentInput += value;
            }
            updateScreen(currentInput);
            break;
        default:
            if (currentInput.length < 12) {
                currentInput += value;
                updateScreen(currentInput);
            }
    }
});

function handleOperator(nextOperator) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        calculate();
    }

    operator = nextOperator;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateScreen(currentInput);
}

function updateScreen(input) {
    screen.value = input;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateScreen('0');
}
