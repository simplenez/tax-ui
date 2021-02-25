import React, {useState} from "react";
import CalcHistory from "./CalcHistory";

export default function BracketedHistoryCalculator() {
    const [historySize, setHistorySize] = useState(100);
    const [counter, setCounter] = useState(1);
    const [calcHistory, setCalcHistory] = useState([]);
    const [taxYear, setTaxYear] = useState(2020);
    const [income, setIncome] = useState(0);

    function calculateTax() {
        ensureHistorySize();
        setCounter(counter + 1);
        fetch(`http://localhost:9090/tax/${taxYear}/${income}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    let msg = "Unknown error";
                    if (res.status === 404) {
                        msg = 'Invalid tax year.'
                    } else if (res.status === 400) {
                        msg = 'Invalid resource path.'
                    }
                    throw new Error(msg);
                }
            })
            .then((data) => {
                setCalcHistory([{id: counter, ...data}, ...calcHistory]);
            })
            .catch((error) => {
                alert("Failed to calculate tax.  Cause: " + error.message);
                console.log(error);
            })
    }

    function ensureHistorySize() {
        const newSize = historySize - 1;
        if (calcHistory.length > newSize) {
            calcHistory.length = newSize;
            setCalcHistory([...calcHistory]);
        }
    }

    function taxYearChangeHandler(event) {
        const val = parseFloat(event.target.value);
        if (!isNaN(val) && val > 0) {
            setTaxYear(val);
        }
    }

    function incomeChangeHandler(event) {
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

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            calculateTax();
        }
    }

    return (
        <div id="container">
            <div id="input-data">
                <label htmlFor="taxYear">Tax year </label>
                <input id="taxYear" type="number" onChange={taxYearChangeHandler} onFocus={focusHandler}
                       value={taxYear} onKeyUp={handleKeyUp}/>
                <label htmlFor="income">Income </label>
                <input id="income" type="number" onChange={incomeChangeHandler} onFocus={focusHandler}
                       onKeyUp={handleKeyUp}/>
                <button type="button" onClick={calculateTax}>Calculate</button>
            </div>
            <div id="history-container">
                <div id="history-count">
                    <label htmlFor="historySize">History to keep</label>
                    <input id="historySize" type="number" onChange={setSizeHandler} onBlur={resizeHandler}
                           onFocus={focusHandler} size="3" style={{width: "3em"}}
                           value={historySize}/>
                </div>
                <CalcHistory calcHistory={calcHistory}/>
            </div>
        </div>
    );
}
