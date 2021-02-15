import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { initWebSocketConnection } from "./ducks"

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
function ClacScreen(): JSX.Element {
    const { currentNumber, error } = useSelector((state: RootState) => state.calculatorReducer)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(initWebSocketConnection())
    })

    return (
        <>
            <div className="calc-screen">
                <p>{currentNumber}</p>
            </div>
            <p className="calc-error">{error}</p>
        </>
    )
}

export default ClacScreen