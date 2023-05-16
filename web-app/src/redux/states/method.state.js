import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setMethod: (state, action) => {
      return [...state, { ...action.payload }];
    },

    setMethodState: (state, action) => {
      return action.payload;
    },
    deleteMethod: (state, action) => {
      const findMethod = state.find((Method) => Method.id === action.payload);
      if (findMethod) {
        state.splice(state.indexOf(findMethod), 1);
      }
    },
    updateMethod: (state, action) => {
      const findMethod = state.find(
        (Method) => Method.id === action.payload.id
      );

      if (findMethod) {
        let index = state.indexOf(findMethod);
        state[index] = action.payload;
      }
    },
  },
});

export const { setMethod, setMethodState, deleteMethod, updateMethod } =
  userSlice.actions;

export default userSlice.reducer;
