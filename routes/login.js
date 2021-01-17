const express = require('express')
const router = express.Router()

// Import Controllers 
const { getLogin, postLogin } = require('../controller/login_controller')

// Import Middleware
const { isNotAuthorized, checkUser } = require('../middleware/user')

router.get('/', checkUser, isNotAuthorized, getLogin)        // Login Route
router.post('/', checkUser, isNotAuthorized, postLogin)      // Login Process Handler

module.exports = router;