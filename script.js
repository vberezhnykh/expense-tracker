const budget = document.querySelector('.budget__number');
const incomeBtn = document.querySelector('.buttons__income');
const expenseBtn = document.querySelector('.buttons__expense');
const inputBlock = document.querySelector('.input');
const input = document.querySelector('.input__input');
const incomeCategory = document.querySelector('.container-income')
const expenseCategory = document.querySelector('.container-expenses');
const incomeList = document.querySelectorAll('.income-item__img');
const expenseList = document.querySelectorAll('.expense-item__img');
const addBtn = document.querySelector('.input__button');
const transactions = document.querySelector('.transactions-list');

const salary = document.getElementById('salary');
const salaryBorder = salary.parentElement;
const cashback = document.getElementById('cashback');
const cashbackBorder = cashback.parentElement;
const otherIncome = document.getElementById('other-income');
const otherIncomeBorder = otherIncome.parentElement;
const food = document.getElementById('food');
const foodBorder = food.parentElement;
const dining = document.getElementById('dining');
const diningBorder = dining.parentElement;
const rent = document.getElementById('rent');
const rentBorder = rent.parentElement;
const transport = document.getElementById('transport');
const transportBorder = transport.parentElement;
const otherExpense = document.getElementById('other-expense');
const otherExpenseBorder = otherExpense.parentElement;

let inputIsHidden = true;
let lastActiveBtn;
let activeCategory;

function showInput(elem) {
    if (inputIsHidden) {
        inputBlock.classList.remove('input--hidden');
        elem.target === incomeBtn ? incomeBtn.classList.add('buttons__income--active') : expenseBtn.classList.add('buttons__expense--active');
        elem.target === incomeBtn ? incomeCategory.classList.remove('container-income--hidden') : expenseCategory.classList.remove('container-expenses--hidden');
        inputIsHidden = false;
        lastActiveBtn = elem.target;
    } else if (!inputIsHidden && elem.target !== lastActiveBtn) {
        if (elem.target === expenseBtn) {
            incomeBtn.classList.remove('buttons__income--active');
            incomeCategory.classList.add('container-income--hidden');
            expenseBtn.classList.add('buttons__expense--active');
            expenseCategory.classList.remove('container-expenses--hidden');
        } else if (elem.target === incomeBtn) {
            incomeBtn.classList.add('buttons__income--active');
            incomeCategory.classList.remove('container-income--hidden');
            expenseBtn.classList.remove('buttons__expense--active');
            expenseCategory.classList.add('container-expenses--hidden');
        }
        lastActiveBtn = elem.target;
        if (activeCategory !== undefined) {
            activeCategory.parentElement.classList.remove('income-item__container--active');
            activeCategory.parentElement.classList.remove('expense-item__container--active');
            activeCategory = undefined;
        }
    } else {
        inputBlock.classList.add('input--hidden');
        incomeBtn.classList.remove('buttons__income--active');
        expenseBtn.classList.remove('buttons__expense--active');
        incomeCategory.classList.add('container-income--hidden');
        expenseCategory.classList.add('container-expenses--hidden');
        inputIsHidden = true;
        lastActiveBtn = undefined;
    }
    incomeList.forEach(elem => {
        elem.addEventListener('click', chooseCategory);
    });
    expenseList.forEach(elem => {
        elem.addEventListener('click', chooseCategory);
    })
}

incomeBtn.addEventListener('click', showInput);
expenseBtn.addEventListener('click', showInput);

function chooseCategory(e) {
    if (activeCategory !== undefined && e.target.parentElement.classList.contains('income-item__container--active')) {
        e.target.parentElement.classList.remove('income-item__container--active');
        activeCategory = undefined;
    } else if(activeCategory !== undefined && e.target.parentElement.classList.contains('expense-item__container--active')) {
        e.target.parentElement.classList.remove('expense-item__container--active');
        activeCategory = undefined;
    } else if (activeCategory !== undefined && lastActiveBtn === incomeBtn) {
        switch(e.target) {
            case salary: 
                activeCategory = salary.parentElement.children[1];
                salaryBorder.classList.add('income-item__container--active');
                cashbackBorder.classList.remove('income-item__container--active');
                otherIncomeBorder.classList.remove('income-item__container--active');
                break;
            case cashback:
                activeCategory = cashback.parentElement.children[1];
                cashbackBorder.classList.add('income-item__container--active');
                salaryBorder.classList.remove('income-item__container--active');
                otherIncomeBorder.classList.remove('income-item__container--active');
                break;
            case otherIncome:
                activeCategory = otherIncome.parentElement.children[1];
                otherIncomeBorder.classList.add('income-item__container--active');
                salaryBorder.classList.remove('income-item__container--active');
                cashbackBorder.classList.remove('income-item__container--active');
            default:
                break;
        }   
    } else if (activeCategory !== undefined && lastActiveBtn === expenseBtn) {
        switch(e.target) {
            case food:
                activeCategory = food.parentElement.children[1];
                foodBorder.classList.add('expense-item__container--active');
                diningBorder.classList.remove('expense-item__container--active');
                rentBorder.classList.remove('expense-item__container--active');
                transportBorder.classList.remove('expense-item__container--active');
                otherExpenseBorder.classList.remove('expense-item__container--active');
                break;
            case dining:
                activeCategory = dining.parentElement.children[1];
                diningBorder.classList.add('expense-item__container--active');
                foodBorder.classList.remove('expense-item__container--active');
                rentBorder.classList.remove('expense-item__container--active');
                transportBorder.classList.remove('expense-item__container--active');
                otherExpenseBorder.classList.remove('expense-item__container--active');
                break;
            case rent:
                activeCategory = rent.parentElement.children[1];
                rentBorder.classList.add('expense-item__container--active');
                diningBorder.classList.remove('expense-item__container--active');
                foodBorder.classList.remove('expense-item__container--active');
                transportBorder.classList.remove('expense-item__container--active');
                otherExpenseBorder.classList.remove('expense-item__container--active');
                break;
            case transport:
                activeCategory = transport.parentElement.children[1];
                transportBorder.classList.add('expense-item__container--active');
                diningBorder.classList.remove('expense-item__container--active');
                rentBorder.classList.remove('expense-item__container--active');
                foodBorder.classList.remove('expense-item__container--active');
                otherExpenseBorder.classList.remove('expense-item__container--active');
                break;
            case otherExpense:
                activeCategory = otherExpense.parentElement.children[1];
                otherExpenseBorder.classList.add('expense-item__container--active');
                diningBorder.classList.remove('expense-item__container--active');
                rentBorder.classList.remove('expense-item__container--active');
                transportBorder.classList.remove('expense-item__container--active');
                foodBorder.classList.remove('expense-item__container--active');
                break;
            default:
                break;
        }
    } else {
        switch(e.target) {
            case salary: 
                activeCategory = salary.parentElement.children[1];
                salaryBorder.classList.add('income-item__container--active');
                break;
            case cashback:
                activeCategory = cashback.parentElement.children[1];
                cashbackBorder.classList.add('income-item__container--active');
                break;
            case otherIncome:
                activeCategory = otherIncome.parentElement.children[1];
                otherIncomeBorder.classList.add('income-item__container--active');
                break;
            case food:
                activeCategory = food.parentElement.children[1];
                foodBorder.classList.add('expense-item__container--active');
                break;
            case dining:
                activeCategory = dining.parentElement.children[1];
                diningBorder.classList.add('expense-item__container--active');
                break;
            case rent:
                activeCategory = rent.parentElement.children[1];
                rentBorder.classList.add('expense-item__container--active');
                break;
            case transport:
                activeCategory = transport.parentElement.children[1];
                transportBorder.classList.add('expense-item__container--active');
                break;
            case otherExpense:
                activeCategory = otherExpense.parentElement.children[1];
                otherExpenseBorder.classList.add('expense-item__container--active');
                break;
            default:
                break;
        }
    }
}

function addTransaction() {
    if (activeCategory === undefined) {
        alert('Please choose the category.');
        return;
    }
    const singleTransaction = document.createElement('li');
    const container = document.createElement('div');
    const category = document.createElement('span');
    const sum = document.createElement('span');
    if (input.value == 0) {
        alert('Please enter the number');
        return;
    }
    singleTransaction.append(container);
    container.classList.add('transaction-container');
    container.append(sum);
    sum.textContent = `${input.value} ₽`;
    container.prepend(category);
    category.textContent = `${activeCategory.textContent}`;
    if (lastActiveBtn === incomeBtn) {
        singleTransaction.classList.add('transactions__income');
        budget.textContent = `${Number(budget.textContent) + Number(input.value)}`;
    } else if (lastActiveBtn === expenseBtn) {
        singleTransaction.classList.add('transactions__expense');
        budget.textContent = `${Number(budget.textContent) - Number(input.value)}`;
    }
    transactions.prepend(singleTransaction);
    input.value = '';
}

addBtn.addEventListener('click', addTransaction);

input.addEventListener('keypress', (event) => {
    event.key === 'Enter' ? addBtn.click() : false;
})