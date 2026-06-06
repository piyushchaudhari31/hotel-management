const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {createCheckoutSession,verifyPaymentAndCreateBooking} = require("../controllers/payment.controller");

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, createCheckoutSession);

router.post("/verify-payment", authMiddleware, verifyPaymentAndCreateBooking);

module.exports = router;