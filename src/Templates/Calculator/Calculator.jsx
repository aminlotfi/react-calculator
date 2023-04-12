import CalculatorMonitor from "../../Components/CalculatorMonitor";
import {useReducer} from "react";
import NumberButton from "../../Components/NumberButton";
import OperationButton from "../../Components/OperationButton";

export const ACTIONS = {
    SELECT_NUMBER: 'select-number',
    SELECT_OPERATOR: 'select-operator',
    CALCULATE: 'calculate',
    CLEAR: 'clear',
    DELETE_NUMBER: 'delete-number',
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SELECT_NUMBER:
            return {
                ...state,
                currentOperand: `${state.currentOperand || '0'}${action.payload}`,
            }
    }
}

const Calculator = () => {
    const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {});

    return <div className="flex flex-col items-center justify-start p-4 bg-white rounded-xl w-full max-w-[500px]">
        <CalculatorMonitor currentOperand={currentOperand} prevOperand={prevOperand} operation={operation}/>
        <div className="grid grid-cols-4 gap-4 w-full">
            <button className="col-span-2 flex item-center justify-center bg-gray-300 hover:bg-gray-400 p-4 rounded-[10px] text-xl">AC</button>
            <button className="flex item-center justify-center bg-gray-300 hover:bg-gray-400 p-4 rounded-[10px] text-xl">C</button>
            <OperationButton operation={'/'} dispatch={dispatch} />
            <NumberButton number={7} dispatch={dispatch}/>
            <NumberButton number={8} dispatch={dispatch}/>
            <NumberButton number={9} dispatch={dispatch}/>
            <OperationButton operation={'*'} dispatch={dispatch} />
            <NumberButton number={4} dispatch={dispatch}/>
            <NumberButton number={5} dispatch={dispatch}/>
            <NumberButton number={6} dispatch={dispatch}/>
            <OperationButton operation={'-'} dispatch={dispatch} />
            <NumberButton number={1} dispatch={dispatch}/>
            <NumberButton number={2} dispatch={dispatch}/>
            <NumberButton number={3} dispatch={dispatch}/>
            <OperationButton operation={'+'} dispatch={dispatch} />
            <NumberButton number={0} dispatch={dispatch}/>
            <NumberButton number={'.'} dispatch={dispatch}/>
            <button className="col-span-2 flex item-center justify-center bg-green-500 hover:bg-green-600 p-4 rounded-[10px] text-xl">=</button>
        </div>
    </div>;
}

export default Calculator;