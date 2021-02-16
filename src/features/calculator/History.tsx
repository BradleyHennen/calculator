import { useSelector } from "react-redux"
import { RootState } from "../../store"

function History(): JSX.Element {
    const { history } = useSelector((state: RootState) => state.calculatorReducer)

    return (
        <div className="history-container">
            <h2>Calculation History</h2>
            <ul>
                {history.map((res, index): JSX.Element => {
                    return (
                        <li key={index}>{res.equation}</li>
                    )
                })}
            </ul>
        </div>)
}

export default History