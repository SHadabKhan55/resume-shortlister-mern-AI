require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const {route} = require("./routes/route")
const {dbconn} = require("./config/dbcon")
app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.use(route)

dbconn()
const port = process.env.PORT
app.listen(port,() => console.log(`server run on ${port}`))

