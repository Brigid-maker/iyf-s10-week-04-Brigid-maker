let current = '0';
let previous = null;
let operator = null;

const result = document.getElementById("result");
const expression = document.getElementById("expression");

function updateDisplay() {
  result.textContent = current;
  if (operator && previous !== null) {
    expression.textContent = `${previous} ${operator}`;
  } else {
    expression.textContent = '';
  }
}

function calculate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b === 0 ? 'ERROR' : a / b;
  if (op === '%') return a % b;
  if (op === '**') return a ** b;
}

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.action === "delete") {
  if (current.length > 1) {
    current = current.slice(0, -1);
  } else {
    current = '0';
  }
}

    if (btn.dataset.num) {
      current = current === '0' ? btn.dataset.num : current + btn.dataset.num;
    }

    if (btn.dataset.action === "decimal") {
      if (!current.includes(".")) current += ".";
    }

    if (btn.dataset.action === "clear") {
      current = '0';
      previous = null;
      operator = null;
    }

    if (btn.dataset.action === "sign") {
      current = current.startsWith('-') ? current.slice(1) : '-' + current;
    }

    if (btn.dataset.op) {
      previous = current;
      operator = btn.dataset.op;
      current = '0';
    }

    if (btn.dataset.action === "equals") {
      if (operator && previous !== null) {
        current = String(calculate(previous, operator, current));
        operator = null;
        previous = null;
      }
    }

    updateDisplay();
  });
});

updateDisplay();