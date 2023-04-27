const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

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
        // To access cookies
        req.session.userId = user.userId
        res.json({ user })
    }
})

// Add a request handler to the authentication controller
router.get('/profile', async (req, res) => {
    res.json(req.currentUser)
})

// creating a logout
router.post('/logout', (req, res) => {
    req.session = null
    res.sendStatus(200)
  })

module.exports = router
