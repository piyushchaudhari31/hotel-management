require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
const path = require('path')

// ---------------:Routes:--------------------------------------
const authRoutes = require('./src/routes/auth.routes')
const customerRoutes = require('./src/routes/customer.routes')
const roomRoutes = require('./src/routes/room.routes')
const bookRoutes = require('./src/routes/booking.routes')
const paymentRoutes = require("./src/routes/payment.routes");
const ConnectToDb = require('./src/database/connection');
ConnectToDb()

const app = express()

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 250,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
})

app.use(cors({
    origin: "https://hotel-management-n6b2.onrender.com",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(limiter)

app.use('/room_img', express.static(path.join(__dirname, 'src/assets/room_img')));
app.use('/profile_img', express.static(path.join(__dirname, 'src/assets/profile_img')));


// ---------: Api Routes :----------------------

app.use('/api/auth', authRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/book', bookRoutes)
app.use("/api/payment", paymentRoutes)


const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`);

})