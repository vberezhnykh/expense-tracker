const budget = document.querySelector('.budget__number');
const incomeBtn = document.querySelector('.buttons__income');
const expenseBtn = document.querySelector('.buttons__expense');
const inputBlock = document.querySelector('.input');
const inputSum = document.querySelector('.input__sum');
const inputDate = document.querySelector('.input__date');
const incomeCategory = document.querySelector('.container-income')
const expenseCategory = document.querySelector('.container-expenses');
const incomeList = document.querySelectorAll('.income-item__img');
const expenseList = document.querySelectorAll('.expense-item__img');
const addBtn = document.querySelector('.input__button');
const transactionSection = document.querySelector('.transactions');

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
let transactionType;
let activeDate;

const getToday = () => {
    const date = new Date;
    const day = date.getDate().toString().padStart(2, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`
    return today;
}

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

function selectCategory(e) {
    deactivateAllCategory();
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

function chooseCategory(e) {
    if (activeCategory !== undefined && e.target.parentElement.classList.contains('income-item__container--active')) {
        e.target.parentElement.classList.remove('income-item__container--active');
        activeCategory = undefined;
    } else if(activeCategory !== undefined && e.target.parentElement.classList.contains('expense-item__container--active')) {
        e.target.parentElement.classList.remove('expense-item__container--active');
        activeCategory = undefined;
    } else if (activeCategory !== undefined && lastActiveBtn === incomeBtn) {
        selectCategory(e);
    } else if (activeCategory !== undefined && lastActiveBtn === expenseBtn) {
        selectCategory(e);
    } else {
        selectCategory(e);
    }
    toggleAddButtonColor();
}

function deactivateAllCategory() {
    salaryBorder.classList.remove('income-item__container--active');
    cashbackBorder.classList.remove('income-item__container--active');
    otherIncomeBorder.classList.remove('income-item__container--active');
    rentBorder.classList.remove('expense-item__container--active');
    diningBorder.classList.remove('expense-item__container--active');
    foodBorder.classList.remove('expense-item__container--active');
    transportBorder.classList.remove('expense-item__container--active');
    otherExpenseBorder.classList.remove('expense-item__container--active');
}

function loadTransactions() {
    const storage = window.localStorage;
    if (!Object.keys(storage).includes('transactions')) {
        return false;
    }

    const savedTransactions = Array.from(JSON.parse(localStorage.getItem('transactions')));
    savedTransactions.forEach(transaction => {
        const day = document.createElement('div');
        const dateBlock = document.createElement('span');
        const transactions = document.createElement('ul');
        const sum = document.createElement('span');
        let date;
        const days = document.querySelectorAll('.transaction-day');
        
        function transformDate(string) {
            const year = string.slice(0, 4);
            const day = string.slice(8);
            const month = string.slice(5,7);
            let monthInWord = '';
            switch (month) {
                case '01':
                    monthInWord = 'January';
                    break;
                case '02':
                    monthInWord = 'February';
                    break;
                case '03':
                    monthInWord = 'March';
                    break;
                case '04':
                    monthInWord = 'April';
                    break;
                case '05':
                    monthInWord = 'May';
                    break;
                case '06':
                    monthInWord = 'June';
                    break;
                case '07':
                    monthInWord = 'July';
                    break;
                case '08':
                    monthInWord = 'August';
                    break;
                case '09':
                    monthInWord = 'September';
                    break;
                case '10':
                    monthInWord = 'October';
                    break;
                case '11':
                    monthInWord = 'November';
                    break;
                case '12':
                    monthInWord = 'December';
                    break;
            }
            date = `${day} ${monthInWord} ${year}`;
        };

        let counter = 0;
        function isLater (input, i) {
        const inputYear = input.slice(0, 4);
        const inputMonth = input.slice(5,7);
        const inputDay = input.slice(8);

        let dateToCheck = days[i].id;
        let yearToCheck = dateToCheck.slice(0, 4);
        let monthToCheck = dateToCheck.slice(5, 7);
        let dayToCheck = dateToCheck.slice(8);

        if (inputYear > yearToCheck) {
            days[i].before(day);
        } else if (inputYear < yearToCheck) {
            if (i + 1 === days.length) {
                days[i].after(day);
            } else {
                i++;
                isLater(inputDate.value, i);
            }  
        } else if (inputYear === yearToCheck) {
            if (inputMonth > monthToCheck) {
                days[i].before(day);
            } else if (inputMonth < monthToCheck) {
                if (i + 1 === days.length) {
                    days[i].after(day);
                } else {
                    i++;
                    isLater(inputDate.value, i);
                }
            } else if (inputMonth === monthToCheck) {
                if (inputDay > dayToCheck) {
                    days[i].before(day);
                } else if (inputDay < dayToCheck) {
                    if (i + 1 === days.length) {
                        days[i].after(day);
                    } else {
                        i++;
                        isLater(inputDate.value, i);
                    }
                }
            }
        }
    } 
        
        function createDay() {
            if (days.length === 0) {
                transactionSection.children[0].after(day);
            } else if (days.length > 0) {
                isLater(transaction.date, counter);
                counter = 0;
            }
            day.classList.add('transaction-day');
            day.setAttribute('id', transaction.date);
            day.prepend(dateBlock);
            transformDate(transaction.date);
            dateBlock.textContent = `${date}`;
            day.append(transactions);
            transactions.classList.add('transactions-list');
            transactions.classList.add(`_${transaction.date}`);
        }

        function createTransaction() {
            const categoryValue = transaction.category;
            const sumValue = transaction.sum;
            const type = transaction.type;
            const date = transaction.date;
    
            const singleTransaction = document.createElement('li');
            const container = document.createElement('div');
            const sum = document.createElement('span');
            const category = document.createElement('span');
            
            singleTransaction.append(container);
            container.classList.add('transaction-container');
            container.append(sum);
            sum.textContent = `${sumValue} ₽`;
            sum.classList.add('sum__value');
            container.prepend(category);
            category.textContent = `${categoryValue}`;
            category.classList.add('category-text');
            
            if (type === 'income') {
                singleTransaction.classList.add('transactions__income');
                budget.textContent = `${Number(budget.textContent) + Number(sumValue)}`
            } else if (type === 'expense') {
                singleTransaction.classList.add('transactions__expense');
                budget.textContent = `${Number(budget.textContent) - Number(sumValue)}`;
            }
            transactions.prepend(singleTransaction);
            return singleTransaction;
        }

        if (days.length !== 0) {
            days.forEach((elem) => {
                const element = document.getElementById(`${transaction.date}`);
                if (elem === element) {
                    const transactionList = document.querySelector(`._${transaction.date}`);
                    singleTransaction = createTransaction();
                    transactionList.prepend(singleTransaction);
                } else if (element === null) { 
                    createDay();
                    createTransaction();
                };
            })
        } else {
            createDay();
            createTransaction();
        }
    })
}

window.addEventListener('load', loadTransactions)

function addTransaction() {
    if (activeCategory === undefined) {
        alert('Please choose the category.');
        return;
    }
    if (activeDate === undefined || activeDate === '') {
        alert('Please choose the date.');
        return;
    }

    const day = document.createElement('div');
    const dateBlock = document.createElement('span');
    const transactions = document.createElement('ul');
    const sum = document.createElement('span');
    let date;
    const days = document.querySelectorAll('.transaction-day');

    function transformDate(string) {
        const year = string.slice(0, 4);
        const day = string.slice(8);
        const month = string.slice(5,7);
        let monthInWord = '';
        switch (month) {
            case '01':
                monthInWord = 'January';
                break;
            case '02':
                monthInWord = 'February';
                break;
            case '03':
                monthInWord = 'March';
                break;
            case '04':
                monthInWord = 'April';
                break;
            case '05':
                monthInWord = 'May';
                break;
            case '06':
                monthInWord = 'June';
                break;
            case '07':
                monthInWord = 'July';
                break;
            case '08':
                monthInWord = 'August';
                break;
            case '09':
                monthInWord = 'September';
                break;
            case '10':
                monthInWord = 'October';
                break;
            case '11':
                monthInWord = 'November';
                break;
            case '12':
                monthInWord = 'December';
                break;
        }
        date = `${day} ${monthInWord} ${year}`;
    }

    let counter = 0;
    function isLater (input, i) {
        const inputYear = input.slice(0, 4);
        const inputMonth = input.slice(5,7);
        const inputDay = input.slice(8);

        let dateToCheck = days[i].id;
        let yearToCheck = dateToCheck.slice(0, 4);
        let monthToCheck = dateToCheck.slice(5, 7);
        let dayToCheck = dateToCheck.slice(8);

        if (inputYear > yearToCheck) {
            days[i].before(day);
        } else if (inputYear < yearToCheck) {
            if (i + 1 === days.length) {
                days[i].after(day);
            } else {
                i++;
                isLater(inputDate.value, i);
            }  
        } else if (inputYear === yearToCheck) {
            if (inputMonth > monthToCheck) {
                days[i].before(day);
            } else if (inputMonth < monthToCheck) {
                if (i + 1 === days.length) {
                    days[i].after(day);
                } else {
                    i++;
                    isLater(inputDate.value, i);
                }
            } else if (inputMonth === monthToCheck) {
                if (inputDay > dayToCheck) {
                    days[i].before(day);
                } else if (inputDay < dayToCheck) {
                    if (i + 1 === days.length) {
                        days[i].after(day);
                    } else {
                        i++;
                        isLater(inputDate.value, i);
                    }
                }
            }
        }
    } 

    function createDay() {
        if (days.length === 0) {
            transactionSection.children[0].after(day);
        } else if (days.length > 0) {
            isLater(inputDate.value, counter);
            counter = 0;
        }
        day.classList.add('transaction-day');
        day.setAttribute('id', `${inputDate.value}`);
        day.prepend(dateBlock);
        transformDate(inputDate.value);
        dateBlock.textContent = `${date}`;
        day.append(transactions);
        transactions.classList.add('transactions-list');
        transactions.classList.add(`_${inputDate.value}`);
    }

    function createTransaction() {
        const singleTransaction = document.createElement('li');
        const container = document.createElement('div');
        const sum = document.createElement('span');
        const category = document.createElement('span');
        
        singleTransaction.append(container);
        container.classList.add('transaction-container');
        container.append(sum);
        sum.textContent = `${inputSum.value} ₽`;
        sum.classList.add('sum__value');
        container.prepend(category);
        category.textContent = `${activeCategory.textContent}`;
        category.classList.add('category-text')
        
        if (lastActiveBtn === incomeBtn) {
            singleTransaction.classList.add('transactions__income');
            budget.textContent = `${Number(budget.textContent) + Number(inputSum.value)}`;
            transactionType = 'income';
        } else if (lastActiveBtn === expenseBtn) {
            singleTransaction.classList.add('transactions__expense');
            budget.textContent = `${Number(budget.textContent) - Number(inputSum.value)}`;
            transactionType = 'expense';
        }
        transactions.prepend(singleTransaction);
        return singleTransaction;
    }

    if (inputSum.value == 0) {
        alert('Please enter the number');
        return;
    }
    if (days.length !== 0) {
        days.forEach((elem) => {
            const element = document.getElementById(`${inputDate.value}`);
            if (elem === element) {
                const transactionList = document.querySelector(`._${inputDate.value}`);
                singleTransaction = createTransaction();
                transactionList.prepend(singleTransaction);
            } else if (element === null) { 
                createDay();
                createTransaction();
            }
        })
    } else { 
        createDay();
        createTransaction();
    }

    localStorage.setItem('transactions', JSON.stringify([...JSON.parse(localStorage.getItem('transactions') || '[]'), 
    {
        category: `${activeCategory.textContent}`,
        type: `${transactionType}`,
        sum: `${inputSum.value}`,
        date: `${inputDate.value}`
    }]))
    inputSum.value = '';
    transactionType = undefined;
    activeDate = undefined;
}

addBtn.addEventListener('click', addTransaction);

inputSum.addEventListener('keydown', (event) => {
    event.key === 'Enter' ? addBtn.click() : false;
    event.key !== 'Enter' ? toggleAddButtonColor() : false;
})

let touchstartX = 0;
let touchendX = 0;
let direction;

function checkDirection(e) {
    if (touchendX < touchstartX) {
        direction = 'left';
    } 
    if (touchendX > touchstartX) {
        direction = 'right';
    } 
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();

    if (direction === 'right') {
        const categoryTexts = document.querySelectorAll('.category-text');
        categoryTexts.forEach(elem => {
            if (e.target === elem) {
                const container = e.target.parentElement;
                if (container.children[0].nodeName !== 'BUTTON') {
                    const closeBtn = document.createElement('button');
                    closeBtn.classList.add('close-button');
                    closeBtn.textContent = 'DELETE';
                    container.prepend(closeBtn);
                    closeBtn.addEventListener('click', (e) => {
                        const item = e.target.parentElement.parentElement;
                        const itemList = item.parentElement;
                        const container = item.children[0];
                        const category = container.children[1].textContent;
                        const date = itemList.parentElement.id;
                        const sum = container.children[2].textContent.slice(0, -2);
                        let type;
                        if (item.classList.contains('transactions__expense')) {
                            type = 'expense';
                        } else if (item.classList.contains('transactions__income')) {
                            type = 'income';
                        }

                        let transactions = Array.from(JSON.parse(localStorage.getItem('transactions')));
                        transactions.forEach(transaction => {
                            if (transaction.category === category &&
                                transaction.date === date &&
                                transaction.sum === sum &&
                                transaction.type === type) {
                                    transactions.splice(transactions.indexOf(transaction), 1)
                                }
                        })
                        localStorage.setItem('transactions', JSON.stringify(transactions));
                        item.remove();

                        if (itemList.children.length === 0) {
                            itemList.parentElement.remove();
                        }
                    })
                }
            }
        })
    } else if (direction === 'left') {
        const transactionContainer = document.querySelectorAll('.transaction-container');
        const categoryTexts = document.querySelectorAll('.category-text');
        
        transactionContainer.forEach(elem => {
            if (e.target === elem) {
                const container = e.target;
                const closeBtn = container.children[0];
                closeBtn.remove();
            }
        });
        categoryTexts.forEach(elem => {
            if (e.target === elem) {
                const container = e.target.parentElement;
                const closeBtn = container.children[0];
                closeBtn.nodeName === 'BUTTON' ? closeBtn.remove() : false;
            }
        })
    }
    direction = undefined;
})

function toggleAddButtonColor() {
    activeCategory === undefined ? addBtn.classList.add('input__button--inactive') : false;
    (activeCategory !== undefined && inputSum.value !== '') ? addBtn.classList.remove('input__button--inactive'): false;
}

inputDate.onclick = () => {
    activeDate = inputDate.value;
}

window.onload = () => {
    inputDate.value = getToday();
    inputDate.max = getToday();
    activeDate = inputDate.value;
}

function updateTransaction(elem) {
    if (elem.target.classList.contains('category-text')) {
        console.log('it is text');
        const input = document.createElement('input');
        elem.target.after(input);
        input.value = elem.target.textContent;
        input.addEventListener('keypress', confirmUpdate);
        elem.target.classList.add('category-text--hidden')
    } /* else if (elem.target.classList.contains('sum__value')) {
        console.log('it is sum');
        const input = document.createElement('input');
        elem.target.before(input);
        input.value = elem.target.textContent;
        input.addEventListener('keypress', confirmUpdate);
        elem.target.classList.add('category-text--hidden');
    } */
}

function confirmUpdate(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const transactionContainer = input.parentElement;
        const sum = transactionContainer.children[2].textContent.slice(0, -2);
        const listItem = transactionContainer.parentElement;
        let type = ''
        if (listItem.classList.contains('transactions__income')) {
            type = 'income';
        } else type = 'expense';
        const date = listItem.parentElement.parentElement.id;
        const categoryText = transactionContainer.children[0];
        const uneditedText = document.querySelector('.category-text--hidden').textContent;
        categoryText.textContent = `${input.value}`;
        categoryText.classList.remove('category-text--hidden');
        input.remove();

        let savedTransactions = Array.from(JSON.parse(localStorage.getItem('transactions')));
        savedTransactions.forEach(singleTransaction => {
            if (singleTransaction.category === uneditedText &&
                singleTransaction.type === type &&
                singleTransaction.sum === sum &&
                singleTransaction.date === date) {
                    console.log(singleTransaction)
                    singleTransaction.category = categoryText.textContent;
            }
        })
        localStorage.setItem('transactions', JSON.stringify(savedTransactions));
    } 
}

window.addEventListener('dblclick', updateTransaction)