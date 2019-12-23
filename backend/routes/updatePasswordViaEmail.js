const router = require('express').Router()
let User = require('../models/user.model')

const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 12;

router.route('/updatepasswordviaemail').put((req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user !== null) {
            console.log('user exists in db')
            bcrypt
                .hash(req.body.password2, BCRYPT_SALT_ROUNDS)
                .then(hashedPassword => {
                    user.update({
                        password: hashedPassword,
                        resetPasswordToken: null,
                        resetPasswordExpires: null
                    })
                })
                .then(() => {
                    console.log("password updated")
                    res.send("Password updated.")
                })
        } else {
            console.log("No user in db.")
            res.send("No such user.")
        }
    })
})


module.exports = router