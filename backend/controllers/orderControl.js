import asyncHandler from '../middleware/asyncHandler.js'; 
import Order from '../models/orderModel.js'; 
import Product from "../models/productModel.js"; // ✅ Import Product Model


//@desc Create New Orders
//route POST /api/orders
//access PRIVATE
const addOrderItems= asyncHandler(async(req,res)=>{
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;



  if (orderItems && orderItems.length===0){
    res.status(401);
    throw new Error('no order item');
  }else{
    const order=new Order({
      orderItems: orderItems.map((x)=>({
        ...x,
        product:x._id,
        _id:undefined
      })),
      user:req.user._id,
      shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice,
      totalPrice
    });
    const createdOrder=await order.save();
    res.status(201).json(createdOrder);
  
  }
  
});
//@desc Get Login Users New Orders
//route GET /api/orders/myorders 
//access PRIVATE
const getMyOrders= asyncHandler(async(req,res)=>{
  const orders=await Order.find({user:req.user._id});
  res.status(200).json(orders);
});
//@desc Get  Orders by id
//route GET /api/orders/:id 
//access PRIVATE
const getOrderById= asyncHandler(async(req,res)=>{
  const order=await Order.findById(req.params.id).populate('user','name email');
  if(order){res.status(200).json(order);}
  else{
    res.status(404);
    throw new Error('no order found');
  }
  
});
//@desc Update Order to paid
//route PUT /api/orders/:id/pay 
//access PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,  // Stripe session ID
      status: req.body.status,
      update_time: new Date().toISOString(),
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
//@desc Update Order to delivered
//route PUT /api/orders/:id/deliver 
//access PRIVATE/ admin
const updateOrderToDelivered= asyncHandler(async(req,res)=>{
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
//@desc Get all orders
//route GET /api/orders/ 
//access PRIVATE
const getOrders= asyncHandler(async(req,res)=>{
  const orders=await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});



export {getOrders, updateOrderToDelivered, updateOrderToPaid, getOrderById, getMyOrders, addOrderItems};