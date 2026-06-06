const jwt = require('jsonwebtoken');
const authModel = require('../models/auth.models');


async function authMiddleware(req, res, next) {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized -Login First" });
        }
        const decoded = jwt.verify(token, process.env.jWT_secret);
        const user = await authModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


module.exports = authMiddleware