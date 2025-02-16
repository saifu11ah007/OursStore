import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js'; 
import { authUsers, registerUser, logoutUser, getUserProfile,updateUserProfile, getUsers, deleteUser, getUserByID, updateUser } from '../controllers/userControl.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router=express.Router();
router.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.route('/').post(registerUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin,deleteUser).get(getUserByID).put(protect, admin,updateUser);





export default router;