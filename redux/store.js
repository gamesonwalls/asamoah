import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import roomReducer from "./slices/roomSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    rooms: roomReducer,
  },
});
