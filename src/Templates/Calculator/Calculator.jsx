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
            if (payload.number === '.' && !state.currentOperand) return {
                ...state,
                overwrite: false,
                currentOperand: '0.'
            };
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
    const current = currentOperand === '0.' || +currentOperand
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
    const [integer, decimal] = number.toString().split('.')
    if (decimal == null) {
        return FORMATTER.format(integer)
    }
    return `${FORMATTER.format(integer)}.${decimal}`
}

const FORMATTER = new Intl.NumberFormat("en-us", {maximumFractionDigits: 0,})

const Calculator = () => {
    const [{currentOperand, prevOperand, operation}, dispatch] = useReducer(reducer, {});

    return <div className="flex items-center justify-center w-full h-[calc(100vh-165px)]">
        <div className="flex flex-col items-center justify-start p-4 bg-white rounded-xl w-full max-w-[500px] select-none ">
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
                {['/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+'].map(el =>
                    typeof el === 'number'
                        ? <NumberButton key={el} number={el} dispatch={dispatch} />
                        : <OperationButton key={el} operation={el} dispatch={dispatch} />
                )}
                <NumberButton customClasses={'col-span-2'} number={0} dispatch={dispatch}/>
                <NumberButton number={'.'} dispatch={dispatch}/>
                <button
                    onClick={() => dispatch({type: ACTIONS.CALCULATE})}
                    className="flex item-center justify-center bg-green-500 hover:bg-green-600 p-4 rounded-[10px] text-xl">
                    =
                </button>
            </div>
        </div>
    </div>
}

export default Calculator;