let sum = [];

// this clears the calculator 'screen'
function clearDisplay() {
	document.getElementById("screen").textContent = "";
	sum = [];
}

// this solves the equation
function operate(sum) {
	if (sum.includes("+")) {
		// index of + operator
		const a = sum.indexOf("+");
		// everything higher than a
		const firstNumber = Number(sum.slice(0, a).join(""));
		// everything lower than a
		const secondNumber = Number(sum.slice(a + 1).join(""));
		const answer = firstNumber + secondNumber;
		document.getElementById("screen").textContent = Math.round(answer * 100) / 100;
		return Math.round(answer);
	}
	else if (sum.includes("-")) {
		if (sum.includes("-")) {
			const a = sum.indexOf("-");
			const firstNumber = Number(sum.slice(0, a).join(""));
			const secondNumber = Number(sum.slice(a + 1).join(""));
			const answer = firstNumber - secondNumber;
			document.getElementById("screen").textContent = Math.round(answer * 100) / 100;
			return Math.round(answer);
		}
	}
	else if (sum.includes("×")) {
		if (sum.includes("×")) {
			const a = sum.indexOf("×");
			const firstNumber = Number(sum.slice(0, a).join(""));
			const secondNumber = Number(sum.slice(a + 1).join(""));
			const answer = firstNumber * secondNumber;
			document.getElementById("screen").textContent = Math.round(answer * 100) / 100;
			return Math.round(answer);
		}
	} else if (sum.includes("÷")) {
		if (sum.includes("÷")) {
			const a = sum.indexOf("÷");
			const firstNumber = Number(sum.slice(0, a).join(""));
			const secondNumber = Number(sum.slice(a + 1).join(""));
			if (secondNumber === 0) {
				document.getElementById("screen").textContent = "Error!";
				return;
			} else {
				const answer = firstNumber / secondNumber;
				document.getElementById("screen").textContent = Math.round(answer * 100) / 100;
				return Math.round(answer);
			};
		};
	};
	clearDisplay();
};

const button = document.querySelectorAll(".btn");
const equals = document.getElementById("equals");
const ac = document.getElementById("ac");
const decimal = document.getElementById("decimal");
const operator = document.querySelectorAll(".operator");
const backspace = document.getElementById("backspace");
const regexList = /[+\-×÷]/;
const allowedKeycodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 120, 43, 45];
const numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const operatorKeycodes = [120, 43, 45, 47];
const equalsKeycode = 61;
var hasOperator = false;

window.addEventListener('keypress', function(e) {

	var keycode = e.which || e.keyCode;
	var valueEntered = String.fromCharCode(keycode);
	console.log(keycode);

	if (keycode === 120) {
		var valueEntered = "×";
	};

	if (keycode === 47) {
		var valueEntered = "÷";
	};

	if (numbers.includes(keycode)) {
		sum.push(valueEntered);
		document.getElementById("screen").textContent = sum.join("");
	};
    
	if (operatorKeycodes.includes(keycode)) {
		if (hasOperator) {
			operate(sum);
			const onDisplay = document.getElementById("screen").textContent;
			sum = [];
			sum.push(onDisplay, valueEntered);
		} else {
			sum.push(valueEntered);
			document.getElementById("screen").textContent = sum.join("");
		};
		var hasOperator = true;
	};
        
	if (keycode === equalsKeycode) {
		var hasOperator = false;
		operate(sum);
		const onDisplay = document.getElementById("screen").textContent;
		sum = [];
		sum.push(onDisplay);
	}
});

operator.forEach((operator) => {
	operator.addEventListener("click", (e) => {
		// if sum array does not include any operators
		if (!sum.find(x => x.match(regexList))) {
			sum.push(e.target.innerText);
			document.getElementById("screen").textContent = sum.join("");
		} else {
			operate(sum);
			const onDisplay = document.getElementById("screen").textContent;
			sum = [];
			sum.push(onDisplay, e.target.innerText);
		}
	});
});


decimal.addEventListener("click", (e) => {
	// if the sum array doesn't have a decimal;
	if (!sum.includes(".")) {
		// let it add the decimal
		sum.push(e.target.innerText);
		document.getElementById("screen").textContent = sum.join("");
	}
	// below is a loop for the sum array
	sum.forEach((item) => {
		// if the operators are within the array
		if (item === "+" || item === "-" || item === "×" || item === "÷") {
			// find index of operator
			const a = sum.indexOf(item);
			// slice second half of equation
			const secondHalf = sum.slice(a + 1);
			// if the second half doesn't have a decimal
			if (!secondHalf.includes(".")) {
				// let it add the decimal
				sum.push(e.target.innerText);
				document.getElementById("screen").textContent = sum.join("");
			};
		};
	});
});

// this clears the screen before running the operate function
equals.addEventListener("click", (e) => {
	// if the sum array doesn't include any operators
	if (!sum.find(x => x.match(regexList))) {
		// do nothing
	} else {
		document.getElementById("screen").textContent = "";
		operate(sum);
	}
});

ac.addEventListener("click", (e) => {
	clearDisplay();
});

backspace.addEventListener("click", () => {
	sum.pop();
	document.getElementById("screen").textContent = sum.join("");
});

// add a listener to every button
button.forEach((button) => {
	button.addEventListener("click", (e) => {
		if (sum.length >= 9) {
			return;
		} else {
			sum.push(e.target.innerText);
			document.getElementById("screen").textContent = sum.join("");
		}
	});
});