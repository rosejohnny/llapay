import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'

// @desc Send Message
// @route POST /api/v1/contact
// @access Public
const message = asyncHandler(async (req, res) => {
  const { fullname, subject, email, body } = req.body

  const message = new Message({
    fullname,
    subject,
    email,
    body,
  })

  const createdMessage = await message.save()

  res.status(201).json(createdMessage)
})

// @desc Send Message
// @route GET /api/v1/messages
// @access Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({})

  res.json(messages)
})


const getMessagesById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (message) {
    res.json(message)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

const deleteMessagesById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (message) {
    await user.remove()
    res.json({ message: 'Message removed' })
  } else {
    res.status(404)
    throw new Error('Messge not found')
  }
})

export { message, getMessages, getMessagesById, deleteMessagesById }
