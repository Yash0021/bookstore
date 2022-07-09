require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Book = require('./Book')
const accessSecret = process.env.ACCESS_TOKEN_SECRET

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Must be an email.")
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
        trim: true
    },
    currentCart: [],
    totalPrice: {
        type: Number,
        default: 0
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.addToCart = async function(book){
    const user = this
    user.currentCart = user.currentCart.concat(book)
    user.totalPrice += book.price
    await user.save()
    return user
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, accessSecret)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function(){
    const user = this
    const clonedUser = user.toObject()

    delete clonedUser._id
    delete clonedUser.password
    delete clonedUser.tokens
    return clonedUser
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        return new Error("No user found.")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        return new Error("Invalid credentials.")
    }
    
    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
