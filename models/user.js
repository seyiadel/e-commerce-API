const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:[true, "Please input your first name"]},

    last_name:  {
        type: String,
        required:[true, "Please input your first name"]},

    email: {
        type: String,
        required: [true, "Input your email address"],
        match: /.+\@.+\..+/,
        unique: true
    },

    password: {
        type: String,
        required:[true, "Enter a password"],
    },

    isAdmin: {
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User