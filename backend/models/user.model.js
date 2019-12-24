const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {   
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        resetPasswordToken: String,
        resetPassWordExpires: {type: Date},
        bloodSugar:
        [
            {
                level: Number,
                date:{type: Date, default: Date.now}
            }
        ]
    }, {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User