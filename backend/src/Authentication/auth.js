require('dotenv').config()

const jwt = require('jsonwebtoken')
const accessSecret = process.env.ACCESS_TOKEN_SECRET
const User = require('../modules/User')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const verification = jwt.verify(token, accessSecret)
        const user = await User.findOne({_id: verification._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch(err) {
        res.status(401).send({ error: "Please get authenticated first." })
    }
}

module.exports = auth
