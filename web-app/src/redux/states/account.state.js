import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      return [...state, { ...action.payload }];
    },

    setAccountState: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setAccount, setAccountState } = userSlice.actions;

export default userSlice.reducer;
