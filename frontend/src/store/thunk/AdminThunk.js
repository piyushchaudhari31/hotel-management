import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/API/ApiConfiguration";

export const getAdminDetail = createAsyncThunk(
  "admin/getAdminDetail",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "/api/auth/AdminDashoard",
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load admin data"
      );
    }
  }
);