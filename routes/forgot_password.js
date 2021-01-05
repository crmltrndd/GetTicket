const express = require('express')
const router = express.Router()

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

// Forgot Password Route
router.get('/', checkUser, (req, res) => {
    res.render('forgot_password', {
        title: 'GetTicket | Forgot Password',
        css: '',
    })
})

module.exports = router;