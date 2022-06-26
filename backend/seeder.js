import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import UserModel from './models/usersModel.js'
import messages from './data/messages.js'
import Transaction from './models/transactionsModel.js'
import transactions from './data/transactions.js'
import MessageModel from './models/messageModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Transaction.deleteMany()
    await UserModel.deleteMany()
    await MessageModel.deleteMany()

    // const createTransaction = await TransactionModel.insertMany(transactions)
    const createUsers = await UserModel.insertMany(users)
    const createMessages = await MessageModel.insertMany(messages)

    // const adminTrans = createTransaction[0]._id
    const adminUser = createUsers[0]._id
    const adminMessage = createMessages[0]._id


    const sampleTransaction = transactions.map(transaction => {
      return { ...transaction, user: adminUser }
    })

    await Transaction.insertMany(sampleTransaction)


    console.log("Data imported:".green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}



const destroyData = async () => {
  try {
    await UserModel.deleteMany()
    await MessageModel.deleteMany()
    await Transaction.deleteMany()


    console.log("Data Destroy:".red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}


if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}