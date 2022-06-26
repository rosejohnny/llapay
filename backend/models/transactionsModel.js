import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    type: { type: Boolean },
    accountNumber: { type: String },
    amount: { type: Number },
    bankName: { type: String },
    accountNumber: { type: String },
    narration: { type: String },
  },
  {
    timestamps: true,
  }
)

// transactionSchema.virtual('transactions', {
//   ref: 'Transaction',
//   foreignField: 'user',
//   localField: '_id'
// })


// transactionSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'transactions',
//     select: "name"
//   })

//   next()
// })



const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
