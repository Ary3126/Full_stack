const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let current = '';

function updateDisplay() {
  display.textContent = current || '0';
}

function pushValue(val) {
  // Prevent multiple decimals in a number segment
  if (val === '.') {
    const parts = current.split(/[^0-9.]/);
    const last = parts[parts.length-1];
    if (last.includes('.')) return;
  }
  current += val;
  updateDisplay();
}

function clearAll() {
  current = '';
  updateDisplay();
}

function backspace() {
  current = current.slice(0, -1);
  updateDisplay();
}

function safeEval(expr) {
  // Allow only digits, operators, parentheses, decimal and percent
  if (!/^[0-9+\-*/().%\s]+$/.test(expr)) throw new Error('Invalid characters');
  // Replace unicode operators if present
  expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  // Convert percent: replace "number%" with (number/100)
  expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
  // Use Function to evaluate safely in strict mode
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${expr})`)();
}

function calculate() {
  if (!current) return;
  try {
    const result = safeEval(current);
    current = String(result);
    updateDisplay();
  } catch (e) {
    display.textContent = 'Error';
    setTimeout(updateDisplay, 800);
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');
    if (action === 'clear') return clearAll();
    if (action === 'back') return backspace();
    if (action === 'equals') return calculate();
    if (val) return pushValue(val);
  });
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); calculate(); return; }
  if (e.key === 'Backspace') { backspace(); return; }
  if (e.key === 'Escape') { clearAll(); return; }
  const allowed = '0123456789+-*/().%';
  if (allowed.includes(e.key)) {
    pushValue(e.key);
  }
});

// Initialize
updateDisplay();
