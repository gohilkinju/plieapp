import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import authReducer from "./authSlice";


export const store = configureStore({
  reducer: {
    events: eventsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
