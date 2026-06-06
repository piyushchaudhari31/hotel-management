import { createSlice } from "@reduxjs/toolkit";
import {
  getRoom,
  checkAvailableRoom,
  getRoomById,
} from "../thunk/RoomThunks";

const initialState = {
  room: [],
  roomById: null,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkAvailableRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailableRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(checkAvailableRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.roomById = action.payload;
      })
      .addCase(getRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;