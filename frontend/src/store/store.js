/* eslint-disable import/named */
/* eslint-disable import/default */
/* eslint-disable arrow-body-style */
/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import adminReducer from "./adminAuthSlice.js";

const store = configureStore({
  reducer: {
    adminAuth: adminReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
