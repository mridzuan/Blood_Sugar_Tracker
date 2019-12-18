require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const passport = require('passport')

const app = express()



app.use(cors())
app.use(express.json())

app.use(passport.initialize())
require('./config/passport')

app.use(helmet())
app.use(helmet.noSniff())
app.use(helmet.xssFilter())



//Connect to database.
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
//mongoose.connect('mongodb://localhost/blood_sugar_tracker', { useUnifiedTopology: true, useNewUrlParser: true }) 

//Test connection
mongoose.connection.once('open', () => {
    console.log("Connected to database!")
})


const usersRouter = require('./routes/users')
const bloodsugarRouter = require('./routes/bloodsugar')
const loginRouter = require('./routes/login')

app.use('/users', usersRouter)
app.use('/bloodsugar', bloodsugarRouter)
app.use('/login', loginRouter)



app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running!")
})