import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/ProductData.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const importData=async()=>{
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser=await User.insertMany(users);
    const adminUser=createdUser[0].id;

    const sampleProducts=products.map((product)=>{
      return {...product, user:adminUser};
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Saved".green.inverse);
  }catch(error){console.log(`Error: ${error.message}`.red.inverse);}
};

const destroyData=async()=>{
  try{
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed".green.inverse);
    process.exit();
  }catch(error){console.log(`Error: ${error.message}`.red.inverse);}

};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}