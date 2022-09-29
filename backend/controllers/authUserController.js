import { response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js'
// import transactions from '../models/transactionModel.js'
import generateToken from '../utils/generateTokens.js'
import cors from 'cors'

// @desc Auth user & get token
// @route GET /api/v1/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(user.password == password) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      amount: user.amount,
      currency: user.currency,
      isPaid: user.isPaid,
      voulcherNum: user.voulcherNum,
      reciever: user.reciever,
      sendAmount: user.sendAmount,
      recieveAmount: user.recieveAmount,
      recieveMethod: user.recieveMethod,
      transationDate: user.transationDate,
      pickupDate: user.pickupDate,
      taskCode: user.taskCode,
      referenceNum: user.referenceNum,
      isAdmin: user.isAdmin,
      transactions: user.transactions,
      cardDetails: user.cardDetails,
      messages: user.messages,
      passport: user.passport,
      password: user.password,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
})


const uploadPhoto = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  // console.log(req.headers)

  if(user) {
    (user.passport = req.file.path)

    const updatedPassport = await user.save()

    res.json({
      _id: updatedPassport._id,
      passport: updatedPassport.passport
    })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

// @desc Auth user & get token
// @route GET /api/v1/check
// @access Public
const checkAccount = asyncHandler(async (req, res) => {
  const { referenceNum, email } = req.body

  const user = await User.findOne({ email, referenceNum })

  if (user) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      sendCurrency: user.sendCurrency,
      recieveCurrency: user.recieveCurrency,
      isPaid: user.isPaid,
      voulcherNum: user.voulcherNum,
      reciever: user.reciever,
      sendAmount: user.sendAmount,
      recieveAmount: user.recieveAmount,
      recieveMethod: user.recieveMethod,
      transationDate: user.transationDate,
      pickupDate: user.pickupDate,
      referenceNum: user.referenceNum,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401).json({ message: 'Invalid email or referenceNum' })
  }
})

// @desc Register new user
// @route GET /api/v1/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    amount,
    email,
    title,
    accountType,
    gender,
    phone,
    nationality,
    isAdmin,
    currency,
    idType,
    dob,
    address,
    password,
    passport
  } = req.body

  console.log(req.body)

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    title,
    amount,
    accountType,
    gender,
    phone,
    nationality,
    isAdmin,
    currency,
    idType,
    dob,
    address,
    password,
    passport
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      title: user.title,
      accountType: user.accountType,
      gender: user.gender,
      phone: user.phone,
      idType: user.idType,
      dob: user.dob,
      amount: user.amount,
      isAdmin: user.isAdmin,
      currency: user.currency,
      nationality: user.nationality,
      password: user.password,
      passport: user.passport,
      address: user.address,
      voulcherNum: user.voulcherNum,
      taskCode: user.taskCode,
      referenceNum: user.referenceNum,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
})

// @desc Auth user & get token
// @route POST /api/v1/user/card
// @access Private
const authUserCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      cardDetails: {
        cardNum: user.cardNum,
        validDate: user.validDate,
        cvvNum: user.cvvNum,
      },
    })
  } else {
    res.status(404).json({ message: 'User not found' })
    // throw new Error('User not found')
  }

  res.json(user)
})

// @desc Auth user & get token
// @route GET /api/v1/user/profile
// @access Private
const authUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json(
      {
      status: 'Success',
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      amount: user.amount,
      title: user.title,
      accountType: user.accountType,
      gender: user.gender,
      phone: user.phone,
      idType: user.idType,
      dob: user.dob,
      currency: user.currency,
      nationality: user.nationality,
      passport: user.passport,
      password: user.password,
      address: user.address,
      voulcherNum: user.voulcherNum,
      taskCode: user.taskCode,
      referenceNum: user.referenceNum,
      isAdmin: user.isAdmin,
      transactions: user.transactions,
      cardDetails: user.cardDetails,
    }
    )
  } else {
    res.status(404).json({ message: 'User not found' })
    // throw new Error('User not found')
  }

  res.json(user)
})

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc Fetch all users
// @route GET /api/v1/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate('transactions').exec()

  // console.log(users.transactions)

  res.json(users)
})

// @desc Fetch single user
// @route GET /api/v1/users/:id
// @access Public
const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('transactions').exec()

  // console.log(user)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// @desc Update User
// @route PUT /api/v1/user/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
      (user.firstname = req.body.firstname || user.firstname),
      (user.lastname = req.body.lastname || user.lastname),
      (user.email = req.body.email || user.email),
      (user.currency = req.body.currency || user.currency),
      (user.accountType = req.body.accountType || user.accountType),
      (user.amount = req.body.amount || user.amount),
      (user.referenceNum = req.body.referenceNum || user.referenceNum),
      (user.voulcherNum = req.body.voulcherNum || user.voulcherNum),
      (user.taskCode = req.body.taskCode || user.taskCode)

    const updateUser = await user.save()

    res.json({
      _id: updateUser._id,
      firstname: updateUser.firstname,
      lastname: updateUser.lastname,
      email: updateUser.email,
      voulcherNum: updateUser.voulcherNum,
      amount: updateUser.amount,
      currency: updateUser.currency,
      accountType: updateUser.accountType,
      taskCode: updateUser.taskCode,
      referenceNum: updateUser.referenceNum,
    })
  } else {
    res.status(404).json({ message: 'User not found' })
    // throw new Error('User not found')
  }

  res.status(200).json(user)
})
// @desc Update Amount
// @route PUT /api/v1/user/:id/amount
// @access Private
const updateAmount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
      (user.amount = req.body.amount || user.amount)

    const updateAmount = await user.save()

    res.json({
      _id: updateAmount._id,
      amount: updateAmount.amount,
    })
  } else {
    res.status(404).json({ message: 'User not found' })
    // throw new Error('User not found')
  }

  res.status(200).json(user)
})

export {
  updateAmount,
  loginUser,
  authUserProfile,
  registerUser,
  getUsers,
  getUsersById,
  checkAccount,
  deleteUser,
  updateUser,
  authUserCard,
  uploadPhoto,
}
