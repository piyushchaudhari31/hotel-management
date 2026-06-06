import {createSlice} from '@reduxjs/toolkit'

import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "../../utils/API/ApiConfiguration";

export const getCustomerDetail = createAsyncThunk(
  "customer/getCustomerDetail",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/customer/customerDetail", {
        withCredentials: true,
      });

      return res.data?.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Customer detail failed"
      );
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("phoneNumber", userData.phoneNumber || "");

      if (userData.gender) {
        formData.append("gender", userData.gender);
      }

      formData.append("address", userData.address || "");
      formData.append("idProofNumber", userData.idProofNumber || "");

      if (userData.image) {
        formData.append("image", userData.image);
      }

      const promise = axios.put("/api/customer/updateCustomer", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.promise(promise, {
        loading: "Updating...",
        success: "Validate Successfully",
        error: "Update Failed",
      });

      const res = await promise;

      return res.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");

      return rejectWithValue(
        error?.response?.data?.message || "Update failed"
      );
    }
  }
);

export const getAllCustomerDetail = createAsyncThunk(
  "customer/getAllCustomerDetail",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/customer/getAllCustomer", {
        withCredentials: true,
      });

      return res.data.customer;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Get customers failed"
      );
    }
  }
);

export const getMyBooking = createAsyncThunk(
  "customer/getMyBooking",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/book/myBooking", {
        withCredentials: true,
      });

      return res?.data?.bookings;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Get booking failed"
      );
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "customer/cancelBooking",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `/api/book/cancelBooking/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Booking cancelled successfully");

      return res.data.bookings;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Cancel booking failed");

      return rejectWithValue(
        error?.response?.data?.message || "Cancel booking failed"
      );
    }
  }
);