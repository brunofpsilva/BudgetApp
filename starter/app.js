//Budget Controller
var budgetController = (function () {

})();

//Ui Controller
var UIController = (function () {

})();

//Global APP Controller
var Controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {
        //ToDo:
        // 1. Get the filed input data
        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI

        console.log('okokok');
    }

    document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);




