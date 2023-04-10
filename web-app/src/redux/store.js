import { configureStore } from "@reduxjs/toolkit";
import { brands } from "./states";

export const store = configureStore({
  reducer: {
    brands,
  },
});
