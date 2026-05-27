const display = document.getElementById("display");
const previousOperation = document.getElementById("previous-operation");

let currentInput = "";


// Add Numbers & Operators

function appendValue(value) {

    if (display.innerText === "0" && value !== ".") {

        currentInput = value;

    } else {

        currentInput += value;
    }

    display.innerText = currentInput;

    // Smooth auto scroll
    display.scrollLeft = display.scrollWidth;
}


// Clear All

function clearDisplay() {

    currentInput = "";

    display.innerText = "0";

    previousOperation.innerText = "";
}


// Delete Last Character

function deleteLast() {

    currentInput = currentInput.slice(0, -1);

    if (currentInput === "") {

        display.innerText = "0";

    } else {

        display.innerText = currentInput;
    }

    display.scrollLeft = display.scrollWidth;
}


// Calculate Result

function calculate() {

    try {

        previousOperation.innerText = currentInput;

        currentInput = eval(currentInput).toString();

        display.innerText = currentInput;

        display.scrollLeft = display.scrollWidth;

    } catch {

        display.innerText = "Error";

        currentInput = "";
    }
}


// Keyboard Support

document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers & Operators

    if (

        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"

    ) {

        appendValue(key);
    }

    // Enter Key

    else if (key === "Enter") {

        calculate();
    }

    // Backspace Key

    else if (key === "Backspace") {

        deleteLast();
    }

    // Escape Key

    else if (key === "Escape") {

        clearDisplay();
    }
});