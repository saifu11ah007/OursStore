import { response } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
// @desc Auth Users and Get Token
// @route   POST /api/users/login
// @access Public
const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  else {
    res.status(401);
    throw new Error('Invalid Email or Password')
  }
});
// @desc Register Users 
// @route   POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Exists');
  }
  const user = await User.create({
    name, email, password,
  });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
});
// @desc LOGOUT / Clear cookiee 
// @route   POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),

  });
  response: res.status(200).json({ message: 'logout success' });
});
// @desc Profile Users 
// @route   GET /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });

  } else {
    res.status(401);
    throw new Error('no user exist')
  }
});
// @desc Profile Users 
// @route   put /api/users/profile
// @access PRIV
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('no user exist')
  }
});
// @desc Profile Users 
// @route   GET /api/users/
// @access PRIV
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});
// @desc Profile Users 
// @route   DELETE /api/users/
// @access PRIV
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // ✅ Fix variable name
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete Admin');
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted" }); // ✅ Proper response
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Profile Users 
// @route   GET /api/users/:id
// @access PRIV
const getUserByID = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select('-password');
  if (user) { res.status(200).json(users); }
  else {
    res.status(404);
    throw new Error('Not Found');
  }

});
// @desc Profile Users 
// @route   DELETE /api/users/:id
// @access PRIV
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name= req.body.name || user.name;
    user.email= req.body.email || user.email;
    user.isAdmin= boolean(req.body.isAdmin);

    const updatedUser=await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser._name,
      email: updatedUser._email,
      isAdmin: updatedUser._isAdmin,

    });
  }else{
    res.status(404);
    throw new Error('Not Found');
  }
});
export { authUsers, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserByID, updateUser }