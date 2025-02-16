import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js'; 
import Product from '../models/productModel.js'; 
import {protect, admin} from '../middleware/authMiddleware.js';
import { createProduct, updateProduct, deleteProduct, createReview } from '../controllers/productControl.js';
const router=express.Router();

router.get('/', asyncHandler(async(req, res) => {
  const products=await Product.find({});
  res.json(products);
}));
router.route('/').post(protect, admin, createProduct);
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
}));
router.route('/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createReview);


router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword
      ? { name: { $regex: req.params.keyword, $options: 'i' } }
      : {};

    const products = await Product.find(keyword);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});






export default router;