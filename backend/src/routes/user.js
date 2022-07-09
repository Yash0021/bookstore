
const express = require('express')
const router = express.Router()
const User = require('../modules/User')
const validator = require('validator')
const Book = require('../modules/Book')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const auth = require('../Authentication/auth')

router.post('/signup', async (req, res) => {
    const {email, password} = req.body

    if(!validator.isEmail(email) || password.length < 8){
        return res.status(400).send("Enter valid information.")
    }

    try {
        const user = new User(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.status(200).send({ user, token })
    } catch(err) {
        res.status(400).send(err.message)
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findByCredentials(email, password)
        if(!user){
            throw new Error("Not found!")
        }

        const token = await user.generateAuthToken()
        res.status(200).send({ user: user, token: token })
    } catch(err) {
        res.status(404).send("User not found")
    }
})

router.post('/add_to_cart', auth, async (req, res) => {
    const user = req.user
    try {
        const bookId = req.body.bookId
        const numberOfItem = req.body.quantity
        const newItem = await Book.findOne({ bookId })
        const newBook = {
            title: newItem.book_name,
            author: newItem.writerName,
            publisher: newItem.publisherName,
            price: newItem.price,
            bookId: newItem.bookId
        }

        if(!newItem){
            throw new Error('Not found')
        }

        if(newItem){
            if(newItem.stock >= numberOfItem){
                let newStock = newItem.stock - numberOfItem
                await Book.updateOne({ bookId }, {
                    stock: newStock
                })

                await user.addToCart(newBook, newBook.price) 
            } else {
                throw new Error("Books out of stock.")
            }
        }

        res.status(200).send(user)
    } catch(error) {
        res.status(400).send(error.message)
    }
})

router.get('/profile', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/my_cart', auth, async (req, res) => {
    res.send({
        currentCart: req.user.currentCart, 
        totalAmount: req.user.totalPrice, 
        totalItems: req.user.currentCart.length
    })
})

router.get('/total_amount', auth, async (req, res) => {
    res.send(req.user.totalPrice)
})

router.delete('/remove_from_cart', auth, async (req, res) => {
    console.log(req.body)
    const user = await User.findOne({_id: req.user._id})
    try{
        const bookId = req.body.bookId
        const item = await Book.findOne({bookId: bookId})
        user.currentCart = user.currentCart.filter(book => {
            return book !== bookId
        })
        user.totalPrice -= item.price
        await user.save()

        res.status(200).send(user)
    } catch(err) {
        res.status(400).send(err.message)
    }
})

module.exports = router
