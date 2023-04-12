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

const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTIONS.SELECT_NUMBER:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: payload.number
                }
            }
            if (payload.number === '.' && state.currentOperand.includes('.')) return state;
            if (state.currentOperand === '0' && payload.number === '0') return state;
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.number}`,
            }
        case ACTIONS.SELECT_OPERATOR:
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            if (state.prevOperand != null) {
                return {
                    ...state,
                    prevOperand: calculate(state),
                    operation: payload.operation,
                    currentOperand: null
                }
            }
            return {
                ...state,
                prevOperand: state.currentOperand,
                operation: payload.operation,
                currentOperand: null
            }
        case ACTIONS.DELETE_NUMBER:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) return state
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CALCULATE:
            if (state.currentOperand == null || state.prevOperand == null || state.operation == null) return state
            return {
                ...state,
                overwrite: true,
                prevOperand: null,
                operation: null,
                currentOperand: calculate(state)
            }
        default:
            return state
    }
}

const calculate = ({currentOperand, prevOperand, operation}) => {
    const current = +currentOperand
    const previous = +prevOperand
    let result = ''
    switch (operation) {
        case '/':
            result = previous / current
            break
        case '*':
            result = previous * current
            break
        case '-':
            result = previous - current
            break
        case '+':
            result = previous + current
            break
        default:
            return
    }
    return result.toString()
}

const maskNumber = (number) => {
    if (number == null) return
    const [integer, decimal] = number.split('.')
    if (decimal == null) {
        return FORMATTER.format(integer)
    }
    return `${FORMATTER.format(integer)}.${decimal}`
}

const FORMATTER = new Intl.NumberFormat("en-us", {maximumFractionDigits: 0,})

const Calculator = () => {
    const [{currentOperand, prevOperand, operation}, dispatch] = useReducer(reducer, {});

    return <div className="flex flex-col items-center justify-start p-4 bg-white rounded-xl w-full max-w-[500px] select-none">
        <CalculatorMonitor currentOperand={maskNumber(currentOperand)} prevOperand={maskNumber(prevOperand)} operation={operation}/>
        <div className="grid grid-cols-4 gap-4 w-full">
            <button
                onClick={() => dispatch({type: ACTIONS.CLEAR})}
                className="col-span-2 flex item-center justify-center bg-gray-300 hover:bg-gray-400 p-4 rounded-[10px] text-xl">
                AC
            </button>
            <button
                onClick={() => dispatch({type: ACTIONS.DELETE_NUMBER})}
                className="flex item-center justify-center bg-gray-300 hover:bg-gray-400 p-4 rounded-[10px] text-xl">
                C
            </button>
            <OperationButton operation={'/'} dispatch={dispatch}/>
            <NumberButton number={7} dispatch={dispatch}/>
            <NumberButton number={8} dispatch={dispatch}/>
            <NumberButton number={9} dispatch={dispatch}/>
            <OperationButton operation={'*'} dispatch={dispatch}/>
            <NumberButton number={4} dispatch={dispatch}/>
            <NumberButton number={5} dispatch={dispatch}/>
            <NumberButton number={6} dispatch={dispatch}/>
            <OperationButton operation={'-'} dispatch={dispatch}/>
            <NumberButton number={1} dispatch={dispatch}/>
            <NumberButton number={2} dispatch={dispatch}/>
            <NumberButton number={3} dispatch={dispatch}/>
            <OperationButton operation={'+'} dispatch={dispatch}/>
            <NumberButton customClasses={'col-span-2'} number={0} dispatch={dispatch}/>
            <NumberButton number={'.'} dispatch={dispatch}/>
            <button
                onClick={() => dispatch({type: ACTIONS.CALCULATE})}
                className="flex item-center justify-center bg-green-500 hover:bg-green-600 p-4 rounded-[10px] text-xl">
                =
            </button>
        </div>
    </div>;
}

export default Calculator;