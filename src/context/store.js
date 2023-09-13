import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Table } from "../service/table.service";

export const store = configureStore({
  reducer: combineReducers({
    [Table.reducerPath]: Table.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Table.middleware),
});
