const express = require('express')
const router = express.Router()
const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

// Register Route
router.get('/', checkUser, (req, res) => {
    pool.query('SELECT Username, Email FROM User_Profile', (error, result) => {
        if (error) {
            console.error(error)
        } else {
            // Passing list of usernames for checking if Movie Title already exist
            let usernameList = []
            let emailList = []
            result.forEach(user => {
                usernameList.push(user.Username)
                emailList.push(user.Email)
            })
            // Render Register page
            res.render('register', {
                title: 'GetTicket',
                css: 'user_login.css',
                usernames: usernameList,
                emails: emailList,
            })
        }
    })
})

// Register Process Handler
router.post('/', checkUser, async (req, res) => {
    console.log(req.body)
    const { username, email, password, repassword, firstname, lastname, contact, birthdate, address } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    // Add the user in the database
    pool.query('INSERT INTO User_Profile SET ? ', { Username: username, Email: email, Password: hashedPassword, Contact: contact, Fname: firstname, Lname: lastname, Birthday: birthdate, Address: address }, (error, results) => {
        if (error) {
            console.error(error)
        } else {
            // login user by creating token and cookie
            const accessToken = createToken(username)            
            res.cookie('access', accessToken, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000 })
            res.status(200).redirect('/')
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