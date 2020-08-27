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
    }
})();

//----UI CONTROLLER
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // INC or EXP
                description: document.querySelector(DOMstrings.inputdescription).value, // Description Input
                value: document.querySelector(DOMstrings.inputvalue).value  // Value Input
            };
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

    var ctrlAddItem = function () {
        // 1. Get the filed input data
        var input = UICtrl.getInput();
        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI
    }

    return {
        init: function () {
            console.log("Application has started.");
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();



