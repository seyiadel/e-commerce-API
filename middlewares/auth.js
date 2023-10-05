const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY

const userAuth = (req, res, next) => {
    let token = req.headers['Authorization']

    jwt.verify(token, secret_key, (err, authToken) =>{
        // If Incorrect Token is Sent to the headers
        if(err){
            console.log("[ERROR] - Invalid Token")
            res.status(400).json({
                    "message": "[Invalid Token] - Token not authorized"
            })
        } else{
            // Valid Token sent and Verified
            console.log("[SUCCESS] - Token Authorized")
            res.status(200).json({
                "message": "[Valid Token] - Token Authorized",
                "data": authToken
            })
        }
    })
    next()
}


const adminAuth = (req, res, next) => {
    let token = req.headers['Authorization']
    
    jwt.verify(token, secret_key, (err,token) => {
        if (err){
            console.log("[ERROR] - Invalid Token")
            res.status(400).json({
                "success":true,
                "message": "[Invalid Token] - Token not authorized"
            })
        } else if(token.role !== "admin"){
            console.log("[DENIED] - Permission Denied")
            res.status(403).json({
                "success":true,
                "message": "[DENIED] - Permission Denied"
            })
        } else{
            console.log("[SUCCESS] - Valid Token and Admin")
            res.status(200).json({
                "success":true,
                "message": "[SUCCESS] - Valid Token and Admin",
                "data": token
            })
        }
      
    })
    
    next()
}


module.exports = {userAuth, adminAuth}