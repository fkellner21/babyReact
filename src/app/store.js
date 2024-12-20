import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import eventosSlice from "./slices/eventosSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    eventosSlice: eventosSlice,
  },
});
