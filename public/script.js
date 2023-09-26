// script.js
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    let expenses = [];

    // Event listener for form submission
    expenseForm.addEventListener('submit', addExpense);

    // Add Expense function
    function addExpense(e) {
        e.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        if (!description || isNaN(amount) || !date) {
            alert('Please fill in all fields with valid data');
            return;
        }

        const expenseItem = {
            id: Date.now(),
            description,
            amount,
            date
        };

        expenses.push(expenseItem);
        updateExpenseList();
        
        // Clear form inputs
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').value = '';
    }

    // Delete Expense function
    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        updateExpenseList();
    }

    // Edit Expense function
    function editExpense(id) {
        const expenseToEdit = expenses.find(expense => expense.id === id);
        if (expenseToEdit) {
            // Populate form fields with the expense data
            document.getElementById('description').value = expenseToEdit.description;
            document.getElementById('amount').value = expenseToEdit.amount.toFixed(2);
            document.getElementById('date').value = expenseToEdit.date;

            // Remove the expense from the list
            expenses = expenses.filter(expense => expense.id !== id);
            updateExpenseList();
        }
    }

    // Update the Expense List UI
    function updateExpenseList() {
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `
                ${expense.description} - $${expense.amount.toFixed(2)} - ${expense.date}
                <button class="edit-btn" data-id="${expense.id}">Edit</button>
                <button class="delete-btn" data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
        });

        // Add event listeners for delete and edit buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.getAttribute('data-id'));
                deleteExpense(id);
            });
        });

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.getAttribute('data-id'));
                editExpense(id);
            });
        });
    }
});
