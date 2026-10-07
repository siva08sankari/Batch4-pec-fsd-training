let totalExpense = 0;


// Add Expense Function

function addExpense() {

    const income =
        Number(document.getElementById("income").value);

    const expenseName =
        document.getElementById("expenseName").value.trim();

    const expenseAmount =
        Number(document.getElementById("expenseAmount").value);

    const category =
        document.getElementById("category").value;

    const error =
        document.getElementById("error");


    // Validation

    if (income <= 0) {

        error.innerText =
            "Please enter a valid income.";

        return;
    }

    if (expenseName === "") {

        error.innerText =
            "Please enter an expense name.";

        return;
    }

    if (expenseAmount <= 0) {

        error.innerText =
            "Please enter a valid expense amount.";

        return;
    }

    if (category === "") {

        error.innerText =
            "Please select an expense category.";

        return;
    }


    // Add expense

    totalExpense =
        totalExpense + expenseAmount;


    // Create table row

    const table =
        document.getElementById("expenseList");

    const row =
        document.createElement("tr");


    row.innerHTML = `
        <td>${expenseName}</td>
        <td>₹${expenseAmount}</td>
        <td>${category}</td>
    `;


    table.appendChild(row);


    // Update summary

    document.getElementById("totalIncome")
        .innerText = income;

    document.getElementById("totalExpense")
        .innerText = totalExpense;


    const savings =
        income - totalExpense;

    document.getElementById("savings")
        .innerText = savings;


    // Clear fields

    document.getElementById("expenseName")
        .value = "";

    document.getElementById("expenseAmount")
        .value = "";

    document.getElementById("category")
        .value = "";

    error.innerText = "";
}
