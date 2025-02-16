import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
connectDB();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename); // Get the directory name of the current module

const app = express();
console.log('Directory:', __dirname); // Log the directory to verify

// Body Parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: 'https://ours-store.vercel.app/',
  })
);

// Serve static files from the "api/assets" directory
app.use('/assets', express.static(path.join(__dirname, '/assets')));

// Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Backend is working');
});

export default app;