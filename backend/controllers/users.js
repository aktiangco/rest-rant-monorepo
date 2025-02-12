const router = require('express').Router()
const db = require("../models")
// adding bcrypt
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    // using bcrypt
    let {password, ...rest} = req.body
    const user = await User.create({
        // bcrypt function
        ...rest,
        passwordDigest: await bcrypt.hash(password, 10)
    })
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router