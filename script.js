const STORAGE_KEY = "studentExpenseTracker.expenses";
let expenses = loadExpenses();

function loadExpenses() {
    try {
        const savedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(savedExpenses) ? savedExpenses : [];
    } catch {
        return [];
    }
}

function saveExpenses() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function renderExpenses() {
    const list = document.getElementById("expenseList");
    const totalElement = document.getElementById("total");

    list.innerHTML = "";

    let total = 0;
    expenses.forEach((expense) => {
        const item = document.createElement("li");
        item.textContent = expense.name + " - ₹" + expense.amount;
        list.appendChild(item);
        total += expense.amount;
    });

    totalElement.textContent = total;
}

function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("expenseAmount").value);

    if (name === "" || amount <= 0) {
        alert("Please enter a valid expense!");
        return;
    }

    expenses.push({ name, amount });
    saveExpenses();
    renderExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

renderExpenses();
