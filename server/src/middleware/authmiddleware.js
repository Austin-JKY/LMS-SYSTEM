// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check for token in the 'Authorization' header with 'Bearer' format
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the decoded user payload to the request object
            req.user = decoded;

            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            // Handle token verification errors
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found, return an error
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
