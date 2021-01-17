const express = require('express')
const router = express.Router()

// Import Controllers 
const { getHome, getLogout } = require('../controller/index_controller')

// Import Middleware
const { checkUser, isAuthorized } = require('../middleware/user')

router.get('/', checkUser, getHome)                                 // Home Route
router.get('/logout', checkUser, isAuthorized, getLogout)           // Logout Route

module.exports = router;