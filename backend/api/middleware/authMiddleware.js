import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log("Token from cookies:", token);
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log("Token from headers:", token);
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      console.log("Authenticated User:", req.user);
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    console.log("No token provided");
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
