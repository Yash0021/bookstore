const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    writerName: {
        type: String,
        required: true,
        trim: true
    },
    publisherName: {
        type: String,
        required: true,
        trim: true
    },
    bookId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    book_name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

bookSchema.methods.toJSON = function(){
    const book = this
    const clonedBook = book.toObject()
    delete clonedBook._id
    delete clonedBook.stock

    return clonedBook
}

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
