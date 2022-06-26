import express from "express";
import { message, getMessages, getMessagesById, deleteMessagesById } from '../controllers/messageController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/contact').post(message)
router.route('/messages').get(protect, getMessages)
router.route('/messages/:id').get(protect, getMessagesById)
router.delete('/message/:id', deleteMessagesById)



export default router

