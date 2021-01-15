const express = require('express')
const router = express.Router()

// Import Controllers 
const { getLogin, postLogin } = require('../controller/login_controller')

// Import Middleware
const { isAuthorized, checkUser } = require('../middleware/user')

router.get('/', checkUser, getLogin)        // Login Route
router.post('/', checkUser, postLogin)      // Login Process Handler

module.exports = router;