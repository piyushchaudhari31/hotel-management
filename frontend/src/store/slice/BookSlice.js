import { createSlice } from "@reduxjs/toolkit";
import { getAllBooking, bookingDetail } from "../thunk/BookThunk";

const initialState = {
  booking: [],
  doneBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Bookings
      .addCase(getAllBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
      })
      .addCase(getAllBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Book Room
      .addCase(bookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.doneBooking = action.payload;
      })
      .addCase(bookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;