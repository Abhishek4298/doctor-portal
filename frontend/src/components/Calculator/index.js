import { useState } from 'react';

require('./calculator.css')
const Calculator = () => {
    const [display, setDisplay] = useState("ss")
    const result = "1234";

    const onChange = (e) => {
        e.preventDefault();
        alert("asddas")
    }
    return (<>

        <h2> Calculator</h2>
        <div className="result">
            <p>{result}</p>
        </div>

        <div className="button">
            <button name="(" value={display} onClick={e => (e.target.name)} onChange={onChange}>(</button>
            <button name="CE" value={display} onClick={e => (e.target.name)} onChange={onChange}>CE</button>
            <button name=")" value={display} onClick={e => (e.target.name)} onChange={onChange}>)</button>
            <button name="C" value={display} onClick={e => (e.target.name)} onChange={onChange}>C</button><br />

            <button name="1" value={display} onClick={e => (e.target.name)} onChange={onChange}>1</button>
            <button name="2" value={display} onClick={e => (e.target.name)} onChange={onChange}>2</button>
            <button name="3" value={display} onClick={e => (e.target.name)} onChange={onChange}>3</button>
            <button name="+" value={display} onClick={e => (e.target.name)} onChange={onChange}>+</button><br />


            <button name="4" value={display} onClick={e => (e.target.name)} onChange={onChange}>4</button>
            <button name="5" value={display} onClick={e => (e.target.name)} onChange={onChange}>5</button>
            <button name="6" value={display} onClick={e => (e.target.name)} onChange={onChange}>6</button>
            <button name="-" value={display} onClick={e => (e.target.name)} onChange={onChange}>-</button><br />

            <button name="7" value={display} onClick={e => (e.target.name)} onChange={onChange}>7</button>
            <button name="8" value={display} onClick={e => (e.target.name)} onChange={onChange}>8</button>
            <button name="9" value={display} onClick={e => (e.target.name)} onChange={onChange}>9</button>
            <button name="*" value={display} onClick={e => (e.target.name)} onChange={onChange}>x</button><br />


            <button name="." value={display} onClick={e => (e.target.name)} onChange={onChange}>.</button>
            <button name="0" value={display} onClick={e => (e.target.name)} onChange={onChange}>0</button>
            <button name="=" value={display} onClick={e => (e.target.name)} onChange={onChange}>=</button>
            <button name="/" value={display} onClick={e => (e.target.name)} onChange={onChange}>÷</button><br />
        </div>

    </>);
}

export default Calculator;