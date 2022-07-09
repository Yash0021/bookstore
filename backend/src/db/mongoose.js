
const mongoose = require('mongoose')
const MONGODB_URL = "mongodb://localhost:27017/bookstore"

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true
})
