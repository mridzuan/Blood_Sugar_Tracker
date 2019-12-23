const router = require('express').Router()
let User = require('../models/user.model')


router.route('/reset').get((req, res) => {
    User.findOne({
        where: {
            resetPasswordToken: req.query.resetPasswordToken,
            /*resetPasswordExpires: {
                $gt: Date.now()
            }*/
        }
    }) .then(user => {
        if (user == null) {
            console.log('password reset link is invalid or has expired')
            res.send('password reset link is invalid or has expired')
        } else {
            res.send({
                email: user.email,
                message: 'Password reset link ok.'
            })
        }
    })
})

module.exports = router