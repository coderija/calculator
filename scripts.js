let firstNumber ='';
let operation = null;
let secondNumber = '';
let isShowigResult = false;

const numberButtons = document.querySelectorAll('[data-number]');
const display = document.getElementById('current');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-action="equals"]');
const clearButton = document.getElementById('clear');
const decimalButton = document.querySelector('[data-action= "decimal"]');


//event listeners
numberButtons.forEach((button)=> button.addEventListener('click',() => 
                appendDigit(button.textContent)));  
operationButtons.forEach((button) => button.addEventListener('click', ()=>
                chooseOperator(button.dataset.operator) ));
equalButton.addEventListener('click',calculate);
clearButton.addEventListener('click', clear);
decimalButton.addEventListener('click', appendPoint);

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
        firstNumber = addToNumber(firstNumber, aDigit);
        currentDisplay(firstNumber);
    
    }
    
    else {
     secondNumber = addToNumber(secondNumber, aDigit);
     currentDisplay(secondNumber);
    }
  }
  //a helper to fix the multiple leading zeros
  function addToNumber(current, digit){
    if(current === '0'){
        return digit;
    }
    return current + digit;
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
  
//a helper function to handle decimal button 
function addPoint(current) {
    if (current.includes('.')) {
        return current;
    }
    if (current === ''){
        return '0.';
    }
    return current += '.';
  }

  function appendPoint() {
    if (isShowigResult === true){
        firstNumber = '';
        isShowigResult = false;
    }
    if (operation === null){
        firstNumber = addPoint(firstNumber);
        currentDisplay(firstNumber);
    }
    else {
        secondNumber = addPoint(secondNumber);
        currentDisplay(secondNumber);
    }
    }

//handle equal button 
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
