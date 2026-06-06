import { createSlice } from "@reduxjs/toolkit";
import {
  getCustomerDetail,
  updateCustomer,
  getAllCustomerDetail,
  getMyBooking,
  cancelBooking,
} from "../thunk/CustomerThunk";

const initialState = {
  customer: null,
  customers: [],
  myBookings: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCustomerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(getCustomerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllCustomerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCustomerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(getAllCustomerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload;
      })
      .addCase(getMyBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;