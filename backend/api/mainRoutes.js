

import express from 'express';
import productRoutes from '../api/routes/productRoutes.js';
import userRoutes from '../api/routes/userRoutes.js';
import orderRoutes from '../api/routes/orderRoutes.js';
import paymentRoutes from '../api/routes/paymentRoutes.js';
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

// Export as serverless function for Vercel
export default app;
