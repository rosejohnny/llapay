import asyncHandler from 'express-async-handler'
import Transaction from '../models/transactionsModel.js'
import User from '../models/usersModel.js'




// @desc Create New Transactions
// @route POST /api/v1/users/id/transactions
// @access Private
const createTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    const trans = await Transaction.create(req.body)

    user.transactions.push(trans)
    user.save()

    res.json(user)
  } else {
    res.status(404).json({ message: 'Transactions not found' })
  }
})


// @desc Get ALl Transactions
// @route POST /api/v1/users/id/transactions
// @access Private
// const getAllTransactions = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)

//   if (user) {
//     const trans = await Transaction.find({})

//     res.json(trans)
//   } else {
//     res.status(404).json({ message: 'Transactions not found' })
//   }
// })

export { createTransaction }
