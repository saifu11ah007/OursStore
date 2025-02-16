import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in cookies or Authorization header
  if (req.cookies.jwt) {
    token = req.cookies.jwt;  // Cookie-based token
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];  // Authorization header-based token
  }

  if (token) {
    try {
      // Decode the token and find the user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();  // Proceed to the next middleware/route
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
});

// Admin Middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();  // Allow the admin to proceed
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };
