import React from "react";

export default function CalcHistory(props) {
    function renderCalcHistory() {
        return props.calcHistory.map(calc => {
            return <tr key={calc.id}>
                <td>{calc.id}</td>
                <td>{calc.year}</td>
                <td>{calc.incomeDisplay}</td>
                <td>{calc.taxDisplay}</td>
            </tr>
        });
    }

    return (
        <table id="historyTable">
            <thead>
                <tr key={0}>
                    <th>ID</th>
                    <th>Year</th>
                    <th>Income</th>
                    <th>Tax</th>
                </tr>
            </thead>
            <tbody>
                {renderCalcHistory()}
            </tbody>
        </table>
    );
}
