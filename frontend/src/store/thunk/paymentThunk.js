import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/API/ApiConfiguration";
import toast from "react-hot-toast";

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/payment/create-checkout-session",
        data,
        { withCredentials: true }
      );

      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed");

      return rejectWithValue(
        error?.response?.data?.message || "Payment failed"
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (sessionId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/payment/verify-payment",
        { sessionId },
        { withCredentials: true }
      );

      return res.data.booking;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment verify failed");

      return rejectWithValue(
        error?.response?.data?.message || "Payment verify failed"
      );
    }
  }
);