require('dotenv').config()
require('express-async-errors')

// express setup
const express = require('express')
const app = express()

// security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const expressLimit = require('express-rate-limit')


// middleware setup
app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(xss())

const limiter = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}

app.use(expressLimit(limiter))


// db setup
const connectDB = require('./db/connect')

// routes setup
const authentication = require('./middleware/authentication')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authentication,jobsRouter)

// error handling
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
app.use(notFound)
app.use(errorHandler)

// port setup
const PORT = process.env.PORT || 5000
 
const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    console.log(`Mongo DB connected successfully.`)
    app.listen(PORT,()=>{
      console.log(`Port ${PORT} connected successfully.`)
    })
  }catch(error){
    console.log(error)
  }
}

start()