import express from 'express'
import connectDB from './config/db.js'
import dotenv  from 'dotenv'
import colors from 'colors'
import messageRoute from './routes/messageRoute.js'
import authRoute from './routes/authRoute.js'
import transactionRoute from './routes/transactionRoute.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import cors from 'cors'


dotenv.config()

connectDB()


const app = express()


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('API is runing...')
})

app.use('/api/v1', authRoute)
app.use('/api/v1', messageRoute)
app.use('/api/v1/transactions', transactionRoute)

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))