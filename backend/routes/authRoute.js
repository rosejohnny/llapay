import express from "express";
import { loginUser, registerUser, authUserProfile, getUsers, authUserCard, getUsersById, checkAccount, deleteUser, updateUser } from '../controllers/authUserController.js'
import { createTransaction } from '../controllers/transController.js'

import { protect } from '../middleware/authMiddleware.js'
import cors from 'cors';

const router = express.Router()

router.route('/users',).get(protect, getUsers)
router.route('/users/:id').get(protect, getUsersById)
router.post('/users/:id', protect, cors(), updateUser)
router.post('/card', cors(), authUserCard)
router.route('/profile').get(protect, authUserProfile)
router.post('/check', checkAccount)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/users/:id/transactions', cors(), protect, createTransaction)
// router.get('/users/:id/transactions', cors(), protect, getAllTransactions)
router.delete('/delete/:id', deleteUser)


export default router