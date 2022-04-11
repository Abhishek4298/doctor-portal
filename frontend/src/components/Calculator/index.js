import { useState } from 'react'
import './calculator.css';

const Calculator = () => {
    const [data, setData] = useState("")
    const onNumberClick = (num) => {

        setData((str) => str ? str + num.toString() : num.toString())
    }
    const deleteButton = () => {
        setData(data.slice(0, -1))
    }
    const calculate = () => {
        if (data) {
            setData(eval(data))
        }
    }
    return (<>
        <div className="calculator-grid">
            <div className="output">
                <div className="current-operand">{data}</div>
            </div>
            <button onClick={() => setData("")} className="span-two">AC</button>
            <button onClick={deleteButton}>DEL</button>
            <button onClick={() => onNumberClick("/")}>÷</button>
            <button onClick={() => onNumberClick(1)}>1</button>
            <button onClick={() => onNumberClick(2)}>2</button>
            <button onClick={() => onNumberClick(3)}>3</button>
            <button onClick={() => onNumberClick("*")}>*</button>
            <button onClick={() => onNumberClick(5)}>5</button>
            <button onClick={() => onNumberClick(6)}>6</button>
            <button onClick={() => onNumberClick("+")}>+</button>
            <button onClick={() => onNumberClick(7)}>7</button>
            <button onClick={() => onNumberClick(8)}>8</button>
            <button onClick={() => onNumberClick(9)}>9</button>
            <button onClick={() => onNumberClick("-")}>-</button>
            <button onClick={() => onNumberClick(".")}>.</button>
            <button onClick={() => onNumberClick(0)}>0</button>
            <button
                // onKeyPress={(e) => e.key === 'Enter' && calculate()}
                onClick={calculate}
                className="span-two">=</button>
        </div>
    </>);
}

export default Calculator;