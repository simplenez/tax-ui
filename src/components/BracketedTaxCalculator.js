import React, {useState} from "react";
import CalcHistory from "./CalcHistory";

export default function BracketedHistoryCalculator() {
    const [historySize, setHistorySize] = useState(3);
    const [counter, setCounter] = useState(1);
    const [calcHistory, setCalcHistory] = useState([]);
    const [income, setIncome] = useState(0);

    function calculateTax() {
        ensureHistorySize();
        setCounter(counter + 1);
        setCalcHistory([{id: counter, income: income}, ...calcHistory]);
    }

    function ensureHistorySize() {
        const newSize = historySize - 1;
        if (calcHistory.length > newSize) {
            calcHistory.length = newSize;
            setCalcHistory([...calcHistory]);
        }
    }

    function changeHandler(event) {
        const val = parseFloat(event.target.value);
        if (!isNaN(val)) {
            setIncome(val);
        }
    }

    function setSizeHandler(event) {
        const val = parseFloat(event.target.value);
        if (!isNaN(val) && val >= 1) {
            setHistorySize(val);
        }
    }

    function resizeHandler() {
        if (historySize >= 1 && calcHistory.length > historySize) {
            calcHistory.length = historySize;
            setCalcHistory([...calcHistory]);
        }
    }

    function focusHandler(event) {
        event.target.select();
    }

    return (
        <div id="container">
            <div id="input-data">
                <label htmlFor="income">Income: </label>
                <input id="income" type="number" onChange={changeHandler} onFocus={focusHandler} />
                <button type="button" onClick={calculateTax}>Calculate</button>
            </div>
            <div id="history-container">
                <div id="history-count">
                    <label htmlFor="historySize">History to keep: </label>
                    <input id="historySize" type="number" onChange={setSizeHandler} onBlur={resizeHandler}
                           onFocus={focusHandler} size="3" style={{width: "3em"}}
                           value={historySize}/>
                </div>
                <CalcHistory calcHistory={calcHistory}/>
            </div>
        </div>
    );
}
