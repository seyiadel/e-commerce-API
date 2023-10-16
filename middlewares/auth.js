const jwt = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY

const userAuth = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, secret_key, (err, authToken) =>{
        // If Incorrect Token is Sent to the headers
        if(err){
            console.log("[ERROR] - Invalid Token")
        } else{
            // Valid Token sent and Verified
            console.log("[SUCCESS] - Token Authorized")
        }
    })
    next()
}


const adminAuth = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
    
    jwt.verify(token, secret_key, (err,token) => {
        if (err){
            console.log("[ERROR] - Invalid Token")
        } else if(token.role !== "admin"){
            console.log("[DENIED] - Permission Denied")
           
        } else{
            console.log("[SUCCESS] - Valid Token and Admin")
        }
      
    })
    
    next()
}


module.exports = {userAuth, adminAuth}