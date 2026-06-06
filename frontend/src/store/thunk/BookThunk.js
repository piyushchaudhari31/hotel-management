import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/API/ApiConfiguration";
import toast from "react-hot-toast";

export const getAllBooking = createAsyncThunk(
  "booking/getAllBooking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/book/allBookings", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

export const bookingDetail = createAsyncThunk(
  "booking/bookingDetail",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/api/book/bookRoom/${id}`,
        data,
        { withCredentials: true }
      );

      toast.success("Booking Successfully");

      return res.data.booking;
    } catch (error) {
      toast.error(error?.response?.data?.message);

      return rejectWithValue(
        error?.response?.data?.message || "Booking Failed"
      );
    }
  }
);