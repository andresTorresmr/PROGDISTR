import { configureStore } from "@reduxjs/toolkit";
import { brands, products } from "./states";

export const store = configureStore({
  reducer: {
    brands,
    products,
  },
});
