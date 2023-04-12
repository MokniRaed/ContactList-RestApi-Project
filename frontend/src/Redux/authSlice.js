import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: "",
    },
    token: "",
  },
  reducers: {
    fetchAuth: (state, action) => {
      state.token = action.payload.token;
      state.user.email = action.payload.userEmail;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchAuth } = authSlice.actions;

export default authSlice.reducer;
