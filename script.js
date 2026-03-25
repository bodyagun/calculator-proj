let firstOperand = null
let operator = null
let secondOperand = null
let displayValue = "0"
let justCalculated = false

const add = function(a, b) {
  return a + b
};

const subtract = function(a, b) {
 return a - b
};

const multiply = function(a, b) {
    return a * b
}

const divide = function(a, b) {
    if (b === 0) {
        return "Wthelly"
    }
    return a / b
}


const operate = function(operator, a, b) {
    if (operator === "+") {
        return add(a ,b)
    } else if (operator === "-") {
        return subtract(a, b)
    } else if (operator === "*") {
        return multiply(a, b)
    } else if (operator === "/") {
        return divide(a, b)
    } else {
        return "ERROR"
    }
}

const display = document.querySelector("#input")
display.textContent = displayValue
const calcBtns = document.querySelector(".calcBtns")
const digitBtns = document.querySelectorAll(".digit")
digitBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (displayValue === "0") {
            displayValue = btn.textContent
        } else if (displayValue === "Wthelly") {
                resetCalculator()
        }
        else {  
            displayValue = displayValue + btn.textContent
        }
        display.textContent = displayValue
        justCalculated = false
    })
})

const operatorBtns = document.querySelectorAll(".operator")
operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operator) {
            operator = btn.dataset.operator
            return
        }
        firstOperand = displayValue  
        operator = btn.dataset.operator
        displayValue = "0"
        display.textContent = displayValue
        justCalculated = false
    })
})


const btnEqual = document.querySelector("#btnEqual")
btnEqual.addEventListener("click", () => {
    if (justCalculated) {
        return
    } else if (firstOperand === null || operator === null) {
        display.textContent = "Invalid input"  
        setTimeout(() => {
            resetCalculator() 
        }, 1500)
        return
} else {
    secondOperand = displayValue
    let result = operate(operator, Number(firstOperand), Number(secondOperand))
        displayValue = result
    if (result === "Wthelly") {
        display.textContent = "Wthelly"  
        setTimeout(() => {
            resetCalculator() 
        }, 1500)
        return
}
    if (result.toString().split(".")[1]) {
    displayValue = parseFloat(result.toFixed(5))
}
    display.textContent = displayValue
    justCalculated = true 
    firstOperand = result
    operator = null
    }
})

const btnDot = document.querySelector("#btnDot")
btnDot.addEventListener("click", () => {
    if (displayValue.includes(".")) {
        return
    } else {
        displayValue = displayValue + btnDot.textContent
        display.textContent = displayValue
    }
})

const btnPlusMinus = document.querySelector("#btnPlusMinus")
btnPlusMinus.addEventListener("click", () => {
    displayValue = Number(displayValue) * (-1)
    display.textContent = displayValue
})

const btnDel = document.querySelector("#btnDel")
btnDel.addEventListener("click", () => {
    if (displayValue.length === 1) {
        displayValue = "0"
    } else {
        displayValue = displayValue.slice(0, -1)
    }
    display.textContent = displayValue
})

const btnC = document.querySelector("#btnC") 
btnC.addEventListener("click", () => {
    resetCalculator()
})

// keyboard funcs

function resetCalculator() {
    firstOperand = null
    operator = null
    secondOperand = null
    displayValue = "0"
    justCalculated = false
    display.textContent = displayValue
}

function handleDigit(digit) {
        if (displayValue === "0") {
            displayValue = digit
        } else if (displayValue === "Wthelly") {
                resetCalculator()
        }
        else {  
            displayValue = displayValue + digit
        }
        display.textContent = displayValue
        justCalculated = false
    }

function handleOperator(op) {
            justCalculated = false
        if (operator) {
            operator = op
            return
        }
        firstOperand = displayValue  
        operator = op
        displayValue = "0"
        display.textContent = displayValue
    }

function handleEqual() {
    if (justCalculated) {
        return
    } else if (firstOperand === null || operator === null) {
        display.textContent = "Invalid input"  
        setTimeout(() => {
            resetCalculator() 
        }, 1500)
        return
} else {
    secondOperand = displayValue
    let result = operate(operator, Number(firstOperand), Number(secondOperand))
        displayValue = result
    if (result === "Wthelly") {
        display.textContent = "Wthelly"  
        setTimeout(() => {
            resetCalculator() 
        }, 1500)
        return
}
    if (result.toString().split(".")[1]) {
    displayValue = parseFloat(result.toFixed(5))
}
    display.textContent = displayValue
    justCalculated = true 
    firstOperand = result
    operator = null
    }
}

function handleBackspace() {
    if (displayValue.length === 1) {
        displayValue = "0"
    } else {
        displayValue = displayValue.slice(0, -1)
    }
    display.textContent = displayValue
}

function handleDecimal() {
    if (displayValue.includes(".")) {
        return
    } else {
        displayValue = displayValue + "."
        display.textContent = displayValue
    }
}

function handlePlusMinus() {
    displayValue = Number(displayValue) * (-1)
    display.textContent = displayValue
}

document.addEventListener("keydown", (e) => {
    if ("0123456789".includes(e.key)) {
        handleDigit(e.key)
    } else if ("+-*/".includes(e.key)) {
        handleOperator(e.key)
    } else if (e.key === "Enter") {
        handleEqual()
    } else if (e.key === "Backspace") {
        handleBackspace()
    } else if (e.key === ".") {
        handleDecimal()
    } else if (e.key === "c") {
        resetCalculator()
    }
})