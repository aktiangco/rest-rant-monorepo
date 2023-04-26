const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
//  require npm package
const jwt = require('jwt')

const { User } = db

router.post('/', async (req, res) => {
    // console.log('IN HERE')
    // * Finding a user by email
    let user = await User.findOne({
        where: { email: req.body.email }
    })
    // * Checking the user's password using bcrypt
    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        // The first argument we're passing, jwt.encode, is a random string for jwt to use to hash the token signature. 
        // Like the SESSION_SECRET, we'll need to add this to our .env file
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.user.ID }) // Payload
        // send both the authenticated user and the JWT we created.
        res.json({ user: user, token: result.value })
    }
})

// route handler to respond to that fetch request
router.get('/profile', async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                userId:  
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})


module.exports = router
