import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  currentUser,
  logOutUser,
  userLogin,
  userRegister,
} from "../thunk/AuthThunk";

const initialState = {
  data: null,
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.isLoggedOut = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.isLoggedOut) return;
        state.currentUser = action.payload;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        if (action.meta?.aborted) return;
        state.data = null;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedOut = true;
        state.currentUser = null;
        state.data = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.data = null;
        state.error = null;
        state.isLoggedOut = true;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
        state.currentUser = null;
        state.isLoggedOut = true;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
