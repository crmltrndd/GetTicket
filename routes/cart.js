const express = require('express')
const router = express.Router()

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

// Cart Route
router.get('/', checkUser, isAuthorized, (req, res) => {
    res.render('cart', {
        title: 'GetTicket | Cart',
        css: '',
    })
})

module.exports = router;