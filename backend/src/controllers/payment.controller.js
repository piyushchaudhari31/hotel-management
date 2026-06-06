const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const roomModel = require("../models/room.models");
const customerModel = require("../models/customer.model");

async function createCheckoutSession(req, res) {
  try {
    const { roomId, checkInDate, checkOutDate, guestCount } = req.body;

    const room = await roomModel.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const customer = await customerModel.findOne({
      userId: req.user._id,
    });

    if (!customer) {
      return res.status(400).json({
        message: "Please update customer details first",
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (!checkInDate || !checkOutDate || checkIn >= checkOut) {
      return res.status(400).json({ message: "Invalid date" });
    }

    if (Number(guestCount) > room.totalMember) {
      return res.status(400).json({
        message: `Only ${room.totalMember} members allowed`,
      });
    }

    const totalDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const totalAmount = room.price * totalDays;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${room.roomType} Room Booking`,
              description: `Room No: ${room.roomNumber} | ${checkInDate} to ${checkOutDate} | Guests: ${guestCount}`,
            },
            unit_amount: room.price * 100,
          },
          quantity: totalDays,
        },
      ],

      custom_text: {
        submit: {
          message: `Booking Summary: ${totalDays} night(s), ${guestCount} guest(s), ₹${room.price}/night. Total payable: ₹${totalAmount}.`,
        },
      },

      metadata: {
        userId: req.user._id.toString(),
        roomId: roomId.toString(),
        roomType: room.roomType,
        roomNumber: String(room.roomNumber),
        checkInDate,
        checkOutDate,
        guestCount: String(guestCount),
        pricePerNight: String(room.price),
        totalDays: String(totalDays),
        totalAmount: String(totalAmount),
      },

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/room/${roomId}`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function verifyPaymentAndCreateBooking(req, res) {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    const {
      userId,
      roomId,
      checkInDate,
      checkOutDate,
      guestCount,
      totalDays,
      totalAmount,
    } = session.metadata;

    const bookingModel = require("../models/booking.model");

    const alreadyCreated = await bookingModel.findOne({
      stripeSessionId: sessionId,
    });

    if (alreadyCreated) {
      return res.status(200).json({
        message: "Booking already created",
        booking: alreadyCreated,
      });
    }

    const booking = await bookingModel.create({
      userId,
      roomId,
      checkInDate,
      checkOutDate,
      guestCount,
      totalDay: totalDays,
      totalAmount,
      stripeSessionId: sessionId,
      paymentStatus: "paid",
    });

    return res.status(201).json({
      message: "Booking created after payment",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createCheckoutSession,
  verifyPaymentAndCreateBooking,
};
