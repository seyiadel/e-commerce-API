const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const saltRounds = 10

const registerUser = async (req, res) => {
    console.log("Registering Users....")
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(userData)

    const userEmail = await User.findOne({email: userData.email})
    console.log(`/////\\\\\\///// User Exists? ${userEmail}`)

    if(userEmail){
        res.status(400).json({
            "success":false,
            "message": "User already exists"
        })

    }

    console.log("Start PASSWORD hashing.....>>>>>")
    hashedPassword = await bcrypt.hash(userData.password, saltRounds)
    console.log(hashedPassword)

    const user = new User({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password:hashedPassword
    })

    await user.save()

    res.status(201).json({
        "success":true,
        "message": "User created successfully",
        "data": user
    })
    
}
    
// Log In User
const loginUser = async (req, res) => {
    const userData = await User.findOne({email: req.body.email})

    if(userData){
        const passwordCompare = await bcrypt.compare(req.body.password, userData.password)
        const payload = {
            "_id":userData._id,
            "first_name": userData.first_name,
            "last_name": userData.last_name, 
            "email": userData.email,
            "role":userData.role
        }
        if(passwordCompare){
            //Generate JWT for Authorization
            var token =  jwt.sign(payload, process.env.SECRET_KEY)
            res.status(200).json({
            "token": token,
            "data": payload
            });

        }else{
            res.status(200).json({
                "success":false,
                "message": "Incorrect Password"
            });
        }

    } else {
        res.status(404).json({
            "success":false,
            "message": "Please register, You have no account with us."
        })
    }

    
}

const updateUserToAdmin = async (req, res) => {
    const {role, userId} = req.body
    try{
        if (role && userId) {
            const user = await User.findOne({_id:userId})
            if (user.role === 'admin'){
                res.status(200).json(
                    {
                        "success":true,
                        "message": "User is already ADMIN",
                        "data": user
                    }
                )
            }else{
                user.role = 'admin'
                await user.save()
                res.status(200).json(
                    {
                        "success":true,
                        "message": "[SUCCESS] - User is an ADMIN",
                        "data": user
                    }
                )
            }
        }
    } catch (error) {
        res.status(400).json(
            {
                "success":false,
                "message": "User Role not updated",
                "data": error
            }
        )
    }

}

module.exports = {registerUser, loginUser, updateUserToAdmin}

