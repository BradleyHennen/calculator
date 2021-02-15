import { w3cwebsocket } from "websocket";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import {
  checkCalculate,
  updateCurrentNumber,
  updateHistory,
} from "./calculatorSlice";
import { RootState } from "../../../store";

interface IValues {
  answer: string;
  history: string;
}
const client = new w3cwebsocket("ws://localhost:5000");

export function sendCalculation(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch, getState) => {
    dispatch(checkCalculate());
    const state = getState().calculatorReducer;
    if (state.error.length === 0) {
      client.send(
        JSON.stringify({
          currentValue: state.currentValue,
          currentSymbol: state.currentSymbol,
          currentNumber: state.currentNumber,
        })
      );
    } else {
      console.error("error in equation");
    }
  };
}

export function initWebSocketConnection(): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> {
  return async (dispatch) => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      let res: IValues = JSON.parse(message.data as string);
      res?.answer && dispatch(updateCurrentNumber(res.answer));
      dispatch(updateHistory(JSON.parse(res.history)));
    };
  };
}
