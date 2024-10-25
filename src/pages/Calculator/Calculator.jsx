import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState('');
  const [lastOperator, setLastOperator] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [awaitingNextInput, setAwaitingNextInput] = useState(false);

 
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      
      if (!isNaN(key) || key === '.') {
        appendNumber(key);
      }

      
      switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
          appendOperator(key);
          break;
        case 'Enter': 
        case '=':
          calculate();
          break;
        case 'Backspace':
          deletel();
          break;
        case 'Escape': 
          clearEntry();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentInput, previousInput, operator]);

  const appendNumber = (number) => {
    if (awaitingNextInput) {
      setCurrentInput(number);
      setAwaitingNextInput(false);
    } else {
      if (number === '.' && currentInput.includes('.')) return;
      if (currentInput.length >= 9 && number !== '.') return;
      if (currentInput === '0' && number !== '.') {
        setCurrentInput(number);
      } else {
        setCurrentInput(currentInput + number);
      }
    }
    updateClearButton();
  };

  const appendOperator = (op) => {
    if (currentInput === '') return;
    if (previousInput !== '') {
      calculate(); // Calculate before applying the next operator
    } else {
      setPreviousInput(currentInput); // Save the current input
    }
    setOperator(op);
    setAwaitingNextInput(true); // Await the next number input
  };

  const calculate = () => {
    if (!previousInput && lastNumber) {
      setPreviousInput(currentInput);
      setOperator(lastOperator);
      setCurrentInput(lastNumber);
    } else if (!currentInput) {
      setCurrentInput(previousInput);
    }
    if (!previousInput || !currentInput || !operator) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
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
        result = prev / current;
        break;
      default:
        return;
    }

    const formattedResult = result.toString().substring(0, 9);
    setCurrentInput(formattedResult);
    setLastNumber(currentInput);
    setLastOperator(operator);
    setPreviousInput('');
    setOperator('');
    setAwaitingNextInput(false); // Reset flag after calculation
    updateClearButton();
  };

  const clearEntry = () => {
    if (currentInput) {
      setCurrentInput('');
    } else {
      setCurrentInput('');
      setPreviousInput('');
      setOperator('');
      setLastNumber('');
      setLastOperator('');
    }
    updateClearButton();
  };

  const deletel = () => {
    setCurrentInput(currentInput.slice(0, -1) || '0');
    updateClearButton();
  };

  const updateClearButton = () => {
    const clearButton = document.querySelector('.CE');
    if (currentInput || previousInput) {
      clearButton.innerText = 'C';
    } else {
      clearButton.innerText = 'CE';
    }
  };

  useEffect(() => {
    updateClearButton();
  }, [currentInput, previousInput]);

  return (
    <div className="calculator">
      <div className="display">{currentInput || '0'}</div>
      <div className="buttons">
        <button className="memory">MC</button>
        <button className="memory">MR</button>
        <button className="memory">M+</button>
        <button className="memory">M-</button>
        <button className="special CE" onClick={clearEntry}>CE</button>

        <button className="number" onClick={() => appendNumber('7')}>7</button>
        <button className="number" onClick={() => appendNumber('8')}>8</button>
        <button className="number" onClick={() => appendNumber('9')}>9</button>
        <button className="operator-button" onClick={() => appendOperator('/')}>÷</button>
        <button className="operator">√</button>

        <button className="number" onClick={() => appendNumber('4')}>4</button>
        <button className="number" onClick={() => appendNumber('5')}>5</button>
        <button className="number" onClick={() => appendNumber('6')}>6</button>
        <button className="operator" onClick={() => appendOperator('*')}>×</button>
        <button className="operator">%</button>

        <button className="number" onClick={() => appendNumber('1')}>1</button>
        <button className="number" onClick={() => appendNumber('2')}>2</button>
        <button className="number" onClick={() => appendNumber('3')}>3</button>
        <button className="operator" onClick={() => appendOperator('-')}>−</button>
        <button className="operator">1/x</button>

        <button className="number" onClick={() => appendNumber('0')}>0</button>
        <button className="number" onClick={() => appendNumber('.')}>.</button>
        <button className="number">+/-</button>
        <button className="operator-button" onClick={() => appendOperator('+')}>+</button>
        <button className="operator" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
