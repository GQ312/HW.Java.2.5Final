class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.lastOperation = '';
        this.updateDisplay();
    }

    updateDisplay() {
        // Форматируем число для отображения
        let displayValue = this.currentInput;
        
        // Ограничиваем количество символов на дисплее
        if (displayValue.length > 12) {
            if (displayValue.includes('e')) {
                displayValue = parseFloat(displayValue).toExponential(6);
            } else {
                displayValue = parseFloat(displayValue).toPrecision(10);
            }
        }
        
        this.display.value = displayValue;
    }

    appendNumber(number) {
        if (this.waitingForNewInput) {
            this.currentInput = number;
            this.waitingForNewInput = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.waitingForNewInput) {
            this.currentInput = '0.';
            this.waitingForNewInput = false;
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    appendOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator !== '') {
            const currentValue = this.previousInput || 0;
            const result = this.performCalculation();
            
            this.currentInput = String(result);
            this.previousInput = result;
        }

        this.waitingForNewInput = true;
        this.operator = nextOperator;
        this.updateDisplay();
    }

    performCalculation() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) return current;

        let result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Деление на ноль невозможно!');
                    return prev;
                }
                result = prev / current;
                break;
            default:
                return current;
        }

        // Округляем результат для избежания проблем с плавающей точкой
        return Math.round(result * 100000000000) / 100000000000;
    }

    calculate() {
        if (this.operator === '' || this.waitingForNewInput) {
            return;
        }

        const result = this.performCalculation();
        this.lastOperation = `${this.previousInput} ${this.operator} ${this.currentInput} = ${result}`;
        
        this.currentInput = String(result);
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = true;
        this.updateDisplay();
    }

    clearDisplay() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.updateDisplay();
    }

    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
    }

    deleteLast() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }
}

// Создаем экземпляр калькулятора
const calculator = new Calculator();

// Функции для обработки событий кнопок
function appendNumber(number) {
    calculator.appendNumber(number);
}

function appendDecimal() {
    calculator.appendDecimal();
}

function appendOperator(operator) {
    calculator.appendOperator(operator);
}

function calculate() {
    calculator.calculate();
}

function clearDisplay() {
    calculator.clearDisplay();
}

function clearEntry() {
    calculator.clearEntry();
}

function deleteLast() {
    calculator.deleteLast();
}

// Обработка клавиатуры
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Числа
    if (key >= '0' && key <= '9') {
        appendNumber(key);
        event.preventDefault();
    }
    
    // Операторы
    switch (key) {
        case '+':
            appendOperator('+');
            event.preventDefault();
            break;
        case '-':
            appendOperator('-');
            event.preventDefault();
            break;
        case '*':
            appendOperator('*');
            event.preventDefault();
            break;
        case '/':
            appendOperator('/');
            event.preventDefault();
            break;
        case '=':
        case 'Enter':
            calculate();
            event.preventDefault();
            break;
        case '.':
        case ',':
            appendDecimal();
            event.preventDefault();
            break;
        case 'Escape':
            clearDisplay();
            event.preventDefault();
            break;
        case 'Backspace':
            deleteLast();
            event.preventDefault();
            break;
        case 'Delete':
            clearEntry();
            event.preventDefault();
            break;
    }
});

// Предотвращаем выделение текста при быстрых кликах
document.addEventListener('selectstart', function(e) {
    if (e.target.classList.contains('btn')) {
        e.preventDefault();
    }
});

// Добавляем визуальную обратную связь для кнопок
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});