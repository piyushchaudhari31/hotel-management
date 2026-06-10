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

      return res.data.bookings;
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
      const res = await axios.post(`/api/book/bookRoom/${id}`, data, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Booking Successfully");
      return res.data.booking;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Booking Failed");

      return rejectWithValue(
        error?.response?.data?.message || "Booking Failed"
      );
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `/api/book/cancelBooking/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Booking Cancelled Successfully");
      return res.data.booking;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel booking");

      return rejectWithValue(
        error?.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

export const checkInBooking = createAsyncThunk(
  "booking/checkInBooking",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `/api/book/checkIn/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Check-In Successfully");
      return res.data.booking;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Check-In Failed");

      return rejectWithValue(
        error?.response?.data?.message || "Check-In Failed"
      );
    }
  }
);

export const checkOutBooking = createAsyncThunk(
  "booking/checkOutBooking",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `/api/book/checkOut/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Check-Out Successfully");
      return res.data.booking;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Check-Out Failed");

      return rejectWithValue(
        error?.response?.data?.message || "Check-Out Failed"
      );
    }
  }
);

export const todayChecking = createAsyncThunk(
  "booking/todayChecking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/book/today-check", {
        withCredentials: true,
      });

      return res.data.bookings;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch today check-ins"
      );
    }
  }
);