const express = require("express")
const app = express()
const api = require('./routes/api')
const dotenv = require('dotenv')
const connectDB = require('./db/ConnectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use (cors())

//token get
app.use(cookieParser());



//tempfiles uploaderz
app.use(fileUpload({useTempFiles:true}))
//data get
app.use(express.json())



//route
//http://localhost:5000/api/



dotenv.config({
    path: '.env'
})



//route load
//localhost:5000/api/
app.use('/api', api)

//connectdb
connectDB()


//server create
app.listen(process.env.PORT, () => {
    console.log(`localhost:${process.env.PORT}`)
})



