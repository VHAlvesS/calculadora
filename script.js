
class Calcutator {
    constructor() {
        // Atributos
        this.actualNumber;
        this.previousNumber;
        this.operatorSignal;
        this.operators = ['%','/','x','-','+','='];

        // Elementos no HTML
        this.calculatorPad = document.querySelector('.keys');
        this.numberPad = document.querySelector('.display');
        this.displayInput = document.querySelector('#displayNumbers');
        this.PrevNumberHtml = document.querySelector('#PrevValue');

        // EventListeners
        this.calculatorPad.addEventListener('click', this.numberPadDisplay.bind(this));
        this.displayInput.addEventListener('input', this.insertingNumbersViaPad.bind(this));

    }

    // Metodos

    numberTransformator = (number) => parseFloat(number);

    removingPoints = function () {
        if (this.displayInput.value.lastIndexOf('.') !== this.displayInput.value.indexOf('.')) {
            let newInputValue = this.displayInput.value.slice(0, -1);
            this.displayInput.value = newInputValue;
        }
    }

    numberPadDisplay = function(e) {
        if (e.target.classList.contains('numberKey')) {
            
            if(e.target.textContent === '.' && this.displayInput.value.includes('.')) {
                this.removingPoints();
                return
            }
            let newInputValue = String(this.displayInput.value + e.target.textContent)
            this.displayInput.value = newInputValue;
        }
        
        if (e.target.classList.contains('opKey')) {
            if(e.target.textContent === 'C'){

                if(this.displayInput.value === '') { 
                    this.operatorSignal = undefined;
                    this.previousNumber = 0;
                    this.PrevNumberHtml.textContent = `Previous value:`;
                }

                if(this.displayInput.value !== '') { 
                    this.displayInput.value = this.displayInput.value.slice(0, -1);
                }

            }
            if(e.target.textContent === 'AC'){
                this.actualNumber = 0;
                this.previousNumber = 0;
                this.operatorSignal = undefined;
                this.displayInput.value = '';
                this.PrevNumberHtml.textContent = `Previous value:`;
            }
            else {
                this.Operation(e.target.textContent);
            }
        }
    }

    insertingNumbersViaPad = function(e) {
        this.removingPoints();
        if(e.data === ',') {  
            if (!this.displayInput.value.includes('.')) {
                this.displayInput.value = this.displayInput.value.replace(',','.');
            }
            else {
                this.displayInput.value = this.displayInput.value.slice(0, -1);
            }
        }
    }

    Operation = function (operator) {
        // this.operators.includes(operator)
        if(operator !== 'C' && operator !== 'AC') {
        if (this.operators.includes(operator) && operator !== '=') {
            this.operatorSignal = operator;
        }

        if (!this.previousNumber && operator !== '=') {
            this.previousNumber = parseFloat(this.displayInput.value);
            this.displayInput.value = '';
            this.PrevNumberHtml.textContent = `Previous value: ${this.previousNumber}`
            if(this.operatorSignal !== '%') return;
        }

        this.actualNumber = parseFloat(this.displayInput.value);

        if (this.previousNumber && this.operatorSignal && typeof this.actualNumber === 'number' || this.operatorSignal === '%' && operator === '=') {
            switch (this.operatorSignal) {
                case '+':
                    this.displayInput.value = this.actualNumber + this.previousNumber;
                    this.operationCalc();
                    break;
                case '-':
                    this.displayInput.value = this.previousNumber - this.actualNumber;
                    this.operationCalc();
                    break;
                case 'x':
                    this.displayInput.value = this.actualNumber * this.previousNumber;
                    this.operationCalc();
                    break;
                case '/':
                    this.displayInput.value = this.previousNumber / this.actualNumber;
                    this.operationCalc();
                        break;
                case '%':
                    this.displayInput.value = this.previousNumber / 100;
                    this.operationCalc();
                        break;
            }
        }
    }
    }

    operationCalc = function (op) {
            this.actualNumber = 0;
            this.previousNumber = 0;
            this.operatorSignal = undefined;
            this.PrevNumberHtml.textContent = `Previous value:`;
    }

}

const CalculatorInstance = new Calcutator();