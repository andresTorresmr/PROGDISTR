import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      console.log(action.payload);
      return [...state, { ...action.payload }];
    },

    setProductState: (state, action) => {
      return action.payload;
    },
    deleteProduct: (state, action) => {
      const findProduct = state.find(
        (Product) => Product.id === action.payload
      );
      if (findProduct) {
        state.splice(state.indexOf(findProduct), 1);
      }
    },
    updateProduct: (state, action) => {
      const findProduct = state.find(
        (Product) => Product.id === action.payload.id
      );
      console.log(action.payload.id);
      if (findProduct) {
        let index = state.indexOf(findProduct);

        state[index] = action.payload;
      }
    },
  },
});

export const { setProduct, setProductState, deleteProduct, updateProduct } =
  userSlice.actions;

export default userSlice.reducer;
