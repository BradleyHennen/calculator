import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalculatorState {
  currentValue: number;
  currentNumber: string;
  currentSymbol: "/" | "+" | "*" | "-" | null;
  isNegative: boolean;
  initValue: boolean;
  initCalc: boolean;
  error: string;
  history: { equation: string }[];
}

const initialState: CalculatorState = {
  currentValue: 0,
  currentNumber: "",
  currentSymbol: null,
  isNegative: false,
  initValue: false,
  initCalc: false,
  error: "",
  history: [],
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    checkAndUpdateCurrentNumber(state, action: PayloadAction<string>) {
      //Check for leading zeros
      if (state.currentNumber === "0" && action.payload === "0") return;
      //Check for multiple decimals
      if (state.currentNumber.includes(".") && action.payload === ".") return;

      //Check if symbol is selected
      if (state.currentSymbol && state.initValue) {
        state.currentNumber = "";
        state.initValue = false;
        state.initCalc = true;
      }

      //Finally, update currentNumber
      state.currentNumber = state.currentNumber + action.payload;
    },
    updateCurrentNumber(state, action: PayloadAction<string>) {
      state.currentNumber = action.payload;
    },
    updateCurrentSymbol(state, action: PayloadAction<"/" | "+" | "*" | "-">) {
      state.currentSymbol = action.payload;
      if (!state.error) {
        state.currentValue = +state.currentNumber;
      }
      state.initValue = true;
    },
    percentDecimal(state, action: PayloadAction<void>) {
      state.currentNumber = (+state.currentNumber / 100).toString();
    },
    negation(state, action: PayloadAction<void>) {
      state.isNegative = !state.isNegative;
      state.isNegative
        ? (state.currentNumber = "-" + state.currentNumber)
        : (state.currentNumber = state.currentNumber.replace("-", ""));
    },
    allClear(state, action: PayloadAction<void>) {
      state.currentNumber = "";
      state.currentSymbol = null;
      state.currentValue = 0;
      state.initValue = false;
      state.initCalc = false;
      state.error = "";
    },
    checkCalculate(state, action: PayloadAction<void>) {
      if (state?.currentSymbol === "/" && state?.currentNumber === "0") {
        state.error = "CANNOT DIVIDE BY ZERO. ENTER NEW NUMBER";
        state.currentNumber = "";
      } else if (
        (state?.currentValue || state?.currentValue === 0) &&
        state?.currentSymbol &&
        state?.currentNumber &&
        state.initCalc
      ) {
        state.error = "";
        state.initValue = true;
        state.initCalc = false;
      } else {
        state.error = "Error. Please Try Again";
      }
    },
    updateHistory(state, action: PayloadAction<{ equation: string }[]>) {
      state.history = [];
      state.history = action.payload;
      state.currentSymbol = null;
    },
  },
});

export const {
  checkAndUpdateCurrentNumber,
  updateCurrentNumber,
  updateCurrentSymbol,
  allClear,
  negation,
  percentDecimal,
  checkCalculate,
  updateHistory,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
