let firstNumber ='';
let operation = null;
let secondNumber = '';
let isShowigResult = false;

const numberButtons = document.querySelectorAll('[data-number]');
const display = document.getElementById('current');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-action="equals"]');
const clearButton = document.getElementById('clear');

//event listeners
numberButtons.forEach((button)=> button.addEventListener('click',() => 
                appendDigit(button.textContent)));  
operationButtons.forEach((button) => button.addEventListener('click', ()=>
                chooseOperator(button.dataset.operator) ));
equalButton.addEventListener('click',calculate);
clearButton.addEventListener('click', clear);

//basic math functions
function add(a,b){
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

//pick the right function for the operator.
function operate (operator,a, b){
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return add(a,b)
        case '-':
            return subtract(a,b)
        case '*':
            return multiply(a,b)
        case '/':
            if (b === 0){
                return null
            } else return divide(a,b)
    
        default:
            return null;
    }
}
//a function that writes to the screen
function currentDisplay(num){
    if (num === 0){
        display.textContent = 0;
    } else{
        display.textContent = num;
    }
}

//add digit to a number & check if the there's a result on the screen
function appendDigit(aDigit) {
    if(isShowigResult === true){
        firstNumber = '';
        isShowigResult = false;
    }

    if(operation === null ){
        firstNumber = firstNumber + aDigit;
        currentDisplay(firstNumber);
    
    }
    
    else {
     secondNumber = secondNumber + aDigit
     currentDisplay(secondNumber);
    }
  }
  //handle operators when clicked and operation chaining
function chooseOperator(op) {
    if(firstNumber=== ''){
        return;
    }
    if(operation !== null && secondNumber !==''){
        calculate();
        //check if the first number is valid
        if (firstNumber ===''){
            return;
        }
    }
    operation = op;
    isShowigResult = false;
  }

//handle equal button functionality
function calculate(){
    if (firstNumber !== '' && operation !== null && secondNumber !==''){
        const result = operate(operation, firstNumber, secondNumber);
        if (result === null){
            currentDisplay('Error');

            firstNumber ='';
            operation = null;
            secondNumber = '';
            return;
        }
        currentDisplay(result);
        firstNumber = String(result);
        operation = null;
        secondNumber = '';
        isShowigResult = true;
    }
}
//clear numbers and operations
function clear(){
    currentDisplay(0);
    firstNumber = '';
    operation = null;
    secondNumber = '';
    isShowigResult = false;
}