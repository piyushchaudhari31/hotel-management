import { createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  getRoom,
  checkAvailableRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
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
  reducers: {
    clearRoomById: (state) => {
      state.roomById = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room.unshift(action.payload);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload || [];
      })
      .addCase(getRoom.rejected, (state, action) => {
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
      })

      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.loading = false;

        state.room = state.room.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );

        state.roomById = action.payload;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = state.room.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkAvailableRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailableRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload || [];
      })
      .addCase(checkAvailableRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRoomById } = roomSlice.actions;
export default roomSlice.reducer;