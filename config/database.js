const mongoose = require("mongoose")
require('dotenv').config()



const connectDatabase = () =>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.DATABASE_PASSWORD}@cluster0.pkitfhz.mongodb.net/?retryWrites=true&w=majority`, connectionParams)
    .then( () => {
        console.log('[200] SUCCESS: Database Connected')}
        ).catch(
            (error) => {
        console.log('[500] FAILED: Database Not Connected'),
        console.log(error)
    })
}

module.exports = connectDatabase();