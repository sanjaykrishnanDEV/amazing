import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: true,
  reducers: {
    addUser: (state) => {
        state.initialState = !(state.initialState)      
    },
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer