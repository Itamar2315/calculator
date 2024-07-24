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

function operateFunc(operator){
    const operatorsFunctions = {"+" : add, "-" : subtract
        , "*" : multiply, "/" : divide
    };
    return operatorsFunctions.operator;
}

function operate(event){
    
    const operator = event.target.textContent; 
    if (!prevOperator){
        firstNum = Number(inputBar.value);
        prevOperator = operator;
        isStartingSecond = true;
    }
    else{
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
    for(let i = 0; i < 10; i++){
        const digBtn = document.createElement("button");
        digBtn.textContent = i;
        div.appendChild(digBtn);
        digBtn.addEventListener("click", addDigToInput)
    }
}

function createOperatesButtons(div){
    const operators = ["+", "-", "*", "/", "="]
    operators.forEach(element => {
        const opBtn = document.createElement("button");
        opBtn.textContent = element;
        div.appendChild(opBtn);
        opBtn.addEventListener("click", operate)
    });
}


function takeInput(inputBar){
    let firstNum = inputBar
}

function addDigToInput(event){
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
const clearBtn = document.querySelector(".clearBtn")
const calculateBtn = document.querySelector(".calculateBtn");
let firstNum;
let prevOperator = null;
let isStartingSecond = false;
createDigButtons(digits);
createOperatesButtons(operators);

clearBtn.addEventListener("click", () => {
    display.value = firstNum = prevOperator = null;
    });
calculateBtn.addEventListener("click", operate)