import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

// Static file serving for images
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Other routes like products, etc.
app.use('/api/products', productRoutes); // assuming productRoutes is properly set up

// Catch-all for all other routes (API)
app.get('*', (req, res) => {
  res.send('API is working');
});

// Server listen setup
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
