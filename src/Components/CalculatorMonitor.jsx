const CalculatorMonitor = ({ currentOperand, prevOperand, operation }) => {
    return (
        <div className="flex flex-col items-end justify-between w-full px-4 py-5 rounded-md mb-4 min-h-[112px]">
            <div className="text-md mb-3">{prevOperand} {operation}</div>
            <div className="text-3xl whitespace-pre-wrap break-all">{currentOperand}</div>
        </div>
    )
}

export default CalculatorMonitor