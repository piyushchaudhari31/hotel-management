const moment = require("moment")
const bookingModel = require("../models/booking.model")
const roomModel = require("../models/room.models")
const customerModel = require("../models/customer.model")

async function createBooking(req, res) {
    try {
        const { id } = req.params;

        const { checkInDate, checkOutDate, guestCount } = req.body;

        const room = await roomModel.findById(id);

        if (room.status === "maintenance") {
            return res.status(400).json({ message: "Room is under maintenance" });
        }

        const customer = await customerModel.findOne({ userId: req.user._id });

        if (!customer) {
            return res.status(400).json({
                message: "Customer detail required first"
            });
        }

        const checkIn = new Date(checkInDate);
        checkIn.setDate(checkIn.getDate() + 1);

        const checkOut = new Date(checkOutDate);
        checkOut.setDate(checkOut.getDate() + 1);

        if (checkIn >= checkOut) {
            return res.status(400).json({
                message: "Invalid Date",
            });
        }
        if (Number(guestCount) > room.totalMember) {
            return res.status(400).json({
                message: `Only ${room.totalMember} members allowed`,
            });
        }
        const alreadyBooked = await bookingModel.findOne({
            roomId: id,
            bookingStatus: { $ne: "cancelled" },
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gt: checkIn },
        });

        if (alreadyBooked) {
            return res.status(400).json({ message: "Room already booked for selected dates" });
        }
        const totalDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        const totalAmount = totalDays * room.price;
        const booking = await bookingModel.create({
            userId: customer._id,
            userId: req.user._id,
            roomId: id,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            guestCount,
            totalDay:totalDays,
            totalAmount:totalAmount
        });

        customer.status = "active";
        await customer.save();
        res.status(201).json({
            message: "Booking Suceessfully",
            booking,
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function cancelBooking(req, res) {
    try {
        let { id } = req.params;
        let userId = req.user._id

        let user = await customerModel.find({ userId: userId })

        const booking = await bookingModel.findById(id);

        booking.bookingStatus = "cancelled";
        await booking.save();

        user[0].status = 'inActive';
        await user[0].save()

        const activeBooking = await bookingModel.findOne({
            roomId: booking.roomId,
            bookingStatus: { $ne: "cancelled" },
        });

        if (!activeBooking) {
            await roomModel.findByIdAndUpdate(booking.roomId, { status: "available" });
        }
        res.status(200).json({
            message: "Booking Cancel Successfully",
        });
    } catch (error) {
        console.log(error.message);


    }
}

async function getMyBookings(req, res) {
    try {
        const user = req.user._id
    
        
        const bookings = await bookingModel.find({ userId: user }).populate('roomId')

        res.status(200).json({
            bookings
        });
    } catch (error) {
        console.log(error.message);

    }
}

async function getAllBookings(req, res) {

    try {

        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(200).json({
                message: "Only Admin Can Changes",
            })

        }
        const bookings = await bookingModel.find().populate('userId roomId')
        res.status(200).json({
            bookings
        });
    } catch (error) {
        console.log(error.message);


    }
}

async function checkInBooking(req, res) {
    try {

        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Changes",
            })
        }

        const booking = await bookingModel.findByIdAndUpdate(req.params.id, { bookingStatus: "checkedIn" }, { new: true });

        res.status(200).json({
            message: "Check-In Successfuly",
            booking
        })
    } catch (error) {
        console.log(error.message);
    }
}

async function checkOutBooking(req, res) {
    try {
        let { role } = req.user

        if (role !== "Admin") {
            res.status(400).json({ message: "Only Admin Can changes" });

        }
        const booking = await bookingModel.findByIdAndUpdate(req.params.id, { bookingStatus: "checkedOut" }, { new: true });

        await roomModel.findByIdAndUpdate(booking.roomId, { status: "available" });

        res.status(200).json({ message: "Check-out successful", booking });
    } catch (error) {
        console.log(error.message);


    }
}

async function todayChecking(req, res) {
    try {
        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Changes",
            })
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 2);

        const bookings = await bookingModel.find({
            status: "CONFIRMED",
            checkInDate: {
                $gte: today,
                $lt: tomorrow
            }
        }).populate("userID", "fullName email phone").populate("roomID", "roomNumber roomType");

        if (bookings.length === 0) {
            return res.status(200).json({
                message: "No check-ins scheduled for today.",
                bookings: []
            });
        }

        return res.status(200).json({
            message: "Today's check-ins fetched successfully.",
            bookings
        });

    } catch (error) {
        console.log(error.message);

    }

}

module.exports = {
    createBooking,
    cancelBooking,
    getAllBookings,
    getMyBookings,
    checkInBooking,
    checkOutBooking,
    todayChecking
}