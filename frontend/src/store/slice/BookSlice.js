import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBooking,
  bookingDetail,
  cancelBooking,
  checkInBooking,
  checkOutBooking,
  todayChecking,
} from "../thunk/BookThunk";

const initialState = {
  booking: [],
  doneBooking: null,
  todayCheckIns: [],
  loading: false,
  error: null,
};

const updateBookingInList = (list, updatedBooking) => {
  if (!updatedBooking?._id) return list;

  return list.map((item) =>
    item._id === updatedBooking._id ? updatedBooking : item
  );
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearDoneBooking: (state) => {
      state.doneBooking = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload || [];
      })
      .addCase(getAllBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(bookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.doneBooking = action.payload;

        if (action.payload) {
          state.booking.unshift(action.payload);
        }
      })
      .addCase(bookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = updateBookingInList(state.booking, action.payload);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkInBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkInBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = updateBookingInList(state.booking, action.payload);
      })
      .addCase(checkInBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkOutBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOutBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = updateBookingInList(state.booking, action.payload);
      })
      .addCase(checkOutBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(todayChecking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(todayChecking.fulfilled, (state, action) => {
        state.loading = false;
        state.todayCheckIns = action.payload || [];
      })
      .addCase(todayChecking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoneBooking } = bookingSlice.actions;
export default bookingSlice.reducer;