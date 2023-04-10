import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      return [...state, { ...action.payload }];
    },

    setBrandState: (state, action) => {
      return action.payload;
    },
    deleteBrand: (state, action) => {
      const findBrand = state.find((Brand) => Brand.id === action.payload);
      if (findBrand) {
        state.splice(state.indexOf(findBrand), 1);
      }
    },
    updateBrand: (state, action) => {
      const findBrand = state.find((Brand) => Brand.id === action.payload.id);

      if (findBrand) {
        let index = state.indexOf(findBrand);
        state[index] = action.payload;
      }
    },
  },
});

export const { setBrand, setBrandState, deleteBrand, updateBrand } =
  userSlice.actions;

export default userSlice.reducer;
