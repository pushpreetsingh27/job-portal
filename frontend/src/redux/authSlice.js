// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial State
const initialState = {
  loading: false,
  user: null,
};

// ✅ Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// ✅ Export Actions & Reducer
export const { setLoading, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
