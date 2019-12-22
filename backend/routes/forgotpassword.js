const router = require('express').Router()
let User = require('../models/user.model')
const nodemailer = require('nodemailer')
const crypto =require("crypto")


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/forgotpassword').post((req, res) => {
    const { email } = req.body

    if (email === '') {
        res.send ("Please enter your email.")
    }

    User.findOne({email: email}).then(user => {
        if (!user) {
            res.send("Email does not exist. Please register.")
        } else {
            const token = crypto.randomBytes(20).toString('hex')
            User.update({
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 3600000
            })

            const transporter = nodemailer.createTransport({
                service: 'protonmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`
                }
            })

            const mailMessage = {
                from: `${process.env.EMAIL_ADDRESS}`,
                to: `${user.email}`,
                subject: 'Password Reset Link',
                text:
                "You are receiving this email because there has been a request to reset your password.\n"
                + "Please click on the following link or paste it in your browser with one hour: \n"
                + `http://localhost:5000/reset/${token} \n\n`
                + "If you did not make this request, disregard this email.\n"
            }

            transporter.sendMail(mailMessage, (err, res) => {
                if (err) {
                    res.send("There was an error.")
                } else {
                    res.send("Recovery email has been sent.  Please check your inbox.")
                }
            })

        }


    })
})




module.exports = router