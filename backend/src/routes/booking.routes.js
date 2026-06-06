const express = require('express')
const { createBooking, cancelBooking, getMyBookings, getAllBookings, checkInBooking, checkOutBooking, todayChecking } = require('../controllers/booking.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()


router.post('/bookRoom/:id', authMiddleware, createBooking)

router.patch('/cancelBooking/:id', authMiddleware, cancelBooking)

router.get("/myBooking", authMiddleware, getMyBookings);

router.get("/allBookings", authMiddleware, getAllBookings);

router.patch("/checkIn/:id", authMiddleware, checkInBooking);

router.patch("/checkOut/:id", authMiddleware, checkOutBooking);

router.get('/today-check',authMiddleware ,todayChecking)

module.exports = router