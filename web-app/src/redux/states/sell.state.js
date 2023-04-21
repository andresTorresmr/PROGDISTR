import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    setNullSell: (state, action) => {
      return [];
    },
    setSellItem: (state, action) => {
      const findSellItem = state.find(
        (SellItem) => SellItem.id === action.payload.id
      );

      if (findSellItem) {
        let index = state.indexOf(findSellItem);

        state[index].quantity =
          parseInt(state[index].quantity) + parseInt(action.payload.quantity);
      } else {
        return [...state, { ...action.payload }];
      }
    },

    deleteSellItem: (state, action) => {
      const findSellItem = state.find(
        (SellItem) => SellItem.id === action.payload
      );
      if (findSellItem) {
        state.splice(state.indexOf(findSellItem), 1);
      }
    },
    updateSellItem: (state, action) => {
      const findSellItem = state.find(
        (SellItem) => SellItem.id === action.payload.id
      );

      if (findSellItem) {
        let index = state.indexOf(findSellItem);
        state[index].quantity = action.payload.quantity;
      }
    },
  },
});

export const { setSellItem, deleteSellItem, updateSellItem, setNullSell } =
  userSlice.actions;

export default userSlice.reducer;
