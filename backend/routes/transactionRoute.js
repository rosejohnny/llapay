import express from "express";
import {  createTransaction } from '../controllers/transController.js'

import { protect } from '../middleware/authMiddleware.js'
import cors from 'cors';

const router = express.Router()
router.post('/', cors(), protect, createTransaction)



export default router