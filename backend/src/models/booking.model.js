const express = require("express");
const { default: mongoose } = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    checkInDate: {
      type: Date,
    },
    checkOutDate: {
      type: Date,
    },
    guestCount: {
      type: String,
    },
    totalDay: {
      type: String,
    },
    totalAmount: {
      type: Number,
    },
    bookingStatus: {
      type: String,
      enum: ["confirmed", "cancelled", "checkedIn", "checkedOut"],
      default: "confirmed",
    },
    stripeSessionId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const bookingModel = mongoose.model("BookDetail", bookingSchema);

module.exports = bookingModel;
