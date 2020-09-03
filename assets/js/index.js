class Calculator {
  constructor() {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  appendNumber(number) {
    const dot = 1;
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOp(operation) {
    if (this.currentOperand === "" && this.previousOperand !== "") {
      this.compute();
      this.operation = operation;
    } else if (this.previousOperand !== "") {
      this.compute();
      this.operation = operation;
    } else if (this.currentOperand !== "") {
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }
  }
  equal() {
    let equal = 1;
    this.compute(equal);
    if (this.previousOperand !== "") this.currentOperand = this.previousOperand;
    this.previousOperand = "";
    this.operation = undefined;
  }
  compute(equal) {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    if (this.currentOperand !== "" && this.previousOperand !== "") {
      this.previousOperand = computation;
      this.currentOperand = "";
      if (equal) this.operation = undefined;
    } else {
      this.currentOperand = computation;
      this.previousOperand = "";
      this.operation = undefined;
    }
  }
  getDisplayNumber(number) {
    let string = number.toString();
    let integer = parseFloat(string.split(".")[0]);
    let decimal = string.split(".")[1];
    let integerDisplay;
    if (isNaN(integer)) {
      integerDisplay = "";
    } else {
      integerDisplay = integer.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimal !== undefined) {
      return `${integerDisplay}.${decimal}`;
    } else return integerDisplay;
  }

  updateDisplay() {
    this.currentText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation !== undefined) {
      this.previousText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else
      this.previousText.innerText = this.getDisplayNumber(this.previousOperand);
  }
}

const grid = document.querySelector(".calc-grid");
const previousText = document.querySelector("[data-previous]");
const currentText = document.querySelector("[data-current]");

const calculator = new Calculator();

grid.addEventListener("click", (object) => {
  let target = object.target;
  if (target.getAttribute("data-number") !== null) {
    calculator.appendNumber(target.innerText);
    calculator.updateDisplay();
  } else if (target.getAttribute("data-operation") !== null) {
    calculator.chooseOp(target.innerText);
    calculator.updateDisplay();
  } else if (target.getAttribute("data-equals") !== null) {
    let equal = 1;
    calculator.equal();
    calculator.updateDisplay();
  } else if (target.getAttribute("data-ac") !== null) {
    calculator.clear();
    calculator.updateDisplay();
  } else if (target.getAttribute("data-delete") !== null) {
    calculator.delete();
    calculator.updateDisplay();
  }
});
