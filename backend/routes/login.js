const bcrypt = require('bcrypt')
const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/login').post((req, res) => {
    const { email } = req.body
    const { password } = req.body
    
    const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (emailValidate.test(email)) {
        User.findOne({email: email}).then(user => {
             if (!user) {
                res.send("Email does not exist, please register.")
            } else {
                bcrypt.compare(password, user.password).then((result) => {
                   if (result) {
                       res.send("Login successful")
                    } else {
                        res.send("Incorrect password")
                    }
                })
            }
        })
    } else {
        res.send("Invalid email format")
    }
})
module.exports = router