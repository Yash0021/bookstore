
const express = require('express')
require('./db/mongoose')
const User = require('./modules/User')
const PORT = 3000
const userRoute = require('./routes/user')
const booksRoute = require('./routes/books')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRoute)
app.use(booksRoute)


app.listen(PORT, (req, res) => {
    console.log(`Listening on [localohst:${PORT}]`)
})
