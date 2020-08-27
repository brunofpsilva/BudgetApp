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

    //Data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: [],
            inc: []
        }
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
        expenseContainer: '.expenses__list'
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
                html = `<div class="item clearfix" id="%id%">
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
                html = `<div class="item clearfix" id="%id%">
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
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var updateBudget = function () {
        // 1. Calculate the budget

        // 2. Return the budget
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

    return {
        init: function () {
            console.log("Application has started.");
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();



