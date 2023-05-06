const express = require('express')
const dotenv = require('dotenv')
const { connection } = require("./config/db")
const { UserRouter } = require('./routes/user.routes')
const { auth } = require('./middlewares/auth.middleware')
const { bookRouter } = require('./routes/book.routes')
const { OrderRouter } = require('./routes/order.routes')
dotenv.config()

const app = express()
app.use(express.json()) // middlewares

app.use("/users", UserRouter)

app.use(auth)
app.use("/", bookRouter)

app.use("/books",OrderRouter)


app.listen(process.env.PORT, async () => {

    try {
       await connection
       console.log(`Server is Running ${process.env.PORT}`)
       console.log(`Connected to MongoURL`)
    } catch (error) {
      console.log(error)
      console.log("COnnect to MongoDb")  
    }
})