import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import recordReducer from "../features/records/recordSlice";

export const store = configureStore({
  reducer: {
    record: recordReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
