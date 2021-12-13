const historyEl = document.querySelector(".history");
const inputEl = document.querySelector(".input");
const numbersEl = document.querySelectorAll(".key-num");
const signsEl = document.querySelectorAll(".key-sign");
const deleteEl = document.querySelector(".delete");
const deleteAll = document.querySelector(".delete-all");

let result = 0;
let currentNumber = "";
let previousNumber = "";
let currentOperation = null;
let previousOperation = "";

function getNumber(e) {
  const inputNumber = e.target.textContent;
  if (currentNumber === "" && inputNumber === "0") return;
  if (inputNumber === "." && currentNumber.includes(".")) return;

  currentNumber += inputNumber;
  inputEl.textContent = currentNumber;
}

function getSign(e) {
  const inputSign = e.target.textContent;

  if (currentNumber === "") return;

  if (inputSign === "AC") return;

  if (inputSign === "=") {
    showResult();
    return;
  }

  if (currentOperation === null) {
    currentOperation = inputSign;
    setHistory(currentNumber, currentOperation);
    previousNumber = currentNumber;
    currentNumber = "";
    inputEl.textContent = "";
  } else if (currentOperation) {
    setResult(previousNumber, currentNumber, currentOperation);
    currentOperation = inputSign;
    setHistory(result, currentOperation);
    previousNumber = result;
    currentNumber = "";
    inputEl.textContent = currentNumber;
  }
}

function setResult(preNumber, currNumber, oparetor) {
  const currNum = parseFloat(currNumber);
  const preNum = parseFloat(preNumber);
  switch (oparetor) {
    case "+":
      result = preNum + currNum;
      break;
    case "−":
      result = preNum - currNum;
      break;
    case "×":
      result = preNum * currNum;
      break;
    case "÷":
      result = preNum / currNum;
      break;
    case "%":
      result = preNum % currNum;
      break;
  }
}

function setHistory(number, operation) {
  historyEl.textContent = "";
  const numberSapn = document.createElement("span");
  numberSapn.className = "history-number";
  numberSapn.textContent = number;
  const operationSapn = document.createElement("span");
  operationSapn.className = "history-sign";
  operationSapn.textContent = operation;
  historyEl.append(numberSapn, " ", operationSapn, " ");
}

function clearInput() {
  inputEl.textContent = "";
  currentNumber = "";
  currentOperation = null;
  previousNumber = "";
  historyEl.textContent = "";
}

function showResult() {
  setResult(previousNumber, currentNumber, currentOperation);
  historyEl.textContent = "";
  previousNumber = "0";
  currentNumber = result;
  inputEl.textContent = currentNumber;
  console.log(currentNumber);
}

function deleteOneInput() {
  currentNumber = currentNumber.slice(0, -1);
  inputEl.textContent = currentNumber;
}

numbersEl.forEach((number) => {
  number.addEventListener("click", getNumber);
});

signsEl.forEach((sign) => {
  if (sign.classList.contains("delete")) {
    sign.addEventListener("click", deleteOneInput);
  } else {
    sign.addEventListener("click", getSign);
  }
});

deleteAll.addEventListener("click", clearInput);
