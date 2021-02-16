import { w3cwebsocket } from "websocket";
import { Action, ThunkAction } from "@reduxjs/toolkit";
import {
  checkCalculate,
  updateCurrentNumber,
  updateHistory,
} from "./calculatorSlice";
import { RootState } from "../../../store";

interface IValues {
  answer: number;
  history: string;
}

const HOST = process?.env?.REACT_APP_API_ENDPOINT
  ? process.env.REACT_APP_API_ENDPOINT.replace(/^http/, "ws")
  : "ws://localhost:5000";
const client = new w3cwebsocket(HOST);

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
      res?.answer?.toString() &&
        dispatch(updateCurrentNumber(res.answer.toString()));
      dispatch(updateHistory(JSON.parse(res.history)));
    };
    client.onclose = () => {
      console.log("in on close");
      setTimeout(initWebSocketConnection, 1000);
    };
  };
}
