import {ACTIONS} from "../Templates/Calculator/Calculator";

const NumberButton = ({number, dispatch, customClasses}) => {
    return (
        <button
            onClick={() => dispatch({type: ACTIONS.SELECT_NUMBER, payload: {number}})}
            className={`flex item-center justify-center bg-gray-200 hover:bg-gray-300 p-4 rounded-[10px] text-xl ${customClasses}`}>
            {number}
        </button>
    )
}

export default NumberButton
