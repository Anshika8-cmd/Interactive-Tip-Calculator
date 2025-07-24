// ===========================================
//           DOM Element Selection
// ===========================================
const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.tip-percent-btn');
const customTipInput = document.getElementById('custom-tip-input');
const peopleInput = document.getElementById('people-input');
const tipAmountDisplay = document.getElementById('tip-amount-display');
const totalAmountDisplay = document.getElementById('total-amount-display');
const resetButton = document.getElementById('reset-button');

// ===========================================
//           Event Listeners
// ===========================================

billInput.addEventListener('input', calculateTip);
customTipInput.addEventListener('input', () => {
  // Deselect active buttons when typing custom tip
  tipButtons.forEach(btn => btn.classList.remove('active'));
  calculateTip();
});

tipButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Remove active from all, add to clicked one
    tipButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Clear custom input
    customTipInput.value = '';
    calculateTip();
  });
});

peopleInput.addEventListener('input', calculateTip);

// Reset Button
resetButton.addEventListener('click', resetCalculator);

// ===========================================
//           Core Functions
// ===========================================

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  const customTip = parseFloat(customTipInput.value);

  let tipPercent = 0;

  if (!isNaN(customTip)) {
    tipPercent = customTip;
  } else {
    const activeButton = document.querySelector('.tip-percent-btn.active');
    if (activeButton) {
      tipPercent = parseFloat(activeButton.dataset.tip);
    }
  }

  // Validation
  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0 || isNaN(tipPercent)) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    return;
  }

  const tipAmount = (bill * tipPercent) / 100;
  const totalBill = bill + tipAmount;

  const tipPerPerson = tipAmount / people;
  const totalPerPerson = totalBill / people;

  tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function resetCalculator() {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';
  tipButtons.forEach(btn => btn.classList.remove('active'));
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  console.log('Calculator reset.');
}
