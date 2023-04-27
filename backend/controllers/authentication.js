const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')
//  require npm package
const jwt = require('json-web-token')

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
        const result = await jwt.encode(process.env.JWT_SECRET, { id: user.userId }) // Payload
        // send both the authenticated user and the JWT we created.
        res.json({ user: user, token: result.value })
    }
})

// route handler to respond to that fetch request
router.get('/profile', async (req, res) => {
    try {
            // Split the authorization header into [ "Bearer", "TOKEN" ]:
            const [method, token] = req.headers.authorization.split(' ')
        
            // Only handle "Bearer" authorization for now 
            //  (we could add other authorization strategies later):
            if (method == 'Bearer') {
            
                    // Decode the JWT
            const result = await jwt.decode(process.env.JWT_SECRET, token)
    
            // Get the logged in user's id from the payload
            const { id } = result.value
            
            // Find the user object using their id:
            let user = await User.findOne({
                where: {
                        userId: id
                    }
                })           
                res.json(user)
            }
        } catch (err){ 
                res.json(null)
            }
        })
        
        module.exports = router