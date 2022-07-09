
const Book = require('../modules/Book')
const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const auth = require('../Authentication/auth')

router.post('/new_book', auth, async (req, res) => {
    try {
        const book = new Book({
            ...req.body,
            bookId: uuidv4()
        })
        await book.save()
        res.status(200).send(book)
    } catch(err) {
        res.status(400).send('Error creating book.')
    }
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).send(books)
    } catch(err) {
        res.status(404).send("Not found")
    }
})

router.get('/books/search', async (req, res) => {
    const bookName = req.query.bookName
    try {
        const books = await Book.find({"book_name": {
            $regex: new RegExp("[\w]*" + bookName +"[\w]*"),
            $options: "i"
        }})

        if(!books){
            return new Error('Not found!')
        }

        res.status(200).send(books)
    } catch(err) {
        res.status(400).send()
    }
})

module.exports = router
