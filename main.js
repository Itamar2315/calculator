const add = function(...args) {
    return args.reduce((total, element) =>
    total += element);
    
};

const subtract = function(...args) {
    return args.reduce((total, element) =>
    total -= element);
};

const sum = function(array) {
    if (array.length != 0){
    return array.reduce((total, element)=>
    total += element);
    }
    else return 0;
};

const multiply = function(array) {
    return array.reduce((total, element) => 
    total *= element, 1);
};

const power = function(num, powerOf) {
    return Math.pow(num, powerOf);
};

const factorial = function(num) {
    let total = 1;
    for(let i = 1; i <= num; i++){
        total *= i;
    }
    return total;
    
};

const divide = function(firstNum, secondNum){
    return firstNum / secondNum;
}


function operate(event){
    const operator = event.target.textContent; 
    if (!prevOperator){
        if(operator === "="){
            return; //if "=" is pressed 2 times in a row don't do anything
        }
        else{
            firstNum = Number(inputBar.value);
            prevOperator = operator;
            isStartingSecond = true;
            coloredButton = event.target;
            coloredButton.setAttribute("backgroundColor", "#ffba30");
            coloredButton.style.backgroundColor = "#ffba30";
        }
    }
    else{
        coloredButton.setAttribute("backgroundColor", "orange");
        coloredButton.style.backgroundColor = "orange";
        let result;
        const secondNum = Number(inputBar.value);
        switch(prevOperator){
            case "+":
                result = add(firstNum, secondNum);
                break;
            case "-":
                result = subtract(firstNum, secondNum);
                break;
            case "*":
                result = multiply([firstNum, secondNum]);
                break;
            case "/":
                result = divide(firstNum, secondNum);
                break;
        }
        result = Math.round(result * 100) / 100;
        inputBar.value = result;

        if(operator != "="){
            prevOperator = operator;
            firstNum = result;
        }
        else{
            prevOperator = null;
        }
    }
}

function createDigButtons(div){
    for(let i = 1; i < 10; i++){
        const digButton = document.createElement("button");
        digButton.textContent = i;
        div.appendChild(digButton);
    }
    const digitButtons = div.children;
    for(let i = 0; i < digitButtons.length; i++){
        digitButtons[i].addEventListener("click", addDigToInput);
        digitButtons[i].classList.add("digButton");
    }
}

function createOperatesButtons(div){
    const operators = ["+", "-", "*", "/", "="]
    operators.forEach(element => {
        const opButton = document.createElement("button");
        opButton.textContent = element;
        div.appendChild(opButton);
        opButton.addEventListener("click", operate)
        opButton.classList.add("opButton");
    });
}

function addDigToInput(event){
    if(event.target.textContent === "."){
        if(usedDot) return;
        else{
            usedDot = true;
        }
    }
    if(isStartingSecond){
        inputBar.value = null;
        display.value = display.value + event.target.textContent;
        isStartingSecond = false;
    }
    else{
        display.value = display.value + event.target.textContent;
    }
}



const inputBar = document.querySelector("input");
const home = document.querySelector(".home");
const digits = document.querySelector(".digits");
const operators = document.querySelector(".operators")
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clearButton")
const calculateButton = document.querySelector(".calculateButton");
let firstNum;
let prevOperator = null;
let isStartingSecond = false;
let usedDot = false;
let coloredButton;
createDigButtons(digits);
createOperatesButtons(operators);
clearButton.addEventListener("click", () => {
    display.value = firstNum = prevOperator = null;
});

