const balanceDisplay = document.getElementById('net-balance');
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');
const list = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const typeInput = document.getElementById('type');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');

const savedData = localStorage.getItem('transactions');
let transactions = savedData ? JSON.parse(savedData) : [];

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function render() {
    list.innerHTML = '';
    
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction, index) => {
        const amount = Number(transaction.amount);

        if (transaction.type === 'income') {
            totalIncome += amount;
        } else {
            totalExpense += amount;
        }

        const li = document.createElement('li');
        
        if (transaction.type === 'income') {
            li.classList.add('plus');
        } else {
            li.classList.add('minus');
        }

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong> <br>
                <small>${transaction.category}</small>
            </div>
            <div>
                ₹${amount}
                <button class="delete-btn" onclick="deleteItem(${index})">X</button>
            </div>
        `;
        
        li.addEventListener('dblclick', () => {
             editItem(index);
        });

        list.appendChild(li);
    });

    incomeDisplay.innerText = `₹${totalIncome}`;
    expenseDisplay.innerText = `₹${totalExpense}`;
    balanceDisplay.innerText = `₹${totalIncome - totalExpense}`;
}

function addTransaction(e) {
    e.preventDefault();

    if (descInput.value === '' || amountInput.value === '') {
        alert('Please enter details');
        return;
    }

    const newTransaction = {
        type: typeInput.value,
        description: descInput.value,
        amount: amountInput.value,
        category: categoryInput.value
    };

    transactions.push(newTransaction);
    saveTransactions();
    render();
    
    descInput.value = '';
    amountInput.value = '';
}

function deleteItem(index) {
    transactions.splice(index, 1);
    saveTransactions();
    render();
}

function editItem(index) {
    const item = transactions[index];
    
    descInput.value = item.description;
    amountInput.value = item.amount;
    categoryInput.value = item.category;
    typeInput.value = item.type;

    deleteItem(index); 
}

form.addEventListener('submit', addTransaction);

render();