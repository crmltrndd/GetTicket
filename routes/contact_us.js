const express = require('express')
const router = express.Router()

// Import Middleware
const { checkUser } = require('../middleware/user')

// Contact Us Route
router.get('/', checkUser, (req, res) => {
    res.render('contact_us', {
        title: 'GetTicket | Contact Us',
        css: '',
    })
})

module.exports = router;