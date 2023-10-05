const express = require('express')
const userRouter = express.Router()
const {registerUser, loginUser,updateUserToAdmin} = require('../controllers/user')
const {userAuth} = require('../middlewares/auth')

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.put('/update-admin', userAuth, updateUserToAdmin)

module.exports = userRouter