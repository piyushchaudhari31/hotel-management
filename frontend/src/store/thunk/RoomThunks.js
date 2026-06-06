import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from '../../utils/API/ApiConfiguration'
export const getRoom = createAsyncThunk(
  "room/getRoom",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/room/getAllRoom");
      return res.data.room;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get rooms"
      );
    }
  }
);

export const checkAvailableRoom = createAsyncThunk(
  "room/checkAvailableRoom",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/room/roomIsAvailable", data, {
        withCredentials: true,
      });

      toast(res.data.message, {
        icon: "✅",
        duration: 1300,
        position: "bottom-right",
        style: {
          background: "#000",
          color: "#fff",
          borderRadius: "5px",
        },
      });

      return res.data.rooms;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Room not available");

      return rejectWithValue(
        error?.response?.data?.message || "Room not available"
      );
    }
  }
);

export const getRoomById = createAsyncThunk(
  "room/getRoomById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/room/getRoomById/${id}`, {
        withCredentials: true,
      });

      return res.data.room;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get room"
      );
    }
  }
);