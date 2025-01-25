const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = [];

// Update UI
function updateUI() {
  const amounts = transactions.map(t => t.amount);
  const totalBalance = amounts.reduce((acc, amt) => acc + amt, 0).toFixed(2);
  const totalIncome = amounts.filter(amt => amt > 0).reduce((acc, amt) => acc + amt, 0).toFixed(2);
  const totalExpense = (amounts.filter(amt => amt < 0).reduce((acc, amt) => acc + amt, 0) * -1).toFixed(2);

  balance.textContent = `$${totalBalance}`;
  income.textContent = `$${totalIncome}`;
  expense.textContent = `$${totalExpense}`;

  transactionList.innerHTML = '';
  transactions.forEach(transaction => addTransactionDOM(transaction));
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
  const li = document.createElement('li');
  li.classList.add(transaction.amount > 0 ? 'income' : 'expense');
  li.innerHTML = `
    ${transaction.description} <span>${transaction.amount > 0 ? '+' : ''}$${transaction.amount}</span>
    <button onclick="deleteTransaction(${transaction.id})">x</button>
  `;
  transactionList.appendChild(li);
}

// Add new transaction
function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (description.trim() === '' || isNaN(amount)) {
    alert('Please enter a valid description and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount
  };

  transactions.push(transaction);
  updateUI();
  descriptionInput.value = '';
  amountInput.value = '';
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}

// Event Listeners
transactionForm.addEventListener('submit', addTransaction);

