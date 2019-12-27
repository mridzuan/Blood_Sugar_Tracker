require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const passport = require('passport')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
require('./config/passport')
app.use(helmet())
app.use(helmet.noSniff())
app.use(helmet.xssFilter())

//Connect to database.
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

//Test connection
mongoose.connection.once('open', () => {
    console.log("Connected to database!")
})

const usersRouter = require('./routes/users')
const bloodsugarRouter = require('./routes/bloodsugar')
const loginRouter = require('./routes/login')
const forgotpasswordRouter = require('./routes/forgotpassword')
const resetpasswordRouter = require('./routes/resetpassword')
const updatepasswordviaemailRouter = require('./routes/updatePasswordViaEmail')

app.use('/users', usersRouter)
app.use('/bloodsugar', bloodsugarRouter)
app.use('/login', loginRouter)
app.use('/forgotpassword', forgotpasswordRouter)
app.use('/resetpassword', resetpasswordRouter)
app.use('/updatepasswordviaemail', updatepasswordviaemailRouter)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    });
    app.options('https://dry-savannah-15034.herokuapp.com', cors());


if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}  




app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running!")
})