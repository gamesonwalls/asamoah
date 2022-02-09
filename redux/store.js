import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import ledgerReducer from "./slices/ledgerSlice";
import globalReducer from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ledger: ledgerReducer,
    global: globalReducer,
  },
});
