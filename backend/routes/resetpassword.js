const router = require('express').Router()
let User = require('../models/user.model')

//Need to figure out why expiration is not saving.
router.route('/reset').get((req, res) => {
    User.findOne({
            resetPasswordToken: req.query.resetPasswordToken/*,
            resetPasswordExpires: {
                $gt: Date.now()
            }*/
        }, (err, result) => {
            if (err) {
                res.send("Error reading database")
            } else if (!result) {
                res.send("Password reset link is invalid or has expired.")
            } else {
                res.send({
                    email: result.email,
                    message: 'Password reset link ok.'
                })
            }
        })
})

module.exports = router