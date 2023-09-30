const mongoose = require("mongoose")
require('dotenv').config()

const connectDatabase = () =>{
    mongoose.connect(process.env.DATABASE_URI)
    .then( () => {
        console.log('[200] SUCCESS: Database Connected')}
        ).catch(
            (error) => {
        console.log('[500] FAILED: Database Not Connected'),
        console.log(error)
    })
}

module.exports = connectDatabase();