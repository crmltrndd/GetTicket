const express = require('express')
const router = express.Router()
const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

// Login Route
router.get('/', checkUser, (req, res) => {
    res.render('login', {
        title: 'GetTicket | Login',
        css: 'user_login.css',
    })
})


// Login Process Handler
router.post('/', checkUser, (req, res) => {
    const { loginUsername, loginPassword } = req.body
    // Authenticate User
    pool.query('SELECT * FROM User_Profile WHERE Username = ? ', [loginUsername], async (error, results) => {
        if (error) {
            console.error(error)
        } else {
            if (results.length <= 0) {
                req.flash('error', 'Invalid Username or Password')
                res.status(401).redirect('/login')
            } else if (await bcrypt.compare(loginPassword, results[0].Password)) {
                // If valid credentials, create token and cookie
                const accessToken = createToken(results[0].Username)                
                res.cookie('access', accessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000 })
                res.status(200).redirect('/')
            } else {
                req.flash('error', 'Invalid Username or Password')
                res.status(401).redirect('/login')
            }
        }
    })
})

// Create JWT token for authentication
function createToken(username) {
    const user = { username }
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION // 3days = 3 * 24 * 60 * 60
    })
}

module.exports = router;