import express from "express";
import { loginUser, registerUser, updateAmount, authUserProfile, getUsers, authUserCard, getUsersById, checkAccount, deleteUser, updateUser } from '../controllers/authUserController.js'
import { createTransaction } from '../controllers/transController.js'
import { protect } from '../middleware/authMiddleware.js'
import cors from 'cors';
import path from 'path'
import multer from 'multer'
import asyncHandler from 'express-async-handler'



const router = express.Router()

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  // filename: function(req, file, cb) {
  //   cb( null, Date.now() + file.originalname)
  // },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})


router.post('/upload', upload.single('passport'), asyncHandler(async (req, res) => {
  res.send(`/${req.file.path}`)
}))

router.route('/users',).get(protect, cors(), getUsers)
router.route('/users/:id').get(protect, cors(), getUsersById)
router.post('/users/:id', protect, cors(), updateUser)
router.post('/card', cors(), authUserCard)
router.route('/profile').get(protect, authUserProfile)
router.post('/check', cors(), checkAccount)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/users/:id/transactions', cors(), protect, createTransaction)
router.post('/users/:id/amount', cors(), protect, updateAmount)
router.delete('/delete/:id', deleteUser)


export default router