//----BUDGET CONTROLLER
var budgetController = (function () {

    //Expense function contructor
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };
    //Income function contructor
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    //Calculate total function
    var calculateTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    }

    //Data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: [],
            inc: []
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem;

            //Create new ID
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else {
                ID = 0;
            }

            //Create new Item based on the type
            if (type === 'exp') newItem = new Expense(ID, des, val);
            else if (type === 'inc') newItem = new Income(ID, des, val);

            //Push into the data structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },

        deleteItem: function (type, id) {
            var index, ids;

            //Get only the ids into 'ids' array
            ids = data.allItems[type].map(function (current) { return current.id; });

            //Find index of id to delete
            index = ids.indexOf(id);

            //Delete the id from data if found
            if (index !== -1) { data.allItems[type].splice(index, 1); }
        },

        calculateBudget: function () {

            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: income - budget
            data.budget = data.totals.inc - data.totals.exp;

            //Calculate the percentage of income that we spent
            if (data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            else data.percentage = -1;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    }
})();

//----UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // INC or EXP
                description: document.querySelector(DOMstrings.inputdescription).value, // Description Input
                value: parseFloat(document.querySelector(DOMstrings.inputvalue).value)  // Value Input
            };
        },

        addListItem: function (obj, type) {
            var html, newhtml, element;

            // Create HTML string whith placeholder text
            if (type == 'inc') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="inc-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            } else if (type == 'exp') {
                element = DOMstrings.expenseContainer;
                html = `<div class="item clearfix" id="exp-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            }

            // Replace the placeholder text with some actual data
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', obj.value);

            // Insert the HTML into  the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
        },

        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMstrings.inputdescription + ', ' + DOMstrings.inputvalue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function (obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            }
            else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            }

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

//----GLOBALL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

    }

    var updateBudget = function () {
        var budget;

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudget();

        // 3. Update the budget on the UI
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get the filed input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }
    }

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            //inc-1 -> split information (type = inc // id = 1)
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI


            // 3. Update and show the new budget
        }
    }

    return {
        init: function () {
            console.log("Application has started.");
            setupEventListeners();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }

})(budgetController, UIController);

controller.init();



