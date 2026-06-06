import { createSlice } from "@reduxjs/toolkit";
import { getAdminDetail } from "../thunk/AdminThunk";

const initialState = {
  adminData: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.adminData = action.payload;
      })
      .addCase(getAdminDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;