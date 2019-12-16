const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const { firstname } = req.body
    const { lastname } = req.body
    const { email } = req.body
    const { password1 } = req.body
    const { password2 } = req.body

    const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const nameCheck = /^[a-zA-Z ]+$/


    if (nameCheck.test(firstname)) {
        if (nameCheck.test(lastname)) {
            if (emailValidate.test(email)) {
                if (password1 == password2) { //Why does this not work?
                    User.findOne({email: email}, (err, result) => {
                        if (err) {
                            res.send("Error reading database")
                        } else if (result) {
                            res.send("Email all ready in use.")
                        } else {
                            const newUser = new User(
                                {
                                    firstname: firstname,
                                    lastname: lastname,
                                    email: email,
                                    password: password2
                                }
                            )

                            newUser.save()
                                .then(() => res.json('User added!'))
                                .catch(err => res.status(400).json('Error: ' + err))
                        }
                    })
                } else {
                    res.send("Please make sure passwords match.")
                }
            }else {
                res.send("Please enter a valid email.")
            }
        }else {
            res.send("Please enter a valid last name.")
        }
    } else {
        res.send("Please enter a valid first name.")
    }                            
})

module.exports = router