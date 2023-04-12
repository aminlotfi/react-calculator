import {ACTIONS} from "../Templates/Calculator/Calculator";

const OperationButton = ({operation, dispatch}) => {
    return (
        <button
            onClick={() => dispatch({type: ACTIONS.SELECT_OPERATOR, payload: {operation}})}
            className="flex item-center justify-center bg-orange-400 hover:bg-orange-500 p-4 rounded-[10px] text-xl">
            {operation}
        </button>
    )
}

export default OperationButton
