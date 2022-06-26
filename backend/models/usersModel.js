import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    accountType: {
      type: String,
    },
    idType: {
      type: String,
    },
    currency: {
      type: String,
    },
    nationality: {
      type: String,
    },
    voulcherNum: {
      type: String,
    },
    passport: {
      type: String,
    },
    taskCode: {
      type: String,
    },
    referenceNum: {
      type: String,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
      },
    ],
    cardDetails: {
      cardNum: { type: String },
      validDate: { type: Date },
      cvvNum: { type: String },
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = function () {
  return this.password
}

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next()
//   }

//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

const User = mongoose.model('User', userSchema)

export default User
