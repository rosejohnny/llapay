import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const messageSchema = mongoose.Schema({
  fullname: {type: String, required: true},
  subject: {type: String, required: true},
  email: {type: String, required: true},
  body: {type: String, required: true},
})



const Messages = mongoose.model('messages', messageSchema)

export default Messages