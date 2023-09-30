const express = require('express')
const app = express()
const connectDatabase = require('./config/database')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')


app.use(express.json())
app.use('/api/v1/',[userRouter, productRouter])

const port = 3000

app.listen(port, ()=>{
    console.log(`Server is running on localhost:${port}`)
})