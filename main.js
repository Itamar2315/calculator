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

const divide = function(firstNum, secondNum){
    return firstNum / secondNum;
}


function createDigButtons(div){
    for(let i = 1; i < 10; i++){
        const digButton = document.createElement("button");
        digButton.textContent = i;
        div.appendChild(digButton);   
    }

    const digitButtons = div.children;
    for(let i = 0; i < digitButtons.length; i++){ // so it will add listeners to 1-9 + 0 and . (created in index)
        digitButtons[i].addEventListener("click", addDigToInput);
        digitButtons[i].classList.add("digButton");
        
    }
}

function createOperatesButtons(div){
    const operators = ["+", "-", "*", "/", "="]
    operators.forEach(operator => {
        const opButton = document.createElement("button");
        opButton.textContent = operator;
        div.appendChild(opButton);
        opButton.addEventListener("click", operate)
        opButton.classList.add("opButton");
        operatorsButtons[operator] = opButton;
    });
}

function startSecondNumber(operator){
    firstNum = Number(inputBar.value);
    prevOperator = operator;
    isStartingSecond = true;
    coloredOperator = operatorsButtons[operator];
    coloredOperator.setAttribute("filter", "brightness(135%)");
    coloredOperator.style.filter = "brightness(135%)";
}

function clear(){
    display.value = firstNum = prevOperator = null;
    if(coloredOperator){
        coloredOperator.setAttribute("filter", "brightness(100%)");
        coloredOperator.style.filter = "brightness(100%)";
        coloredOperator = null;
    }
}

function operate(event){
    const operator = event instanceof MouseEvent ? event.target.textContent : event.key; 
    if(!prevOperator){
        if(operator === "=" || operator === "Enter"){
            return; 
        }
        else{
            startSecondNumber(operator);
        }
    }
    else{
        coloredOperator.setAttribute("filter", "brightness(100%)");
        coloredOperator.style.filter = "brightness(100%)";
        coloredOperator = null;
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
                if(secondNum === 0){
                    alert(`Imagine that you have ${firstNum} cookies, and you split them evenly among zero friends. How many cookies does each person get? See? It doesn’t make sense. And Cookie Monster is sad that there are no cookies, and you are sad that you have no friends.`);
                    clear();
                    return;
                }
                result = divide(firstNum, secondNum);
                break;
        }
        result = Math.round(result * 100) / 100;
        inputBar.value = result;

        if(operator != "=" && operator != "Enter"){
            firstNum = result;
            startSecondNumber(operator);
        }
        else{
            
            prevOperator = null;
        }
    }
}

function addDigToInput(event){
    if(inputBar.value.length > 20){
        alert("You will crash me if you keep inserting those numbers x__x")
        return;
    }
    const key = event instanceof MouseEvent ? event.target.textContent : event.key;
    if(key === "."){
        if(usedDot) return;
        else{
            usedDot = true;
        }
    }
    if(isStartingSecond){
        inputBar.value = null;
        display.value = display.value + key;
        isStartingSecond = false;
    }
    else{
        display.value = display.value + key;
    }
}


const inputBar = document.querySelector("input");
const home = document.querySelector(".home");
const digits = document.querySelector(".digits");
const operators = document.querySelector(".operators")
const display = document.querySelector(".display");
const clearButton = document.querySelector("#clearButton")
const calculateButton = document.querySelector(".calculateButton");
const backspaceButton = document.querySelector("#backspaceButton");
const operatorsButtons = {};
let firstNum;
let prevOperator = null;
let isStartingSecond = false;
let usedDot = false;
let coloredOperator;
createDigButtons(digits);
createOperatesButtons(operators);





clearButton.addEventListener("click", () => {
    clear();
});

backspaceButton.addEventListener("click", () =>{
    const str = display.value;
    display.value ? display.value = str.substring(0, str.length - 1) : null;
});


document.addEventListener("keydown",(event) => {
    const digits = "0123456789.";
    const operators = "+-*/=";
    const keyName = event.key;
    if(keyName === "Enter"){ //enter shouldn't press on buttons like its default behavior 
        event.preventDefault();
    }
    switch (true){
        case digits.includes(keyName):
            addDigToInput(event);
            break;
        
        case operators.includes(keyName) || keyName === "Enter":
            operate(event);
            break;

        case keyName === "Backspace":
            const str = display.value;
            display.value ? display.value = str.substring(0, str.length - 1) : null;
            break;
    }
});



