const display = document.getElementById("display");

let shouldReset = false;  

function appendValue(value) {
  if (shouldReset) {
    if (isOperator(value)) {
      shouldReset = false;
    } else {
      display.value = "";
      shouldReset = false;
    }
  }
  if (display.value === "0" && !isOperator(value)) {
    display.value = value;
  } else {
    display.value += value;
  }
} 

function isOperator(val) {
  return ["+", "-", "*", "/", "%"].includes(val);
}

function clearDisplay() {
  display.value = "0";
  shouldReset = false;
}

function deleteLast() {
  display.value = display.value.slice(0, -1) || "0";
}
 
function calculate() {  
  try {
    let result = eval(display.value);
    result = Math.round(result * 100) / 100;
    display.value = Number.isInteger(result)
      ? result.toString()
      : result.toFixed(2);
    shouldReset = true; // Sonuç gösterildi, bir sonraki sayı ekranı temizlemeli
  } catch {
    display.value = "Hata";
    shouldReset = true;
  }
}

document.addEventListener("keydown", function (e) {
  const allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", ".", "Enter", "Backspace", "Delete", "Escape", "%"
  ];

  if (allowedKeys.includes(e.key)) {
    e.preventDefault(); // Varsayılan davranışı engelle (özellikle Enter vs.)
    
    if (e.key === "Enter") {
      calculate();
    } else if (e.key === "Backspace") {
      deleteLast();
    } else if (e.key === "Delete" || e.key === "Escape") {
      clearDisplay();
    } else {
      appendValue(e.key);
    }
  } else { 
    e.preventDefault();
  }
});
