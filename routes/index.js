const express = require('express')
const router = express.Router()
const pool = require('../config/database')

// Import Controllers 
const indexController = require('../controller/index_controller')

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

// Home Route
router.get('/', checkUser, (req, res) => {
    res.render('index', {
        title: 'GetTicket',
        css: 'user_login.css',
    })
})

module.exports = router;