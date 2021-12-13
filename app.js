const historyEl = document.querySelector(".history");
const inputEl = document.querySelector(".input");
const numbersEl = document.querySelectorAll(".key-num");
const signsEl = document.querySelectorAll(".key-sign");
const deleteOneEl = document.querySelector(".delete");
const deleteAllEl = document.querySelector(".delete-all");

let currentNumber = "";
let previousNumber = "";
let currentOpretion = null;
let previousOpretion = null;
let result = 0;

function getNumbers(e) {
  const inputNumber = e.target.textContent;
  if (currentNumber.length > 16) return;
  if (currentNumber.startsWith("0")) currentNumber = "";
  if (inputNumber === "0" && currentNumber.startsWith("0")) return;
  if (inputNumber === "." && currentNumber.includes(".")) return;

  currentNumber += inputNumber;
  inputEl.textContent = currentNumber;
}

function getSign(e) {
  const inputSign = e.target.textContent;

  if (currentNumber === "") return;
  if (inputSign === "=") {
    setResult(previousNumber, currentOpretion, currentNumber);
    showResult();
    return;
  }

  if (!previousNumber) {
    previousNumber = currentNumber;
    currentNumber = "";
    inputEl.textContent = currentNumber;
    currentOpretion = inputSign;
    setResult(previousNumber, currentOpretion, 0);
    setHistory(previousNumber, currentOpretion);
  } else {
    setResult(previousNumber, currentOpretion, currentNumber);
    previousNumber = result;
    currentNumber = "";
    inputEl.textContent = currentNumber;
    currentOpretion = inputSign;
    setHistory(previousNumber, currentOpretion);
  }
}

function setResult(prevNumber, oparetor, currNumber) {
  const currNum = parseFloat(currNumber);
  const preNum = parseFloat(prevNumber);
  switch (oparetor) {
    case "+":
      result = preNum + currNum;
      break;
    case "−":
      result = preNum - Math.abs(currNum);
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

function setHistory(number, operator) {
  historyEl.innerHTML = "";
  historyEl.innerHTML = `
  <span class="history-number">${number}</span>
  <span class="history-sign">${operator}</span>
  `;
}

function showResult() {
  setResult(previousNumber, currentOpretion, currentNumber);
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
  number.addEventListener("click", getNumbers);
});

signsEl.forEach((sign) => {
  sign.addEventListener("click", getSign);
});

deleteAllEl.addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  currentOpretion = null;
  result = 0;
  inputEl.textContent = "";
  historyEl.textContent = "";
});

deleteOneEl.addEventListener("click", deleteOneInput);
