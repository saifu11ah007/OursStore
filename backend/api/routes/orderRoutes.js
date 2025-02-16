import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js'; 
import { getOrders, updateOrderToDelivered, updateOrderToPaid, getOrderById, getMyOrders, addOrderItems } from '../controllers/orderControl.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router=express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

router.route('/mine').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

export default router; 