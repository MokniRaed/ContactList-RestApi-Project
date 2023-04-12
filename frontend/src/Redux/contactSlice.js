import { createSlice } from "@reduxjs/toolkit";

export const contacSlice = createSlice({
  name: "contact",
  initialState: [],
  reducers: {
    fetchcontact: (state, action) => {
        console.log("slice",action.payload);
    return action.payload;
  
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchcontact } = contacSlice.actions;

export default contacSlice.reducer;
