const roomModel = require("../models/room.models");
const bookingModel = require("../models/booking.model");
const customerModel = require("../models/customer.model");

async function adminDashboard(req, res) {
    try {
        const today = new Date();

        // ROOMS
        const totalRooms = await roomModel.countDocuments();

        const maintenanceRooms = await roomModel.countDocuments({
            status: "maintenance",
        });

        // CURRENT BOOKED ROOMS
        const bookedRooms = await bookingModel.countDocuments({
            bookingStatus: { $in: ["confirmed", "checkedIn"] },
            checkInDate: { $lte: today },
            checkOutDate: { $gt: today },
        });

        const availableRooms = totalRooms - bookedRooms - maintenanceRooms;

        // CUSTOMERS
        const totalCustomers = await customerModel.countDocuments();

        // BOOKINGS
        const totalBookings = await bookingModel.countDocuments();

        const activeBookings = await bookingModel.countDocuments({
            bookingStatus: "confirmed",
        });

        const cancelledBookings = await bookingModel.countDocuments({
            bookingStatus: "cancelled",
        });

        const checkedIn = await bookingModel.countDocuments({
            bookingStatus: "checkedIn",
        });

        const checkedOut = await bookingModel.countDocuments({
            bookingStatus: "checkedOut",
        });

        res.status(200).json({
            totalRooms,
            availableRooms,
            bookedRooms,
            maintenanceRooms,

            totalCustomers,

            totalBookings,
            activeBookings,
            cancelledBookings,
            checkedIn,
            checkedOut,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { adminDashboard };