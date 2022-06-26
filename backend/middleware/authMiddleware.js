import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js'

const protect = asyncHandler(async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      const token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      return next()
    } else {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token' })
  }
})

export { protect }
