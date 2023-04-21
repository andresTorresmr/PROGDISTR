import { configureStore } from "@reduxjs/toolkit";
import { brands, products, methods, sells, accounts } from "./states";

export const store = configureStore({
  reducer: {
    brands,
    products,
    methods,
    sells,
    accounts,
  },
});
