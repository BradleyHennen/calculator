import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import thunk from "redux-thunk";
import calculatorReducer from "../features/calculator/ducks";

const rootReducer = combineReducers({
  calculatorReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkDispatch<RootState, any, AnyAction>;

export default store;
