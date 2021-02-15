import CalcButtons from "../CalcButtons";
import ClacScreen from "../CalcScreen";
import History from '../History';


function Calculator(): JSX.Element {

    return (
        <div className="calc-container">
            <ClacScreen />
            <CalcButtons />
            <History />
        </div>
    )
}

export default Calculator;