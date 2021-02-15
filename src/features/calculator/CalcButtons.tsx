import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppThunk, RootState } from "../../store";
import { allClear, negation, percentDecimal, updateCurrentSymbol, checkAndUpdateCurrentNumber, sendCalculation } from "./ducks";

function CalcButtons(): JSX.Element {
    const { currentSymbol, initCalc } = useSelector((state: RootState) => state.calculatorReducer)
    const dispatch: AppDispatch = useDispatch();
    const thunkDispatch: AppThunk = useDispatch();

    return (
        <div className="btn-container">
            <div className="btn-row">
                <button onClick={() => dispatch(allClear())}>AC</button>
                <button onClick={() => dispatch(negation())}>+/-</button>
                <button onClick={() => dispatch(percentDecimal())}>%</button>
                <button
                    className={currentSymbol === '/' ? 'selected-symbol' : ''}
                    onClick={() => dispatch(updateCurrentSymbol('/'))}
                >
                    /
                </button>
            </div>
            <div className="btn-row">
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('7'))}>7</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('8'))}>8</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('9'))}>9</button>
                <button
                    className={currentSymbol === '*' ? 'selected-symbol' : ''}
                    onClick={() => dispatch(updateCurrentSymbol('*'))}
                >
                    x
                </button>
            </div>
            <div className="btn-row">
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('4'))}>4</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('5'))}>5</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('6'))}>6</button>
                <button
                    className={currentSymbol === '-' ? 'selected-symbol' : ''}
                    onClick={() => dispatch(updateCurrentSymbol('-'))}
                >
                    -
                </button>
            </div>
            <div className="btn-row">
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('1'))}>1</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('2'))}>2</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('3'))}>3</button>
                <button
                    className={currentSymbol === '+' ? 'selected-symbol' : ''}
                    onClick={() => dispatch(updateCurrentSymbol('+'))}
                >
                    +
                </button>
            </div>
            <div className="btn-row">
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('0'))} className="double-wide-btn">0</button>
                <button onClick={() => dispatch(checkAndUpdateCurrentNumber('.'))}>.</button>
                <button
                    disabled={currentSymbol === null || !initCalc}
                    onClick={() => { thunkDispatch(sendCalculation()) }}>
                =</button>
            </div>
        </div>
    )
}

export default CalcButtons