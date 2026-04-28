// ─────────────────────────────────────────────
// CORE OPERATIONS
// ─────────────────────────────────────────────
function calculate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (!isFinite(a) || !isFinite(b)) return 'ERROR';

  switch (op) {
    case '+':  return a + b;
    case '-':  return a - b;
    case '*':  return a * b;
    case '/':  return b === 0 ? 'ERROR' : a / b;
    case '%':  return b === 0 ? 'ERROR' : a % b; // modulus
    case '**': return a ** b;
    default:   return 'ERROR';
  }
}

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
const state = {
  current: '0',
  previous: null,
  operator: null,
  waitingNext: false,
  justEvaluated: false,
};

// ─────────────────────────────────────────────
// DOM
// ─────────────────────────────────────────────
const $result = document.getElementById('result');
const $expression = document.getElementById('expression');

// ─────────────────────────────────────────────
// DISPLAY
// ─────────────────────────────────────────────
function render() {
  $result.textContent = state.current;

  if (state.operator && state.previous !== null) {
    $expression.textContent = `${state.previous} ${state.operator}`;
  } else {
    $expression.textContent = '';
  }
}

// ─────────────────────────────────────────────
// INPUT HANDLERS
// ─────────────────────────────────────────────
function inputNumber(num) {
  if (state.current === 'ERROR') return clearAll();

  if (state.waitingNext || state.justEvaluated) {
    state.current = num;
    state.waitingNext = false;
    state.justEvaluated = false;
  } else {
    state.current = state.current === '0' ? num : state.current + num;
  }
}

function inputDecimal() {
  if (state.current === 'ERROR') return clearAll();

  if (state.waitingNext || state.justEvaluated) {
    state.current = '0.';
    state.waitingNext = false;
    state.justEvaluated = false;
    return;
  }

  if (!state.current.includes('.')) {
    state.current += '.';
  }
}

function handleOperator(op) {
  if (state.current === 'ERROR') return;

  if (state.operator && !state.waitingNext) {
    const result = calculate(state.previous, state.operator, state.current);
    if (result === 'ERROR') return showError();

    state.previous = String(result);
    state.current = '0';
  } else {
    state.previous = state.current;
  }

  state.operator = op;
  state.waitingNext = true;
  state.justEvaluated = false;
}

function handleEquals() {
  if (!state.operator || state.previous === null) return;

  const op = state.operator;
  const result = calculate(state.previous, op, state.current);

  if (result === 'ERROR') return showError();

  // FIXED: correct expression display
  $expression.textContent = `${state.previous} ${op} ${state.current} =`;

  state.current = String(result);
  state.previous = null;
  state.operator = null;
  state.justEvaluated = true;
  state.waitingNext = false;
}

function toggleSign() {
  if (state.current === 'ERROR') return;

  if (state.current.startsWith('-')) {
    state.current = state.current.slice(1);
  } else if (state.current !== '0') {
    state.current = '-' + state.current;
  }
}

function deleteLast() {
  if (state.current === 'ERROR') return clearAll();
  if (state.justEvaluated) return;

  if (state.current.length > 1) {
    state.current = state.current.slice(0, -1);
  } else {
    state.current = '0';
  }
}

function clearAll() {
  state.current = '0';
  state.previous = null;
  state.operator = null;
  state.waitingNext = false;
  state.justEvaluated = false;
}

// ─────────────────────────────────────────────
// ERROR HANDLING
// ─────────────────────────────────────────────
function showError() {
  state.current = 'ERROR';
  state.previous = null;
  state.operator = null;
  state.waitingNext = false;
  state.justEvaluated = false;
}

// ─────────────────────────────────────────────
// EVENT BINDING
// ─────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {

    if (btn.dataset.num !== undefined) {
      inputNumber(btn.dataset.num);
    }

    if (btn.dataset.op !== undefined) {
      handleOperator(btn.dataset.op);
    }

    if (btn.dataset.action) {
      switch (btn.dataset.action) {
        case 'decimal': inputDecimal(); break;
        case 'clear': clearAll(); break;
        case 'delete': deleteLast(); break;
        case 'sign': toggleSign(); break;
        case 'equals': handleEquals(); break;
      }
    }

    render();
  });
});

// ─────────────────────────────────────────────
// KEYBOARD SUPPORT
// ─────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const key = e.key;

  if (key >= '0' && key <= '9') inputNumber(key);
  if (key === '.') inputDecimal();

  if (key === '+') handleOperator('+');
  if (key === '-') handleOperator('-');
  if (key === '*') handleOperator('*');
  if (key === '/') handleOperator('/');
  if (key === '%') handleOperator('%');
  if (key === '^') handleOperator('**');

  if (key === 'Enter' || key === '=') handleEquals();
  if (key === 'Backspace') deleteLast();
  if (key === 'Escape') clearAll();

  render();
});

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
render();